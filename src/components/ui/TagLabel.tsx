type TagLabelProps = {
  label: string;
  className?: string;
};

export default function TagLabel({
  label,
  className = "border border-sand-1 bg-paper-1 px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] text-sand-1",
}: TagLabelProps) {
  return (
    <span className={className}>
      {label}
    </span>
  );
}
