type TopBlogLinkProps = {
  title: string;
};

export default function TopBlogLink({ title }: TopBlogLinkProps) {
  return (
    <div className="border-2 border-sand-1 border-b-white-1 bg-cream-2 p-1">
      <div className="flex min-h-[48px] items-center border-2 border-sand-1 border-b-white-1 bg-paper-1 px-3 text-[15px] leading-tight text-sand-1">
        {title}
      </div>
    </div>
  )
}
