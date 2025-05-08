import Button from "@/components/button";
import { getGreeting } from "@/lib/utils/getGreetings";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useOutSideClick";
import { setOpenAdder, setSettings } from "@/redux/slices/app";
import { FaPlus, FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface DashboardHeaderProps {
  className?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  className = "",
}) => {
  const { settings, habits } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const greeting = `Good ${getGreeting()}, ${settings.name || "there"} 👋`;
  const totalHabits = habits.length;
  const completedHabits = useMemo(() => {
    return habits.filter((habit) => habit.current >= habit.goal).length;
  }, [habits]);

  const handleToggleTheme = () => {
    dispatch(setSettings({ ...settings, darkMode: !settings.darkMode }));
  };

  return (
    <section id="header" className={`w-full mb-6  ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <motion.h1
            key={greeting}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white font-poppins"
          >
            {greeting}
          </motion.h1>
          <motion.p
            key={completedHabits}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-500 dark:text-gray-300"
          >
            You&apos;ve completed{" "}
            <span className="font-semibold text-primary">
              {completedHabits}
            </span>{" "}
            of <span className="font-semibold text-primary">{totalHabits}</span>{" "}
            habits today
          </motion.p>
        </div>

        <div className="flex gap-3 items-center">
          <Button
            className="font-poppins"
            textClassName=""
            icon={<FaPlus />}
            variants="primary"
            text="New Habit"
            title="Add new habit"
            onClick={() => dispatch(setOpenAdder(true))}
          />
          <Button
            title="Toggle theme"
            className="font-poppins h-10"
            icon={settings.darkMode ? <FaSun /> : <FaMoon />}
            variants="ghost"
            onClick={handleToggleTheme}
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;
