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
  max-width: 320px;
  margin: 0 auto;
`;

const Title = styled.h3`
  font-family: var(--font-display);
  font-size: var(--font-size-2xl);
  color: var(--color-text);
  margin: 0 0 var(--space-4);
  text-align: center;
`;

const CanvasWrapper = styled.div`
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-small);
  display: flex;
  justify-content: center;
  padding: var(--space-2);
  background: var(--color-surface-muted);
  margin-bottom: var(--space-4);
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
  const isDrawing = useRef(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(6);
  const [eraser, setEraser] = useState(false);
  const [name, setName] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    clearCanvas();
  }, [clearCanvas]);

  const getPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
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
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
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
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
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
      <Title>Your Plot</Title>
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
    </Wrapper>
  );
}
