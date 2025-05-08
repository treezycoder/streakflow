"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/useOutSideClick";
import { setOpenSidebar } from "@/redux/slices/app";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const MenuToggle: React.FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  const openSidebar = useAppSelector((state) => state.app.openSidebar);

  const toggleSidebar = () => dispatch(setOpenSidebar(!openSidebar));

  return (
    <motion.button
      onClick={toggleSidebar}
      aria-label="Toggle menu"
      className={`z-50 p-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden ${className}`}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={{ rotate: openSidebar ? 90 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {openSidebar ? (
          <motion.div
            key="close"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <HiX className="w-6 h-6" />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <HiOutlineMenu className="w-6 h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MenuToggle;
