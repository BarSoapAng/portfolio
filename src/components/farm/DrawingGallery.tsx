"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

interface Drawing {
  id: string;
  name: string;
  image_data: string;
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

const CardName = styled.p`
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  margin: 0;
  padding: var(--space-2) var(--space-3);
  text-align: center;
  border-top: 1px solid var(--color-border);
`;

const EmptyMessage = styled.p`
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  color: var(--color-text-muted);
  text-align: center;
  padding: var(--space-8) 0;
  margin: 0;
`;

export default function DrawingGallery() {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/drawings")
      .then((res) => res.json())
      .then((data) => {
        setDrawings(data.drawings || []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  if (!loaded) return null;

  return (
    <Section>
      <Heading>Gallery</Heading>
      {drawings.length === 0 ? (
        <EmptyMessage>No drawings yet — be the first!</EmptyMessage>
      ) : (
        <Grid>
          {drawings.map((d) => (
            <Card key={d.id}>
              <DrawingImage src={d.image_data} alt={d.name} />
              <CardName>{d.name}</CardName>
            </Card>
          ))}
        </Grid>
      )}
    </Section>
  );
}
