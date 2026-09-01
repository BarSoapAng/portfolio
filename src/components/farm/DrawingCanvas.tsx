"use client";

import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { mediaQuery } from "@lib/media";
import { getVisitorId } from "@lib/visitor-id";
import { isImageSafe } from "@lib/nsfw-check";
import { Filter } from "bad-words";
import {
  FaArrowRotateLeft,
  FaArrowRotateRight,
  FaBucket,
  FaEraser,
  FaPen,
  FaTrashCan,
} from "react-icons/fa6";

const filter = new Filter();

const BRUSH_SIZES = [
  { label: "Small", size: 2 },
  { label: "Medium", size: 6 },
  { label: "Large", size: 12 },
];

type DrawingTool = "pen" | "eraser" | "bucket";

function parseColor(color: string): [number, number, number, number] {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const pixel = ctx.getImageData(0, 0, 1, 1).data;
  return [pixel[0], pixel[1], pixel[2], pixel[3]];
}

function isCanvasEmpty(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return true;
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;

  for (let index = 3; index < pixels.length; index += 4) {
    if (pixels[index] !== 0) return false;
  }

  return true;
}

const Wrapper = styled.div`
  padding: var(--space-3);
  display: grid;
  grid-template-columns: minmax(0, 20rem) minmax(15rem, 18rem);
  justify-content: center;
  align-items: start;
  gap: var(--space-4);

  @media ${mediaQuery.smallTablet} {
    grid-template-columns: minmax(0, 20rem);
  }

  @media ${mediaQuery.largeMobile} {
    padding-inline: 0;
  }

  [data-button-group] > button + button {
    position: relative;
  }

  [data-button-group] > button + button::before {
    content: "";
    position: absolute;
    inset-inline-start: calc(-1 * var(--space-1) - 1px);
    top: 50%;
    width: 1px;
    height: 18px;
    translate: 0 -50%;
    background: var(--color-border);
    pointer-events: none;
  }
`;

const CanvasWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 20rem;
  background: transparent;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-small);
  box-sizing: border-box;
  overflow: hidden;
`;

const CanvasColumn = styled.div`
  display: grid;
  gap: var(--space-2);
  width: 100%;
  max-width: 20rem;
`;

const StyledCanvas = styled.canvas`
  cursor: crosshair;
  touch-action: none;
  display: block;
  width: 100%;
  height: auto;
  background: #ffffff;
`;

const Utilities = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: var(--space-3);
`;

const ToolRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
`;

const HistoryControls = styled(ToolRow)`
  justify-content: space-between;
`;

const UndoRedoControls = styled.div`
  display: flex;
  gap: var(--space-2);
`;

const Label = styled.span`
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
`;

const ColorControls = styled.div`
  display: grid;
  gap: var(--space-2);
`;

const ColorPicker = styled.div`
  display: grid;
  gap: var(--space-2);
  width: 100%;
`;

const ColorFields = styled.div`
  display: grid;
  grid-template-columns: 7rem minmax(0, 1fr);
  border-radius: var(--radius-small);
  overflow: hidden;
`;

const ColorPreview = styled.div<{ $color: string }>`
  min-width: 0;
  width: 100%;
  aspect-ratio: 1;
  background: ${(p) => p.$color};
`;

const ColorField = styled.button<{ $hue: number }>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background:
    linear-gradient(to top, #000000, transparent),
    linear-gradient(to right, #ffffff, transparent),
    hsl(${(p) => p.$hue}, 100%, 50%);
  cursor: crosshair;
  touch-action: none;
`;

const ColorIndicator = styled.span<{ $color: string; $x: number; $y: number }>`
  position: absolute;
  left: clamp(6px, ${(p) => p.$x}%, calc(100% - 6px));
  top: clamp(6px, ${(p) => p.$y}%, calc(100% - 6px));
  width: 12px;
  height: 12px;
  translate: -50% -50%;
  border: 2px solid #ffffff;
  border-radius: var(--radius-circle);
  background: ${(p) => p.$color};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
  pointer-events: none;
`;

const HueSlider = styled.input<{ $color: string }>`
  width: 100%;
  height: 8px;
  margin: var(--space-1) 0;
  appearance: none;
  border-radius: var(--radius-pill);
  background: linear-gradient(
    to right,
    #ff0000,
    #ffff00,
    #00ff00,
    #00ffff,
    #0000ff,
    #ff00ff,
    #ff0000
  );
  cursor: pointer;

  &::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    appearance: none;
    border: 2px solid #ffffff;
    border-radius: var(--radius-circle);
    background: ${(p) => p.$color};
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-radius: var(--radius-circle);
    background: ${(p) => p.$color};
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
  }
`;

const SizeButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: var(--radius-small);
  border: 0;
  background: transparent;
  color: ${(p) => (p.$active ? "var(--color-primary)" : "var(--color-text-muted)")};
  cursor: pointer;

  &:hover,
  &:active {
    color: var(--color-primary-hover);
  }
`;

const BrushSizeCircle = styled.span<{ $size: number }>`
  width: ${(p) => Math.max(p.$size, 4)}px;
  height: ${(p) => Math.max(p.$size, 4)}px;
  border-radius: var(--radius-circle);
  background: currentColor;
`;

const IconButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-small);
  border: 0;
  background: transparent;
  color: ${(p) => (p.$active ? "var(--color-primary)" : "var(--color-text-muted)")};
  cursor: pointer;
  padding: 0;

  &:hover,
  &:active {
    color: var(--color-primary-hover);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-medium);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  box-sizing: border-box;

  &:focus-visible {
    outline: none;
    border-color: color-mix(in srgb, var(--color-border) 75%, var(--color-text));
  }
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  width: 100%;
  padding: var(--space-1) var(--space-3);
  background: ${(p) => (p.$primary ? "var(--color-primary)" : "transparent")};
  color: ${(p) => (p.$primary ? "var(--color-on-primary)" : "var(--color-text-muted)")};
  border: 0;
  border-radius: var(--radius-medium);
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: ${(props) =>
    props.$primary
      ? "var(--font-weight-bold)"
      : "var(--font-weight-medium)"};
  line-height: var(--line-height-tight);
  cursor: pointer;
  transition: color 0.15s, background 0.15s;

  &:not(:disabled):hover,
  &:not(:disabled):active {
    background: ${(p) => (p.$primary ? "var(--color-primary-hover)" : "transparent")};
    color: ${(p) => (p.$primary ? "var(--color-on-primary)" : "var(--color-primary-hover)")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StepButtons = styled.div`
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-2);
`;

const DrawingActions = styled(StepButtons)`
  margin-top: auto;
`;

const StatusRow = styled.div`
  min-height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  white-space: nowrap;

  @media ${mediaQuery.largeMobile} {
    min-height: 0;
    white-space: normal;
  }
`;

const Message = styled.span<{ $error?: boolean }>`
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: ${(p) => (p.$error ? "var(--color-primary)" : "var(--color-accent)")};
  text-align: center;
`;

const GardenLink = styled(Link)`
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  text-underline-offset: 2px;

  &:hover,
  &:active {
    color: var(--color-primary-hover);
  }
`;

function exportDrawing(canvas: HTMLCanvasElement) {
  const output = document.createElement("canvas");
  output.width = 256;
  output.height = 256;
  const context = output.getContext("2d");

  if (!context) return Promise.reject(new Error("Unable to export drawing"));

  context.drawImage(canvas, 0, 0, output.width, output.height);

  return new Promise<Blob>((resolve, reject) => {
    output.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Unable to export drawing"))),
      "image/webp",
      0.9,
    );
  });
}

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const pixelRatioRef = useRef(1);
  const isDrawing = useRef(false);
  const colorFieldRef = useRef<HTMLButtonElement>(null);
  const isChoosingColor = useRef(false);
  const [color, setColor] = useState("#000000");
  const [colorSelection, setColorSelection] = useState({
    hue: 0,
    saturation: 0,
    brightness: 0,
  });
  const [brushSize, setBrushSize] = useState(6);
  const [tool, setTool] = useState<DrawingTool>("pen");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const history = useRef<ImageData[]>([]);
  const redoStack = useRef<ImageData[]>([]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    setHasDrawing(false);
  }, []);

  const saveSnapshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    history.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (history.current.length > 25) history.current.shift();
    redoStack.current = [];
  }, []);

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || history.current.length === 0) return;
    redoStack.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.putImageData(history.current.pop()!, 0, 0);
    setHasDrawing(!isCanvasEmpty(canvas));
  }, []);

  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || redoStack.current.length === 0) return;
    history.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.putImageData(redoStack.current.pop()!, 0, 0);
    setHasDrawing(!isCanvasEmpty(canvas));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    pixelRatioRef.current = pixelRatio;
    canvas.width = Math.round(rect.width * pixelRatio);
    canvas.height = Math.round(rect.height * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctxRef.current = ctx;
  }, []);

  const getPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const rect = rectRef.current!;
    const canvas = canvasRef.current!;
    const scaleX = canvas.width / pixelRatioRef.current / rect.width;
    const scaleY = canvas.height / pixelRatioRef.current / rect.height;
    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if ("touches" in e) e.preventDefault();
    const ctx = ctxRef.current;
    if (!ctx) return;
    rectRef.current = canvasRef.current!.getBoundingClientRect();
    const pos = getPos(e);

    if (tool === "bucket") {
      fillArea(pos.x, pos.y);
      return;
    }

    saveSnapshot();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = color;
    isDrawing.current = true;
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if ("touches" in e) e.preventDefault();
    if (!isDrawing.current) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    const canvas = canvasRef.current;
    if (canvas) setHasDrawing(!isCanvasEmpty(canvas));
  };

  const fillArea = (logicalX: number, logicalY: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    const startX = Math.max(
      0,
      Math.min(canvas.width - 1, Math.floor(logicalX * pixelRatioRef.current)),
    );
    const startY = Math.max(
      0,
      Math.min(canvas.height - 1, Math.floor(logicalY * pixelRatioRef.current)),
    );
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const startIndex = (startY * canvas.width + startX) * 4;
    const target = [
      pixels[startIndex],
      pixels[startIndex + 1],
      pixels[startIndex + 2],
      pixels[startIndex + 3],
    ];
    const replacement = parseColor(color);

    if (target.every((channel, index) => channel === replacement[index])) return;

    const matchesTarget = (x: number, y: number) => {
      const index = (y * canvas.width + x) * 4;
      return target.every((channel, offset) => pixels[index + offset] === channel);
    };
    const setPixel = (x: number, y: number) => {
      const index = (y * canvas.width + x) * 4;
      pixels[index] = replacement[0];
      pixels[index + 1] = replacement[1];
      pixels[index + 2] = replacement[2];
      pixels[index + 3] = replacement[3];
    };

    saveSnapshot();
    const stack: Array<[number, number]> = [[startX, startY]];
    while (stack.length > 0) {
      const [seedX, y] = stack.pop()!;
      let x = seedX;
      while (x >= 0 && matchesTarget(x, y)) x -= 1;
      x += 1;
      let spansAbove = false;
      let spansBelow = false;

      while (x < canvas.width && matchesTarget(x, y)) {
        setPixel(x, y);

        if (y > 0 && matchesTarget(x, y - 1)) {
          if (!spansAbove) stack.push([x, y - 1]);
          spansAbove = true;
        } else {
          spansAbove = false;
        }

        if (y < canvas.height - 1 && matchesTarget(x, y + 1)) {
          if (!spansBelow) stack.push([x, y + 1]);
          spansBelow = true;
        } else {
          spansBelow = false;
        }

        x += 1;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    setHasDrawing(true);
  };

  const handleClear = () => {
    saveSnapshot();
    clearCanvas();
  };

  const updateColor = (hue: number, saturation: number, brightness: number) => {
    const normalizedSaturation = saturation / 100;
    const normalizedBrightness = brightness / 100;
    const lightness = normalizedBrightness * (1 - normalizedSaturation / 2);
    const hslSaturation =
      lightness === 0 || lightness === 1
        ? 0
        : (normalizedBrightness - lightness) / Math.min(lightness, 1 - lightness);

    setColor(
      `hsl(${Math.round(hue)}, ${Math.round(hslSaturation * 100)}%, ${Math.round(lightness * 100)}%)`,
    );
    setColorSelection({ hue, saturation, brightness });
  };

  const chooseColor = (e: React.PointerEvent<HTMLButtonElement>) => {
    const field = colorFieldRef.current;
    if (!field) return;
    const rect = field.getBoundingClientRect();
    const saturation = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100),
    );
    const brightness = Math.max(
      0,
      Math.min(100, 100 - ((e.clientY - rect.top) / rect.height) * 100),
    );

    updateColor(colorSelection.hue, saturation, brightness);
  };

  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isCanvasEmpty(canvas)) return;

    const trimmedName = name.trim().slice(0, 40);
    if (trimmedName && filter.isProfane(trimmedName)) {
      setMessage({ text: "Please choose a friendlier name.", error: true });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const safe = await isImageSafe(canvas);
      if (!safe) {
        setMessage({ text: "Image didn't pass our content check. Try something else!", error: true });
        setSaving(false);
        return;
      }

      const image = await exportDrawing(canvas);
      const visitorId = getVisitorId();
      const formData = new FormData();
      formData.append("visitor_id", visitorId);
      formData.append("name", trimmedName);
      formData.append("image", image, image.type === "image/webp" ? "drawing.webp" : "drawing.png");

      const res = await fetch("/api/drawings", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save");
      }

      setMessage({ text: "TY for contributing :)", error: false });
      setName("");
      clearCanvas();
    } catch (err: unknown) {
      setMessage({
        text: err instanceof Error ? err.message : "Something went wrong",
        error: true,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Wrapper>
      <CanvasColumn>
        <CanvasWrapper>
          <StyledCanvas
            ref={canvasRef}
            width={300}
            height={300}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </CanvasWrapper>
        <HistoryControls>
          <UndoRedoControls data-button-group>
            <IconButton aria-label="Undo" title="Undo" onClick={undo}>
              <FaArrowRotateLeft size={14} />
            </IconButton>
            <IconButton aria-label="Redo" title="Redo" onClick={redo}>
              <FaArrowRotateRight size={14} />
            </IconButton>
          </UndoRedoControls>
          <IconButton aria-label="Clear" title="Clear" onClick={handleClear}>
            <FaTrashCan size={14} />
          </IconButton>
        </HistoryControls>
      </CanvasColumn>

      <Utilities>
          <ColorControls>
            <ColorPicker>
              <ColorFields>
                <ColorPreview $color={color} aria-hidden="true" />
                <ColorField
                  ref={colorFieldRef}
                  type="button"
                  $hue={colorSelection.hue}
                  aria-label="Choose color saturation and brightness"
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    isChoosingColor.current = true;
                    chooseColor(e);
                  }}
                  onPointerMove={(e) => {
                    if (isChoosingColor.current) chooseColor(e);
                  }}
                  onPointerUp={() => {
                    isChoosingColor.current = false;
                  }}
                  onPointerCancel={() => {
                    isChoosingColor.current = false;
                  }}
                  onKeyDown={(e) => {
                    if (!e.key.startsWith("Arrow")) return;
                    e.preventDefault();
                    const saturation = Math.max(
                      0,
                      Math.min(
                        100,
                        colorSelection.saturation +
                          (e.key === "ArrowRight" ? 5 : e.key === "ArrowLeft" ? -5 : 0),
                      ),
                    );
                    const brightness = Math.max(
                      0,
                      Math.min(
                        100,
                        colorSelection.brightness +
                          (e.key === "ArrowUp" ? 5 : e.key === "ArrowDown" ? -5 : 0),
                      ),
                    );
                    updateColor(colorSelection.hue, saturation, brightness);
                  }}
                >
                  <ColorIndicator
                    $color={color}
                    $x={colorSelection.saturation}
                    $y={100 - colorSelection.brightness}
                  />
                </ColorField>
              </ColorFields>
              <HueSlider
                type="range"
                min="0"
                max="360"
                aria-label="Hue"
                $color={`hsl(${colorSelection.hue}, 100%, 50%)`}
                value={colorSelection.hue}
                onChange={(e) =>
                  updateColor(
                    Number(e.target.value),
                    colorSelection.saturation,
                    colorSelection.brightness,
                  )
                }
              />
            </ColorPicker>
          </ColorControls>

          <ToolRow data-button-group>
            <Label>Size</Label>
            {BRUSH_SIZES.map((b) => (
              <SizeButton
                key={b.size}
                $active={brushSize === b.size}
                aria-label={`${b.label} brush`}
                title={`${b.label} brush`}
                onClick={() => {
                  setBrushSize(b.size);
                  setTool("pen");
                }}
              >
                <BrushSizeCircle $size={b.size} />
              </SizeButton>
            ))}
          </ToolRow>

          <ToolRow data-button-group>
            <Label>Tool</Label>
            <IconButton
              $active={tool === "pen"}
              aria-label="Pen"
              title="Pen"
              onClick={() => setTool("pen")}
            >
              <FaPen size={14} />
            </IconButton>
            <IconButton
              $active={tool === "bucket"}
              aria-label="Fill bucket"
              title="Fill bucket"
              onClick={() => setTool("bucket")}
            >
              <FaBucket size={14} />
            </IconButton>
            <IconButton
              $active={tool === "eraser"}
              aria-label="Eraser"
              title="Eraser"
              onClick={() => setTool("eraser")}
            >
              <FaEraser size={14} />
            </IconButton>
          </ToolRow>

        <Input
          type="text"
          maxLength={40}
          placeholder="Name your creation (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <StatusRow>
          {message && (
            <Message $error={message.error} role="status" aria-live="polite">
              {message.text}
            </Message>
          )}
          {(!message || !message.error) && (
            <GardenLink href="/garden">View the garden →</GardenLink>
          )}
        </StatusRow>

        <DrawingActions data-button-group>
          <ActionButton $primary disabled={saving || !hasDrawing} onClick={handleSave}>
            {saving ? "Saving..." : "Plant it!"}
          </ActionButton>
        </DrawingActions>
      </Utilities>
    </Wrapper>
  );
}
