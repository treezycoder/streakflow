"use client";

import { setOpenSetter } from "@/redux/slices/app";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useOutSideClick";
import Button from "../button";
import Notification from "../notification";
import MenuToggle from "./menu-toggle";
import CurrentNavigation from "./current-navigation";

export default function Navbar() {
  const { settings, notifications } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  return (
    <nav className="w-full lg:w-[calc(100%-240px)] flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-900  dark:border-b-gray-700 z-10 fixed top-0 left-0 lg:left-[calc(240px)] right-0">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <MenuToggle className="" />
        <CurrentNavigation />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Add Goal Button */}
        <Button
          className="font-poppins"
          textClassName="hidden sm:inline"
          icon={<FaPlus />}
          variants="ghost"
          text="Set Daily Goal"
          onClick={() => dispatch(setOpenSetter(true))}
        />

        {/* Notifications */}
        <div className="relative">
          <Notification notifications={notifications} />
        </div>

        {/* Profile Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-16 h-16 rounded-full overflow-hidden shadow-md"
        >
          <Image
            src={settings.image || "/default-avatar.jpg"}
            alt="Profile"
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>
    </nav>
  );
}
