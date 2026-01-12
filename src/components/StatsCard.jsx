import selfie from '@assets/selfie.jpg'
import { PiCoffeeLight, PiCoffeeFill } from "react-icons/pi";


export default function StatsCard() {
  return (
    <div className="w-full bg-green-200 border-2 border-green-800 p-1 font-mono text-black">

      <div className="grid grid-cols-[250px_1fr] gap-1">
        <div className="flex flex-col gap-1">
          
          <div className="border-2 border-green-800 border-b-white py-2 px-4">
            <span className="font-bold text-purple-600">
              Archetype:
            </span>
            <span className='text-black'> Shapeshifter</span>
          </div>

          <div className="border-2 border-green-800 border-b-white py-2 px-4">
            <span className="font-bold text-purple-600">
              Impressions:
            </span>
            <span className='text-black'> 4M+</span>
          </div>

          <div className="border-2 border-green-800 border-b-white py-2 px-4">
            <span className="font-bold text-purple-600">
              Projects: 
            </span>
            <span className='text-black'> 9</span>
          </div>
          
          <div className="border-2 border-green-800 border-b-white py-2 px-4">
            <span className="font-bold text-purple-600">
              Users: 
            </span>
            <span className='text-black'> 51K+</span>
          </div>

          <div className="flex border-2 border-green-800 border-b-white py-2 px-4">
            <span className="font-bold text-purple-600">
              Caffeination: 
            </span>
            <PiCoffeeFill className='w-5 text-green-500'/>
            <PiCoffeeFill className='w-5 text-green-500'/>
            <PiCoffeeLight />
            <PiCoffeeLight />
            <PiCoffeeLight />
          </div>
        </div>

        <div className="w-full h-full min-h-[300px] border-2 border-green-800 border-b-white relative overflow-hidden">
          <img
            src={selfie}
            alt="angela's selfie"
            className="absolute w-full h-full object-top-left object-cover"
          />
        </div>
      </div>
    </div>
  );
}
