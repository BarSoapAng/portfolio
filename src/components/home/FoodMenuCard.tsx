const menuItems = [
  '糖醋排骨',
  '橙汁排骨',
  '印度雞黃飯',
  '日式咖哩雞',
  '椰汁雞肉',
  '蒜蓉雞肉飯',
  '濕邪鬱積',
  '奶茶',
  '柳橙汁',
  '蜂蜜茶',
  '加紅豆',
  '綠茶',
  '印式牛肉',
]

export default function FoodMenuCard() {
  return (
    <div className="w-full max-w-[240px] bg-[linear-gradient(180deg,#efe8a7_0%,#b6c2ff_100%)] border-2 border-[#5d78a6] p-1">
      <div className="space-y-1">
        {menuItems.map((item) => (
          <div key={item} className="grid grid-cols-[60px_1fr] gap-1">
            <div className="h-[52px] border-2 border-[#5d78a6] bg-[#d7d7d7] flex items-center justify-center text-[10px] font-bold tracking-wide text-[#3d4e6c]">
              STAR ICON
            </div>
            <div className="h-[52px] border-2 border-[#5d78a6] bg-[#d7d7d7] flex items-center justify-center px-2 text-center text-[22px] leading-none sm:text-[24px]">
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
