import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import Navbar from "@components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Routes>
    </>
  );
}
