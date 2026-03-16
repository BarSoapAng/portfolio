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
    <div className="w-full max-w-[260px] border-2 border-sand-1 bg-cream-1 p-1 text-black-1">
      <div className="space-y-1">
        <div className="border-2 border-sand-1 border-b-white-1 bg-cream-2 px-3 py-2 text-center">
          <div className="font-bold text-purple-1">Today&apos;s Menu</div>
          <div className="text-[11px] text-blue-1">favorite comfort picks and drinks</div>
        </div>

        {menuItems.map((item) => (
          <TopBlogLink key={item} title={item} />
        ))}
      </div>
    </div>
  )
}
