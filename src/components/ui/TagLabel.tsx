type TagLabelProps = {
  label: string;
};

export default function TagLabel({ label }: TagLabelProps) {
  return <span>{label} </span>;
}
