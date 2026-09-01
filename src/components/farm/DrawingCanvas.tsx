"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { getVisitorId } from "@lib/visitor-id";
import { isImageSafe } from "@lib/nsfw-check";
import { Filter } from "bad-words";
import { FaEraser, FaPen, FaTrashCan } from "react-icons/fa6";
import { MdUndo, MdRedo } from "react-icons/md";

const filter = new Filter();

const BRUSH_SIZES = [
  { label: "Small", size: 2 },
  { label: "Medium", size: 6 },
  { label: "Large", size: 12 },
];

const Wrapper = styled.div`
  padding: var(--space-3);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(15rem, 18rem);
  align-items: start;
  gap: var(--space-3);

  @media (max-width: 42rem) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const CanvasWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 20rem;
  background: var(--color-surface-muted);
  border-radius: var(--radius-small);
  overflow: hidden;
`;

const StyledCanvas = styled.canvas`
  cursor: crosshair;
  touch-action: none;
  display: block;
  width: 100%;
  height: auto;
`;

const Utilities = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const ToolRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
`;

const HistoryControls = styled(ToolRow)`
  justify-content: flex-end;
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
  grid-template-columns: 3rem minmax(0, 1fr);
  gap: var(--space-2);
  width: 100%;
`;

const ColorPreview = styled.div<{ $color: string }>`
  min-width: 0;
  height: 7rem;
  border-radius: var(--radius-small);
  background: ${(p) => p.$color};
`;

const ColorField = styled.button<{ $hue: number }>`
  position: relative;
  width: 100%;
  height: 7rem;
  padding: 0;
  border-radius: var(--radius-small);
  border: 0;
  background:
    linear-gradient(to top, #000000, transparent),
    linear-gradient(to right, #ffffff, transparent),
    hsl(${(p) => p.$hue}, 100%, 50%);
  box-shadow: 0 0 0 1px var(--color-border);
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
  grid-column: 1 / -1;
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
  border: 1px solid
    ${(p) => (p.$active ? "var(--color-primary)" : "var(--color-border)")};
  background: ${(p) => (p.$active ? "var(--color-primary-soft)" : "var(--color-surface)")};
  color: var(--color-text);
  cursor: pointer;
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
  border: 1px solid
    ${(p) => (p.$active ? "var(--color-primary)" : "var(--color-border)")};
  background: ${(p) => (p.$active ? "var(--color-primary-soft)" : "var(--color-surface)")};
  color: ${(p) => (p.$active ? "var(--color-primary)" : "var(--color-text-muted)")};
  cursor: pointer;
  padding: 0;

  &:hover {
    background: var(--color-surface-muted);
    color: var(--color-text);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-small);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  background: var(--color-surface);
  margin-bottom: var(--space-3);
  box-sizing: border-box;

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  margin-bottom: var(--space-3);
  cursor: pointer;
`;

const ActionButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  width: 100%;
  padding: var(--space-2) var(--space-4);
  background: ${(p) =>
    p.$variant === "secondary" ? "var(--color-surface)" : "var(--color-primary)"};
  color: ${(p) =>
    p.$variant === "secondary" ? "var(--color-text)" : "var(--color-on-primary)"};
  border: ${(p) =>
    p.$variant === "secondary" ? "1px solid var(--color-border)" : "none"};
  border-radius: var(--radius-medium);
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${(p) =>
      p.$variant === "secondary"
        ? "var(--color-surface-muted)"
        : "var(--color-primary-hover)"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StepButtons = styled.div`
  display: flex;
  gap: var(--space-2);
`;

const Message = styled.p<{ $error?: boolean }>`
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: ${(p) => (p.$error ? "var(--color-primary)" : "var(--color-accent)")};
  text-align: center;
  margin: var(--space-2) 0 0;
`;

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
  const [eraser, setEraser] = useState(false);
  const [name, setName] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
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
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
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
  }, []);

  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || redoStack.current.length === 0) return;
    history.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.putImageData(redoStack.current.pop()!, 0, 0);
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
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);
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
    saveSnapshot();
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = eraser ? "#ffffff" : color;
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
    setEraser(false);
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

    const trimmedName = name.trim().slice(0, 40);
    if (!trimmedName) {
      setMessage({ text: "Please name your creation!", error: true });
      return;
    }

    if (filter.isProfane(trimmedName)) {
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

      const imageData = canvas.toDataURL("image/png");
      const visitorId = getVisitorId();

      const res = await fetch("/api/drawings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitor_id: visitorId,
          name: trimmedName,
          image_data: imageData,
          is_published: isPublished,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save");
      }

      setMessage({ text: "Saved! 🌱", error: false });
      setName("");
      setIsPublished(false);
      setStep(1);
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
      <CanvasWrapper>
        <StyledCanvas
          ref={canvasRef}
          width={300}
          height={300}
          onMouseDown={step === 1 ? startDrawing : undefined}
          onMouseMove={step === 1 ? draw : undefined}
          onMouseUp={step === 1 ? stopDrawing : undefined}
          onMouseLeave={step === 1 ? stopDrawing : undefined}
          onTouchStart={step === 1 ? startDrawing : undefined}
          onTouchMove={step === 1 ? draw : undefined}
          onTouchEnd={step === 1 ? stopDrawing : undefined}
          style={step === 2 ? { cursor: "default" } : undefined}
        />
      </CanvasWrapper>

      {step === 1 && (
        <Utilities>
          <HistoryControls>
            <IconButton aria-label="Undo" title="Undo" onClick={undo}>
              <MdUndo size={16} />
            </IconButton>
            <IconButton aria-label="Redo" title="Redo" onClick={redo}>
              <MdRedo size={16} />
            </IconButton>
          </HistoryControls>

          <ColorControls>
            <Label>Color</Label>
            <ColorPicker>
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
                      colorSelection.brightness + (e.key === "ArrowUp" ? 5 : e.key === "ArrowDown" ? -5 : 0),
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

          <ToolRow>
            <Label>Size</Label>
            {BRUSH_SIZES.map((b) => (
              <SizeButton
                key={b.size}
                $active={brushSize === b.size}
                aria-label={`${b.label} brush`}
                title={`${b.label} brush`}
                onClick={() => {
                  setBrushSize(b.size);
                  setEraser(false);
                }}
              >
                <BrushSizeCircle $size={b.size} />
              </SizeButton>
            ))}
          </ToolRow>

          <ToolRow>
            <Label>Tool</Label>
            <IconButton
              $active={!eraser}
              aria-label="Pen"
              title="Pen"
              onClick={() => setEraser(false)}
            >
              <FaPen size={14} />
            </IconButton>
            <IconButton
              $active={eraser}
              aria-label="Eraser"
              title="Eraser"
              onClick={() => setEraser(true)}
            >
              <FaEraser size={14} />
            </IconButton>
          </ToolRow>

          <ToolRow>
            <IconButton aria-label="Clear canvas" title="Clear canvas" onClick={clearCanvas}>
              <FaTrashCan size={14} />
            </IconButton>
          </ToolRow>

          <ActionButton onClick={() => setStep(2)}>Next</ActionButton>
        </Utilities>
      )}

      {step === 2 && (
        <Utilities>
          <Input
            type="text"
            maxLength={40}
            placeholder="Name your creation"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <CheckboxRow>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            Share to gallery
          </CheckboxRow>

          <StepButtons>
            <ActionButton $variant="secondary" onClick={() => setStep(1)}>
              Back
            </ActionButton>
            <ActionButton disabled={saving} onClick={handleSave}>
              {saving ? "Saving..." : "Plant it!"}
            </ActionButton>
          </StepButtons>

          {message && <Message $error={message.error}>{message.text}</Message>}
        </Utilities>
      )}
    </Wrapper>
  );
}
