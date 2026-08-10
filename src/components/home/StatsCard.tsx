const stats = [
  { label: "Archetype", value: "Shapeshifter" },
  { label: "Impressions", value: "4M+" },
  { label: "Projects", value: "9" },
];

const CAFFEINE_LEVEL = 2;
const CAFFEINE_MAX = 5;

export default function StatsCard() {
  return (
    <dl>
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
    </dl>
  );
}
