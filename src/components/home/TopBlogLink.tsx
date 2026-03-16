import Link from "next/link";

type TopBlogLinkProps = {
  dateLabel: string;
  href: string;
  title: string;
};

export default function TopBlogLink({ dateLabel, href, title }: TopBlogLinkProps) {
  return (
    <div className="border-2 border-[#8b6b4a] border-b-white bg-[#f2c28f] p-1">
      <Link
        className="flex min-h-[64px] items-center border-2 border-[#8b6b4a] border-b-white bg-[#fff7e7] px-3 py-2 text-[#2f2418] transition hover:bg-[#fff1d2]"
        href={href}
      >
        <div className="min-w-0">
          <div className="line-clamp-2 text-[15px] leading-tight">{title}</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[#6a4d2d]">{dateLabel}</div>
        </div>
      </Link>
    </div>
  );
}
