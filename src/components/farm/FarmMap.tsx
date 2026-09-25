"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { FaMinus, FaPlus, FaRotateLeft } from "react-icons/fa6";
import { Caption, DisplayLarge, SmallButton } from "@components/ui/Typography";
import { getVisitorId } from "@lib/visitor-id";

interface Drawing {
  id: string;
  name: string;
  image_url: string;
  visitor_id: string;
  created_at: string;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
}

function getSeededValue(id: string, salt: string) {
  return hashCode(`${id}:${salt}`) / 0xffffffff;
}

function getPlotLayout(id: string, index: number, worldSize: { width: number; height: number }) {
  const size = index === 0 ? 100 : 85 + Math.round(getSeededValue(id, "size") * 30);
  const angle =
    index * Math.PI * (3 - Math.sqrt(5)) + (getSeededValue(id, "angle") - 0.5) * 0.7;
  const radius =
    index === 0
      ? 0
      : 95 + 75 * (Math.sqrt(index) - 1) + (getSeededValue(id, "radius") - 0.5) * 24;

  return {
    x: worldSize.width / 2 + Math.cos(angle) * radius - size / 2,
    y: worldSize.height / 2 + Math.sin(angle) * radius - size / 2,
    size,
  };
}

function getWorldSize(total: number) {
  const radius = total > 1 ? 95 + 75 * (Math.sqrt(total - 1) - 1) + 12 : 0;
  const size = radius * 2 + 235;
  return {
    width: Math.max(800, size),
    height: Math.max(600, size),
  };
}

const MapContainer = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  background-color: var(--color-background);
  background-image: radial-gradient(
    circle,
    var(--color-border) var(--grid-dot-size, 0.8px),
    transparent var(--grid-dot-size, 0.8px)
  );
  background-position: var(--grid-position-x, 0) var(--grid-position-y, 0);
  background-size: var(--grid-size, 19.2px) var(--grid-size, 19.2px);
  cursor: grab;
  z-index: 1;

  &:active {
    cursor: grabbing;
  }
`;

const WorldLayer = styled.div`
  position: relative;
`;

const PlotImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  pointer-events: none;
  border-radius: 0;
  box-shadow: none;
`;

const Tooltip = styled(Caption)`
  position: fixed;
  padding: var(--space-1) var(--space-3);
  background: var(--color-text);
  color: var(--color-background);
  border-radius: var(--radius-small);
  pointer-events: none;
  z-index: 100;
  white-space: nowrap;
`;

const Popover = styled.div`
  position: fixed;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-medium);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 200;
  overflow: hidden;
`;

const PopoverButton = styled(SmallButton)`
  display: block;
  width: 100%;
  padding: var(--space-2) var(--space-4);
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: var(--color-primary-soft);
  }
`;

const MapControls = styled.div`
  position: fixed;
  left: var(--space-4);
  bottom: var(--space-4);
  z-index: 50;
  display: flex;
  flex-direction: column;
`;

const MapControlButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3);
  color: var(--color-primary);
  background: transparent;
  border: none;
  cursor: pointer;

  svg {
    stroke: currentColor;
    stroke-width: 6;
  }

  & + & {
    border-top: 1px solid var(--color-border);
  }

  &:hover {
    color: var(--color-primary-hover);
  }
`;

const EmptyMessage = styled(DisplayLarge)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-muted);
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const popIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Plot = styled.div<{ $delay: number }>`
  position: absolute;
  opacity: 0;
  animation: ${popIn} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: ${(p) => p.$delay}ms;

  &:hover {
    transform: scale(1.15);
    z-index: 10;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

export default function FarmMap() {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ drawing: Drawing; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const visitorIdRef = useRef("");

  useEffect(() => {
    visitorIdRef.current = getVisitorId();
    fetch("/api/drawings")
      .then((res) => res.json())
      .then((data) => {
        setDrawings(data.drawings || []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    const dismiss = () => setContextMenu(null);
    if (contextMenu) {
      window.addEventListener("click", dismiss);
      return () => window.removeEventListener("click", dismiss);
    }
  }, [contextMenu]);

  const handleDelete = useCallback(async () => {
    if (!contextMenu) return;
    const { drawing } = contextMenu;
    setContextMenu(null);
    setDrawings((prev) => prev.filter((d) => d.id !== drawing.id));

    try {
      const response = await fetch(`/api/drawings/${drawing.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitor_id: visitorIdRef.current }),
      });

      if (!response.ok) throw new Error("Failed to delete drawing");
    } catch {
      setDrawings((prev) =>
        [...prev, drawing].sort((a, b) => b.created_at.localeCompare(a.created_at)),
      );
    }
  }, [contextMenu]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent, drawing: Drawing) => {
      if (drawing.visitor_id !== visitorIdRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      setContextMenu({ drawing, x: e.clientX, y: e.clientY });
    },
    [],
  );

  const handleMouseEnter = useCallback((e: React.MouseEvent, name: string) => {
    if (!name.trim() || name === "Untitled") return;
    setTooltip({ name, x: e.clientX, y: e.clientY - 30 });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY - 30 } : null));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const syncGrid = useCallback(({ state }: ReactZoomPanPinchRef) => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--grid-dot-size", `${state.scale}px`);
    containerRef.current.style.setProperty("--grid-size", `${24 * state.scale}px`);
    containerRef.current.style.setProperty("--grid-position-x", `${state.positionX}px`);
    containerRef.current.style.setProperty("--grid-position-y", `${state.positionY}px`);
  }, []);

  const worldSize = getWorldSize(drawings.length);

  return (
    <MapContainer ref={containerRef}>
      {!loaded ? (
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      ) : drawings.length === 0 ? (
        <EmptyMessage>No drawings yet — be the first!</EmptyMessage>
      ) : (
        <TransformWrapper
          ref={transformRef}
          initialScale={0.8}
          centerOnInit
          minScale={0.3}
          maxScale={2}
          limitToBounds={false}
          disablePadding
          wheel={{ step: 0.0025 }}
          pinch={{ step: 2 }}
          panning={{ velocityDisabled: true }}
          onInit={syncGrid}
          onTransform={syncGrid}
        >
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%" }}
            contentStyle={{ width: worldSize.width, height: worldSize.height }}
          >
            <WorldLayer style={{ width: worldSize.width, height: worldSize.height }}>
              {drawings.map((d, i) => {
                const placementIndex = drawings.length - i - 1;
                const layout = getPlotLayout(d.id, placementIndex, worldSize);
                return (
                  <Plot
                    key={d.id}
                    $delay={Math.min(i * 30, 1500)}
                    style={{
                      left: layout.x,
                      top: layout.y,
                      width: layout.size,
                      height: layout.size,
                    }}
                    onMouseEnter={(e) => handleMouseEnter(e, d.name)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onContextMenu={(e) => handleContextMenu(e, d)}
                  >
                    <PlotImage src={d.image_url} alt={d.name} loading="lazy" decoding="async" />
                  </Plot>
                );
              })}
            </WorldLayer>
          </TransformComponent>
        </TransformWrapper>
      )}

      <MapControls role="group" aria-label="Garden canvas controls">
        <MapControlButton
          type="button"
          aria-label="Zoom in"
          onClick={() => transformRef.current?.zoomIn(0.1)}
        >
          <FaPlus aria-hidden />
        </MapControlButton>
        <MapControlButton
          type="button"
          aria-label="Zoom out"
          onClick={() => transformRef.current?.zoomOut(0.1)}
        >
          <FaMinus aria-hidden />
        </MapControlButton>
        <MapControlButton
          type="button"
          aria-label="Reset zoom and pan"
          onClick={() => transformRef.current?.resetTransform()}
        >
          <FaRotateLeft aria-hidden />
        </MapControlButton>
      </MapControls>

      {tooltip && (
        <Tooltip style={{ left: tooltip.x + 10, top: tooltip.y }}>
          {tooltip.name}
        </Tooltip>
      )}

      {contextMenu && (
        <Popover style={{ left: contextMenu.x, top: contextMenu.y }}>
          <PopoverButton onClick={handleDelete}>Delete</PopoverButton>
        </Popover>
      )}
    </MapContainer>
  );
}
