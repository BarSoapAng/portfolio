import Link from "next/link";

type TopBlogLinkProps = {
  dateLabel: string;
  href: string;
  title: string;
};

export default function TopBlogLink({ dateLabel, href, title }: TopBlogLinkProps) {
  return (
    <div className="border-2 border-sand-1 bg-cream-2 p-1">
      <Link
        className="flex min-h-[64px] items-center border-2 border-sand-1 bg-paper-1 px-3 py-2 text-sand-1 transition hover:bg-cream-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-2 focus-visible:ring-offset-1 focus-visible:ring-offset-cream-2"
        href={href}
      >
        <div className="min-w-0">
          <div
            className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] leading-tight text-gray-2"
            title={title}
          >
            {title}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.08em] text-sand-1">
            {dateLabel}
          </div>
        </div>
      </Link>
    </div>
  );
}
