export default function TopBlogLink({ title }) {
  return (
    <div className="bg-[#f2c28f] border-2 border-[#8b6b4a] border-b-white p-1">
      <div className="flex min-h-[48px] items-center border-2 border-[#8b6b4a] border-b-white bg-[#fff7e7] px-3 text-[15px] leading-tight text-[#2f2418]">
        {title}
      </div>
    </div>
  )
}
