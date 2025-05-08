// components/sidebar/MobileSidebar.tsx
import { Navigation } from "@/types/states";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useOutSideClick";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { HiX } from "react-icons/hi";
import { setNavigation, setOpenSidebar } from "@/redux/slices/app";

export interface NavigationOptions {
  icon: ReactNode;
  option: Navigation;
}

interface Props {
  options: NavigationOptions[];
}

const MobileSidebar: React.FC<Props> = ({ options }) => {
  const dispatch = useAppDispatch();
  const { openSidebar, navigation } = useAppSelector((state) => state.app);

  const handleClose = () => dispatch(setOpenSidebar(false));

  const handleNav = (option: Navigation) => {
    dispatch(setNavigation(option));
    handleClose();
  };

  return (
    <>
      <AnimatePresence>
        {openSidebar && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed flex flex-col gap-4 top-0 left-0 z-40 h-full w-[240px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg p-4 lg:hidden"
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* cancel button */}
              <div className="flex justify-end">
                <button
                  onClick={handleClose}
                  className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
                >
                  <HiX size={24} />
                </button>
              </div>

              <motion.div
                onClick={() => dispatch(setNavigation("dashboard"))}
                className="w-full overflow-hidden flex  items-center cursor-pointer"
              >
                <span className="text-xl font-poppins sm:text-2xl md:text-3xl font-bold tracking-wide bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent capitalize">
                  Streak
                </span>
                {/* <span className="text-xl font-poppins sm:text-2xl md:text-3xl font-bold tracking-wide text-black capitalize">
          Streak
        </span> */}
                <span className="text-xl font-inter sm:text-2xl md:text-3xl font-bold tracking-wide text-gray-400 capitalize">
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
                        ? "bg-orange-100 hover:bg-orange-100  dark:bg-orange-500 dark:hover:bg-orange-500"
                        : ""
                    } flex items-center w-full gap-3 px-3 py-2 rounded-lg text-sm sm:text-base md:text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition`}
                  >
                    <span className="text-lg">{icon}</span>
                    <span className="capitalize">{option}</span>
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSidebar;
