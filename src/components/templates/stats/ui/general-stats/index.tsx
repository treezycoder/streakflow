"use client";

import { useAppSelector } from "@/redux/hooks/useOutSideClick";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaClock,
  FaThumbsUp,
  FaList,
  FaSadTear,
  FaCalendarCheck,
  FaCalendarTimes,
  FaBrain,
} from "react-icons/fa";
import StatCard from "./stats-card";
import { useMemo } from "react";
import { getGeneralStats } from "@/lib/utils/getGeneralStats";

const GeneralStats: React.FC = () => {
  const { progress, habits } = useAppSelector((state) => state.app);
  const stats = useMemo(() => {
    return getGeneralStats(progress, habits);
  }, [progress, habits]);

  const statList = [
    {
      label: "Most Performed Habit",
      value: stats.mostPerformedHabit,
      icon: <FaThumbsUp className="text-green-500" />,
    },
    {
      label: "Total Hours",
      value: `${stats.totalHours} hrs`,
      icon: <FaClock className="text-blue-500" />,
    },
    {
      label: "Total Habits",
      value: stats.totalHabits,
      icon: <FaList className="text-purple-500" />,
    },
    {
      label: "Completed Days",
      value: stats.totalCompletedDays,
      icon: <FaCalendarCheck className="text-emerald-500" />,
    },
    {
      label: "Missed Days",
      value: stats.totalMissedDays,
      icon: <FaCalendarTimes className="text-red-500" />,
    },
    {
      label: "Most Used Category",
      value: stats.mostUsedCategory,
      icon: <FaBrain className="text-yellow-500" />,
    },
    {
      label: "Lowest Performing Habit",
      value: stats.leastPerformedHabit,
      icon: <FaSadTear className="text-gray-400" />,
    },
    {
      label: "Most Active Day",
      value: stats.mostActiveDay,
      icon: <FaChartLine className="text-orange-500" />,
    },

    {
      label: "Most Active Period",
      value: stats.mostActivePeriod,
      icon: <FaChartLine className="text-blue-500" />,
    },
  ];

  return (
    <section className="w-full space-y-6 mb-6" id="general-stats">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white font-poppins tracking-tight">
        General Weekly Stats
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statList.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatCard label={stat.label} value={stat.value} icon={stat.icon} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GeneralStats;
