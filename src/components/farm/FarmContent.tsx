"use client";

import styled from "styled-components";
import DrawingCanvas from "@components/farm/DrawingCanvas";
import DrawingGallery from "@components/farm/DrawingGallery";
import MyDrawings from "@components/farm/MyDrawings";

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
`;

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: var(--font-size-3xl);
  color: var(--color-primary);
  text-align: center;
  margin-bottom: var(--space-2);
`;

const Subtitle = styled.p`
  font-family: var(--font-body);
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  text-align: center;
  margin-bottom: var(--space-8);
`;

const Section = styled.section`
  margin-bottom: var(--space-8);
`;

export default function FarmContent() {
  return (
    <PageWrapper>
      <Title>Community Farm</Title>
      <Subtitle>
        Draw on your own little plot and share it with the world!
      </Subtitle>
      <Section>
        <DrawingCanvas />
      </Section>
      <Section>
        <MyDrawings />
      </Section>
      <Section>
        <DrawingGallery />
      </Section>
    </PageWrapper>
  );
}
