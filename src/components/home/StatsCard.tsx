"use client";

import styled from "styled-components";

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
  return (
    <Stats>
      {stats.map(({ label, value }) => (
        <div key={label}>
          <dt>{label}:</dt>
          <dd>{value}</dd>
        </div>
      ))}
      <div>
        <dt>Caffeination:</dt>
        <dd>
          {CAFFEINE_LEVEL} of {CAFFEINE_MAX}
        </dd>
      </div>
      <div>
        <dt>Ownership</dt>
        <dd>4 of 5</dd>
      </div>
      <div>
        <dt>Speed</dt>
        <dd>2 of 5</dd>
      </div>
      <div>
        <dt>Quality</dt>
        <dd>4 of 5</dd>
      </div>
      <div>
        <dt>Communication</dt>
        <dd>5 of 5</dd>
      </div>
      <div>
        <dt>Design</dt>
        <dd>3 of 5</dd>
      </div>
    </Stats>
  );
}
