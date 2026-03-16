type TopBlogLinkProps = {
  title: string
}

export default function TopBlogLink({ title }: TopBlogLinkProps) {
  return (
    <div className="h-full bg-[#f2c28f] border-2 border-[#8b6b4a] border-b-white p-1">
      <div className="flex h-full min-h-0 items-center border-2 border-[#8b6b4a] border-b-white bg-[#fff7e7] px-3 text-[13px] leading-tight text-[#2f2418]">
        {title}
      </div>
    </div>
  )
}
