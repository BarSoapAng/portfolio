type TagLabelProps = {
  label: string;
};

export default function TagLabel({ label }: TagLabelProps) {
  return <span className="tag-label">{label}</span>;
}
