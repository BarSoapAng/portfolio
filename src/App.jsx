import SelfDescriptionCard from '@components/SelfDescriptionCard'
import AngelaInfoCard from '@components/AngelaInfoCard'

function App() {
  return (
    <>
      <div className="grid grid-cols-[0.5fr_1.5fr_1fr] grid-rows-3 gap-2 m-5">
        <div className="col-start-1 row-span-3 border">Left</div>

        <div className="grid grid-rows-[auto_auto] col-start-2 border gap-2">
          <div className="row-start-1 border"><SelfDescriptionCard /></div>
          <div className="row-start-2 border">Center Bottom</div>
        </div>

        <div className="grid grid-rows-[auto_auto_auto] col-start-3 border gap-2">
          <div className="row-start-1 border"><AngelaInfoCard /></div>
          <div className="row-start-2 border">Right Middle</div>
          <div className="row-start-3 grid grid-cols-2 gap-2">
            <div className="border">RB Left</div>
            <div className="border">RB Right</div>
          </div>
        </div>        
      </div>
    </>
  )
}

export default App