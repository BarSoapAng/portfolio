type TagLabelProps = {
  label: string;
  className?: string;
};

export default function TagLabel({ label, className = "retro-tag" }: TagLabelProps) {
  return (
    <span className={className}>
      {label}
    </span>
  );
}
