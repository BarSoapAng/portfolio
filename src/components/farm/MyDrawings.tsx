"use client";

import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { getVisitorId } from "@lib/visitor-id";

interface Drawing {
  id: string;
  name: string;
  image_data: string;
  is_published: boolean;
  created_at: string;
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const Heading = styled.h2`
  font-family: var(--font-display);
  font-size: var(--font-size-2xl);
  color: var(--color-text);
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-medium);
  overflow: hidden;
`;

const DrawingImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  background: white;
  display: block;
`;

const CardBody = styled.div`
  padding: var(--space-2) var(--space-3);
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

const CardName = styled.p`
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  margin: 0;
`;

const Badge = styled.span<{ $published: boolean }>`
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: var(--space-0) var(--space-2);
  border-radius: var(--radius-pill);
  background: ${(p) =>
    p.$published ? "var(--color-primary-soft)" : "var(--color-surface-muted)"};
  color: ${(p) =>
    p.$published ? "var(--color-primary)" : "var(--color-text-muted)"};
  width: fit-content;
`;

const Actions = styled.div`
  display: flex;
  gap: var(--space-2);
`;

const ActionButton = styled.button`
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-small);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;

  &:hover {
    background: var(--color-surface-muted);
  }
`;

const DeleteButton = styled(ActionButton)`
  color: var(--color-primary);
  border-color: var(--color-primary);

  &:hover {
    background: var(--color-primary-soft);
  }
`;

export default function MyDrawings() {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchDrawings = useCallback(async () => {
    const visitorId = getVisitorId();
    if (!visitorId) return;
    try {
      const res = await fetch(
        `/api/drawings/mine?visitor_id=${encodeURIComponent(visitorId)}`
      );
      const data = await res.json();
      setDrawings(data.drawings || []);
    } catch {
      // ignore
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchDrawings();
  }, [fetchDrawings]);

  const togglePublish = async (drawing: Drawing) => {
    const visitorId = getVisitorId();
    if (!visitorId) return;
    await fetch(`/api/drawings/${drawing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitor_id: visitorId,
        is_published: !drawing.is_published,
      }),
    });
    fetchDrawings();
  };

  const deleteDrawing = async (drawing: Drawing) => {
    if (!window.confirm("Delete this drawing?")) return;
    const visitorId = getVisitorId();
    if (!visitorId) return;
    await fetch(`/api/drawings/${drawing.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitor_id: visitorId }),
    });
    fetchDrawings();
  };

  if (!loaded || drawings.length === 0) return null;

  return (
    <Section>
      <Heading>My Drawings</Heading>
      <Grid>
        {drawings.map((d) => (
          <Card key={d.id}>
            <DrawingImage src={d.image_data} alt={d.name} />
            <CardBody>
              <CardName>{d.name}</CardName>
              <Badge $published={d.is_published}>
                {d.is_published ? "Published" : "Unpublished"}
              </Badge>
              <Actions>
                <ActionButton onClick={() => togglePublish(d)}>
                  {d.is_published ? "Unpublish" : "Publish"}
                </ActionButton>
                <DeleteButton onClick={() => deleteDrawing(d)}>
                  Delete
                </DeleteButton>
              </Actions>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
