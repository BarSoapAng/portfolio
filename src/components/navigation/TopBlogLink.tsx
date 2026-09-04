import Link from "next/link";
import { Caption, Strong, Text } from "@components/ui/Typography";

type TopBlogLinkProps = {
  dateLabel: string;
  href: string;
  title: string;
};

export default function TopBlogLink({ dateLabel, href, title }: TopBlogLinkProps) {
  return (
    <Text as="li">
      <Link href={href} title={title}>
        <Strong>{title}</Strong>
      </Link>{" "}
      <Caption>{dateLabel}</Caption>
    </Text>
  );
}
