import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes";

export default function Navbar() {
  const location = useLocation();

  const navRoutes = routes.filter((r) => r.showInNavbar);

  return (
    <div className="w-full font-mono">
      <div className="relative w-full bg-[#f6d6a8] border-4 border-[#8b6b4a]">
        {/* Title bar */}
        <div className="h-12 flex items-center px-4 bg-[#f2c28f] border-b-4 border-[#8b6b4a]">
          <span className="text-lg">title</span>
        </div>

        {/* Tabs */}
        <div className="relative h-10">
          {navRoutes.map((page, i) => {
            const isActive = location.pathname === page.path;

            return (
              <Link
                key={page.path}
                to={page.path}
                className={`
                  absolute bottom-0
                  px-4 py-1
                  border-4 border-[#8b6b4a]
                  text-black
                  transition-all duration-150
                  ${isActive
                    ? "bg-[#f6d6a8] z-30 -top-1"
                    : "bg-[#e5b37d] z-10 top-1 hover:bg-[#f2c28f]"
                  }
                `}
                style={{
                  right: `${16 + i * 84}px`,
                }}
              >
                {page.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
