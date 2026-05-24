type TagLabelProps = {
  label: string;
  className?: string;
};

const DEFAULT_CLASS =
  "inline-block border border-sand-1 bg-paper-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-sand-1";

export default function TagLabel({ label, className = DEFAULT_CLASS }: TagLabelProps) {
  return <span className={className}>{label}</span>;
}
