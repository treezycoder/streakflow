// components/sidebar/DesktopSidebar.tsx
import { Navigation } from "@/types/states";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useOutSideClick";
import { ReactNode } from "react";
import { setNavigation } from "@/redux/slices/app";
import { motion } from "framer-motion";

export interface NavigationOptions {
  icon: ReactNode;
  option: Navigation;
}

interface Props {
  options: NavigationOptions[];
  className?: string;
}

const DesktopSidebar: React.FC<Props> = ({ options, className = "" }) => {
  const dispatch = useAppDispatch();
  const { navigation } = useAppSelector((state) => state.app);

  const handleNav = (option: Navigation) => {
    dispatch(setNavigation(option));
  };

  return (
    <aside
      className={`${className} shadow-3xl hidden lg:flex flex-col gap-4 w-[240px] h-screen fixed top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 pt-0`}
    >
      {/* Logo here  */}
      <motion.div
        onClick={() => dispatch(setNavigation("dashboard"))}
        className="w-full h-[calc(100px)] overflow-hidden flex  items-center cursor-pointer"
      >
        <span className="text-xl lg:text-2xl font-poppins  font-bold tracking-wide bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent capitalize">
          Streak
        </span>
        {/* <span className="text-xl font-poppins sm:text-2xl md:text-3xl font-bold tracking-wide text-black capitalize">
          Streak
        </span> */}
        <span className="text-xl lg:text-2xl font-inter  font-bold tracking-wide text-gray-400 capitalize">
          Flow
        </span>
      </motion.div>
      <nav className=" space-y-2 font-inter">
        {options.map(({ icon, option }) => (
          <button
            key={option}
            onClick={() => handleNav(option)}
            className={`${
              navigation === option
                ? "bg-orange-100 hover:bg-orange-100 dark:bg-orange-500 dark:hover:bg-orange-500"
                : ""
            } flex items-center w-full gap-3 px-3 py-2 rounded-lg text-xl font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition`}
          >
            <span className="text-lg">{icon}</span>
            <span className="capitalize">{option}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default DesktopSidebar;
