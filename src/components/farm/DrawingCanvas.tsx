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

const ColorPicker = styled.input`
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: var(--radius-circle);
  border: 0;
  background: none;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: 2px solid var(--color-border);
    border-radius: var(--radius-circle);
  }

  &::-moz-color-swatch {
    border: 2px solid var(--color-border);
    border-radius: var(--radius-circle);
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
  const isDrawing = useRef(false);
  const [color, setColor] = useState("#000000");
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
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    clearCanvas();
  }, [clearCanvas]);

  const getPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const rect = rectRef.current!;
    const canvas = canvasRef.current!;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
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

          <ToolRow>
            <Label>Color</Label>
            <ColorPicker
              type="color"
              aria-label="Choose brush color"
              value={color}
              onClick={() => setEraser(false)}
              onChange={(e) => {
                setColor(e.target.value);
                setEraser(false);
              }}
            />
          </ToolRow>

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
