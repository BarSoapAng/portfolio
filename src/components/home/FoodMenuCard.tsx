const menuItems = [
  { label: 'TOP', name: 'Sweet and Sour Ribs', tone: 'text-pink-600' },
  { label: 'NEW', name: 'Orange Glazed Ribs', tone: 'text-blue-600' },
  { label: 'SET', name: 'Chicken Rice Plate', tone: 'text-green-600' },
  { label: 'HOT', name: 'Curry Chicken', tone: 'text-red-600' },
  { label: 'COZY', name: 'Coconut Chicken', tone: 'text-purple-600' },
  { label: 'FAVE', name: 'Garlic Chicken Rice', tone: 'text-pink-600' },
  { label: 'CRISPY', name: 'Spicy Crispy Chicken', tone: 'text-orange-600' },
  { label: 'SIP', name: 'Milk Tea', tone: 'text-blue-600' },
  { label: 'COLD', name: 'Orange Juice', tone: 'text-green-600' },
  { label: 'SWEET', name: 'Honey Tea', tone: 'text-amber-600' },
  { label: 'ADD', name: 'Red Bean Add-On', tone: 'text-red-600' },
  { label: 'CALM', name: 'Green Tea', tone: 'text-emerald-600' },
  { label: 'CHEF', name: 'Spiced Beef', tone: 'text-purple-600' },
]

export default function FoodMenuCard() {
  return (
    <div className="w-full max-w-[260px] bg-[#f6d6a8] border-2 border-[#8b6b4a] p-1 font-mono text-black">
      <div className="space-y-1">
        <div className="bg-[#f2c28f] border-2 border-[#8b6b4a] border-b-white px-3 py-2 text-center">
          <div className="font-bold text-purple-600">Today&apos;s Menu</div>
          <div className="text-[11px] text-blue-600">favorite comfort picks and drinks</div>
        </div>

        {menuItems.map((item) => (
          <div
            key={item.name}
            className="grid grid-cols-[64px_1fr] gap-1 bg-[#f2c28f] border-2 border-[#8b6b4a] border-b-white p-1"
          >
            <div className="flex min-h-[48px] items-center justify-center border-2 border-[#8b6b4a] border-b-white bg-[#fff4d8] px-1 text-center text-[10px] font-bold tracking-wide">
              <span className={item.tone}>{item.label}</span>
            </div>
            <div className="flex min-h-[48px] items-center border-2 border-[#8b6b4a] border-b-white bg-[#fff7e7] px-3 text-[15px] leading-tight text-[#2f2418]">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
