import ProgressBar from "@/components/progress-bar";
import { getPercentageChange } from "@/lib/utils/getPercentageChange";
import { getUnitByCategory } from "@/lib/utils/getUnitByCategory";
import { Progress } from "@/redux/slices/app";
import { Categories, Habits } from "@/types/states";
import {
  FaBrain,
  FaAppleAlt,
  FaTint,
  FaBed,
  FaRunning,
  FaSoap,
} from "react-icons/fa";
import { motion } from "framer-motion";
import clsx from "clsx";
import { getStreakCount } from "@/lib/utils/getStreakCount";
import { ReactNode } from "react";
import { getTotalWeeklyProgress } from "@/lib/utils/getTotalWeeklyProgress";

interface HabitItemProps {
  habit: Habits;
  weeklyProgress: Progress;
}

const icons: Record<Categories, ReactNode> = {
  mind: <FaBrain className="text-indigo-500 dark:text-indigo-300" />,
  nutrition: <FaAppleAlt className="text-green-500 dark:text-green-300" />,
  hydration: <FaTint className="text-blue-400 dark:text-blue-200" />,
  recovery: <FaBed className="text-purple-500 dark:text-purple-300" />,
  activity: <FaRunning className="text-red-500 dark:text-red-300" />,
  hygiene: <FaSoap className="text-yellow-500 dark:text-yellow-300" />,
};

const HabitCard: React.FC<HabitItemProps> = ({ habit, weeklyProgress }) => {
  const { name, category, goal, current } = habit;
  const completed = current >= goal;
  const progressPercentage = getPercentageChange(current, goal);
  const unit = getUnitByCategory(category);
  const streaks = getStreakCount(name, weeklyProgress);

  // calculate total from weeklyProgress
  const totalWeekly = getTotalWeeklyProgress(name, weeklyProgress);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white min-w-fit dark:bg-zinc-900 border dark:border-zinc-700 border-zinc-200 shadow-sm rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-colors"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
            {icons[category]}
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold min-w-fit text-gray-800 dark:text-white">
              {name}
            </p>
            <span className="text-xs text-gray-500 min-w-fit dark:text-gray-400 capitalize">
              {category}
            </span>
          </div>
        </div>

        {streaks > 0 && (
          <div className="text-xs font-medium min-w-fit text-orange-500 dark:text-orange-300">
            🔥 {streaks} day streak
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500 min-w-fit text-nowrap dark:text-gray-300">
        Today&apos;s Progress:{" "}
        <span
          className={clsx("font-medium min-w-fit text-nowrap", {
            "text-green-600 dark:text-green-400": completed,
            "text-red-500 dark:text-red-400": !completed,
          })}
        >
          {current}/{goal} {unit}
        </span>
      </div>

      <ProgressBar percentage={progressPercentage} />

      <div className="text-xs text-gray-500 dark:text-gray-400">
        Weekly Total:{" "}
        <span className="text-gray-700 dark:text-white font-semibold">
          {totalWeekly} {unit}
        </span>
      </div>
    </motion.div>
  );
};

export default HabitCard;
