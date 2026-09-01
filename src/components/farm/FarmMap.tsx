"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { getVisitorId } from "@lib/visitor-id";

interface Drawing {
  id: string;
  name: string;
  image_data: string;
  visitor_id: string;
  created_at: string;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getPlotPosition(id: string, index: number, total: number) {
  const cols = Math.max(3, Math.ceil(Math.sqrt(total * 1.5)));
  const row = Math.floor(index / cols);
  const col = index % cols;
  const offsetX = row % 2 === 0 ? 0 : 60;
  const hash = hashCode(id);
  const jitterX = (hash % 30) - 15;
  const jitterY = ((hash >> 8) % 20) - 10;
  return { x: col * 140 + offsetX + jitterX + 40, y: row * 140 + jitterY + 40 };
}

function getWorldSize(total: number) {
  const cols = Math.max(3, Math.ceil(Math.sqrt(total * 1.5)));
  const rows = Math.ceil(total / cols);
  return {
    width: Math.max(800, cols * 140 + 160),
    height: Math.max(600, rows * 140 + 160),
  };
}

const MapContainer = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(circle, var(--color-border) 1px, transparent 1px) 0 0 / 24px 24px,
    var(--color-background);
  cursor: grab;
  z-index: 1;

  &:active {
    cursor: grabbing;
  }
`;

const WorldLayer = styled.div`
  position: relative;
`;

const Plot = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.15);
    z-index: 10;
  }
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

const Tooltip = styled.div`
  position: fixed;
  padding: var(--space-1) var(--space-3);
  background: var(--color-text);
  color: var(--color-background);
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
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

const PopoverButton = styled.button`
  display: block;
  width: 100%;
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: var(--color-primary-soft);
  }
`;

const Header = styled.div`
  position: absolute;
  top: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  text-align: center;
  pointer-events: none;
`;

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: var(--font-size-3xl);
  color: var(--color-primary);
  margin: 0;
`;

const Subtitle = styled.p`
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: var(--space-1) 0 0;
`;

const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  color: var(--color-text-muted);
`;

interface FarmMapProps {
  showHeader?: boolean;
}

export default function FarmMap({ showHeader }: FarmMapProps) {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ drawing: Drawing; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
    try {
      await fetch(`/api/drawings/${drawing.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitor_id: visitorIdRef.current }),
      });
      setDrawings((prev) => prev.filter((d) => d.id !== drawing.id));
    } catch {
      // ignore
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
    setTooltip({ name, x: e.clientX, y: e.clientY - 30 });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY - 30 } : null));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  if (!loaded) return null;

  const worldSize = getWorldSize(drawings.length);

  return (
    <MapContainer ref={containerRef}>
      {showHeader && (
        <Header>
          <Title>Community Garden</Title>
          <Subtitle>Hover to see names. Right-click your own to delete.</Subtitle>
        </Header>
      )}
      {drawings.length === 0 ? (
        <EmptyMessage>No drawings yet — be the first!</EmptyMessage>
      ) : (
        <TransformWrapper
          initialScale={0.8}
          minScale={0.3}
          maxScale={2}
          limitToBounds={false}
          panning={{ velocityDisabled: true }}
        >
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%" }}
            contentStyle={{ width: worldSize.width, height: worldSize.height }}
          >
            <WorldLayer style={{ width: worldSize.width, height: worldSize.height }}>
              {drawings.map((d, i) => {
                const pos = getPlotPosition(d.id, i, drawings.length);
                return (
                  <Plot
                    key={d.id}
                    style={{ left: pos.x, top: pos.y }}
                    onMouseEnter={(e) => handleMouseEnter(e, d.name)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onContextMenu={(e) => handleContextMenu(e, d)}
                  >
                    <PlotImage src={d.image_data} alt={d.name} />
                  </Plot>
                );
              })}
            </WorldLayer>
          </TransformComponent>
        </TransformWrapper>
      )}

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
