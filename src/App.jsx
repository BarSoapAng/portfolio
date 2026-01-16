import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import Navbar from "@components/Navbar";

import background from '@assets/bg.gif'

export default function App() {
  return (
    <>
      <img src={background} className='absolute z-[-1] h-full w-full object-cover'/>
      <div className="w-dvw h-dvh  overflow-x-hidden">
        <Navbar />

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          {routes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Routes>
      </div>
    </>
  );
}
