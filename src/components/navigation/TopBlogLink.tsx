import Link from "next/link";

type TopBlogLinkProps = {
  dateLabel: string;
  href: string;
  title: string;
};

export default function TopBlogLink({ dateLabel, href, title }: TopBlogLinkProps) {
  return (
    <li>
      <Link href={href} title={title}>
        {title}
      </Link>{" "}
      <span>{dateLabel}</span>
    </li>
  );
}
