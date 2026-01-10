import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes";

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="w-full bg-gray-500 border-b-2 border-blue-700">
      <div className="h-12 flex justify-between items-end px-1">
        {/* LEFT: Title */}
        <h2 className="ml-4 my-auto whitespace-nowrap">
          Angela's Universe
        </h2>

        {/* RIGHT: Tabs */}
        <div className="flex items-end">
          {routes.map((page) => {
            const isActive = location.pathname === page.path;

            return (
              <Link
                key={page.path}
                to={page.path}
                className={`
                  px-3
                  border-2 border-b-0
                  border-t-white border-l-white border-r-black
                  bg-blue-300 text-black
                  rounded-t-md
                  flex items-center justify-center
                  ${isActive
                    ? `
                      bg-blue-600 text-white
                      h-[34px]
                      -mt-[4px]
                      -mb-[2px]
                      border-b-gray-500
                    `
                    : `
                      h-[30px]
                    `}
                `}
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
