"use client";

import styled from "styled-components";
import { Text } from "@components/ui/Typography";
import { usePageViews } from "../../hooks/usePageViews";

const stats = [
  { label: "Archetype", value: "Shapeshifter" },
  { label: "Impressions", value: "4M+" },
  { label: "Projects", value: "7" },
];

const CAFFEINE_LEVEL = 2;
const CAFFEINE_MAX = 5;

const Stats = styled.dl`
  div {
    display: grid;
    grid-template-columns: minmax(8rem, 1fr) 2fr;
    gap: var(--space-4);
    padding-block: var(--space-2);
    border-bottom: 1px solid var(--color-border);
  }

  dd {
    margin: 0;
  }
`;

export default function StatsCard() {
  const views = usePageViews();

  return (
    <Stats>
      {stats.map(({ label, value }) => (
        <div key={label}>
          <Text as="dt">{label}:</Text>
          <Text as="dd">{value}</Text>
        </div>
      ))}
      <div>
        <Text as="dt">Site Views:</Text>
        <Text as="dd">{views === null ? "..." : views.toLocaleString()}</Text>
      </div>
      <div>
        <Text as="dt">Caffeination:</Text>
        <Text as="dd">
          {CAFFEINE_LEVEL} of {CAFFEINE_MAX}
        </Text>
      </div>
      <div>
        <Text as="dt">Ownership</Text>
        <Text as="dd">4 of 5</Text>
      </div>
      <div>
        <Text as="dt">Speed</Text>
        <Text as="dd">2 of 5</Text>
      </div>
      <div>
        <Text as="dt">Quality</Text>
        <Text as="dd">4 of 5</Text>
      </div>
      <div>
        <Text as="dt">Communication</Text>
        <Text as="dd">5 of 5</Text>
      </div>
      <div>
        <Text as="dt">Design</Text>
        <Text as="dd">3 of 5</Text>
      </div>
    </Stats>
  );
}
