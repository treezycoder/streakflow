"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/useOutSideClick";
import Navbar from "../nav";
import { FiHome, FiSettings, FiBarChart2, FiActivity } from "react-icons/fi";
import { setOpenAdder, setOpenSetter } from "@/redux/slices/app";
import TemplateHolder from "./template-holder";
import { navigationTemplates } from "@/lib/data/templates";
import DesktopSidebar, { NavigationOptions } from "../nav/sidebar/desktop";
import MobileSidebar from "../nav/sidebar/mobile";
import Modal from "../modal";
import SetGoalTemplate from "../templates/set-goal";
import AddHabitTemplate from "../templates/add-habit";
import Footer from "../footer";
import { useDailyReset } from "@/lib/hooks/useDailyReset";
import { useNotificationReminder } from "@/lib/hooks/useNotificationReminder";
import { useLocalStorageSync } from "@/lib/hooks/useLocalStoray";

const Body: React.FC = () => {
  const { openSetter, openAdder, settings } = useAppSelector(
    (state) => state.app
  );
  const dispatch = useAppDispatch();
  useDailyReset();
  useNotificationReminder();
  useLocalStorageSync();

  const navigationOptions: NavigationOptions[] = [
    { icon: <FiHome className="lg:text-xl" />, option: "dashboard" },
    { icon: <FiBarChart2 className="lg:text-xl" />, option: "stats" },
    { icon: <FiActivity className="lg:text-xl" />, option: "log" },
    { icon: <FiSettings className="lg:text-xl" />, option: "settings" },
  ];

  return (
    <main className={`${settings.darkMode ? "dark" : ""} relative w-full`}>
      <Modal
        isOpen={openSetter}
        shouldCloseOnOverlayClick
        onClose={() => dispatch(setOpenSetter(false))}
        // children={<SetGoalTemplate />}
      >
        <SetGoalTemplate />
      </Modal>
      <Modal
        isOpen={openAdder}
        shouldCloseOnOverlayClick
        onClose={() => dispatch(setOpenAdder(false))}
      >
        <AddHabitTemplate />
      </Modal>
      <Navbar />
      <DesktopSidebar options={navigationOptions} className="" />
      <MobileSidebar options={navigationOptions} />
      {/* template wrapper div */}
      <div
        className={` min-h-screen bg-gray-100 dark:bg-zinc-900 lg:w-[calc(100%-240px)] lg:ml-[240px] relative p-4 pt-[calc(100px+16px)] overflow-hidden`}
      >
        <TemplateHolder templates={navigationTemplates} className="" />
        <Footer
          name="Tresor Ngahame"
          textColor="text-gray-700 dark:text-gray-200"
          hoverColor="hover:text-orange-500"
          iconSize={28}
          layout="auto"
          socialLinks={{
            whatsapp: "https://wa.me/+237677147924",
            linkedin: "https://www.linkedin.com/in/tresor-ngahame-0004a5287",
            github: "https://github.com/treezycoder",
            portfolio: "https://ngahame.vercel.app/",
          }}
        />
      </div>
    </main>
  );
};

export default Body;
