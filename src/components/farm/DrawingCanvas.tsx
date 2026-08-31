"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { getVisitorId } from "@lib/visitor-id";
import { isImageSafe } from "@lib/nsfw-check";
import { Filter } from "bad-words";

const filter = new Filter();

const COLORS = [
  "#000000",
  "#ffffff",
  "#a94065",
  "#69745a",
  "#8a5942",
  "#f9dce5",
  "#e5e9de",
  "#3e302d",
];

const BRUSH_SIZES = [
  { label: "S", size: 2 },
  { label: "M", size: 6 },
  { label: "L", size: 12 },
];

const Wrapper = styled.div`
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-medium);
  padding: var(--space-6);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-6);

  @media (max-width: 42rem) {
    grid-template-columns: 1fr;
  }
`;

const CanvasWrapper = styled.div`
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-small);
  display: flex;
  justify-content: center;
  align-items: start;
  padding: var(--space-2);
  background: var(--color-surface-muted);
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCanvas = styled.canvas`
  cursor: crosshair;
  border-radius: var(--radius-small);
  touch-action: none;
`;

const ToolRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
  flex-wrap: wrap;
`;

const Label = styled.span`
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
`;

const ColorSwatch = styled.button<{ $c: string; $active: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: var(--radius-circle);
  border: 2px solid
    ${(p) => (p.$active ? "var(--color-primary)" : "var(--color-border)")};
  background: ${(p) => p.$c};
  cursor: pointer;
  padding: 0;
  outline-offset: 2px;
  box-shadow: ${(p) => (p.$active ? "0 0 0 2px var(--color-primary-soft)" : "none")};
`;

const SizeButton = styled.button<{ $active: boolean }>`
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-small);
  border: 1px solid
    ${(p) => (p.$active ? "var(--color-primary)" : "var(--color-border)")};
  background: ${(p) => (p.$active ? "var(--color-primary-soft)" : "var(--color-surface)")};
  color: var(--color-text);
  cursor: pointer;
`;

const ToolButton = styled.button<{ $active?: boolean }>`
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-small);
  border: 1px solid
    ${(p) => (p.$active ? "var(--color-primary)" : "var(--color-border)")};
  background: ${(p) => (p.$active ? "var(--color-primary-soft)" : "var(--color-surface)")};
  color: var(--color-text);
  cursor: pointer;
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

const SaveButton = styled.button`
  width: 100%;
  padding: var(--space-2) var(--space-4);
  background: var(--color-primary);
  color: var(--color-on-primary);
  border: none;
  border-radius: var(--radius-medium);
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: var(--color-primary-hover);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
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
      clearCanvas();
    } catch (err: any) {
      setMessage({ text: err.message || "Something went wrong", error: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Wrapper>
      <CanvasWrapper>
        <StyledCanvas
          ref={canvasRef}
          width={200}
          height={200}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </CanvasWrapper>

      <Controls>
        <ToolRow>
          <Label>Color</Label>
          {COLORS.map((c) => (
            <ColorSwatch
              key={c}
              $c={c}
              $active={!eraser && color === c}
              onClick={() => {
                setColor(c);
                setEraser(false);
              }}
            />
          ))}
        </ToolRow>

        <ToolRow>
          <Label>Size</Label>
          {BRUSH_SIZES.map((b) => (
            <SizeButton
              key={b.size}
              $active={brushSize === b.size}
              onClick={() => setBrushSize(b.size)}
            >
              {b.label}
            </SizeButton>
          ))}
          <ToolButton $active={eraser} onClick={() => setEraser(!eraser)}>
            Eraser
          </ToolButton>
          <ToolButton onClick={undo}>Undo</ToolButton>
          <ToolButton onClick={redo}>Redo</ToolButton>
          <ToolButton onClick={clearCanvas}>Clear</ToolButton>
        </ToolRow>

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

        <SaveButton disabled={saving} onClick={handleSave}>
          {saving ? "Saving..." : "Plant it!"}
        </SaveButton>

        {message && <Message $error={message.error}>{message.text}</Message>}
      </Controls>
    </Wrapper>
  );
}
