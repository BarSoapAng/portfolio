import TopBlogLink from './TopBlogLink'

const menuItems = [
  'Sweet and Sour Ribs',
  'Orange Glazed Ribs',
  'Chicken Rice Plate',
  'Curry Chicken',
  'Coconut Chicken',
  'Garlic Chicken Rice',
  'Spicy Crispy Chicken',
  'Milk Tea',
  'Orange Juice',
  'Honey Tea',
  'Red Bean Add-On',
  'Green Tea',
  'Spiced Beef',
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
          <TopBlogLink key={item} title={item} />
        ))}
      </div>
    </div>
  )
}
