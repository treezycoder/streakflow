"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HabitCard from "../habit-card";
import Button from "@/components/button";
import { useAppSelector } from "@/redux/hooks/useOutSideClick";

const HabitSummaryStats: React.FC = () => {
  const { habits, progress } = useAppSelector((state) => state.app);

  const [showAll, setShowAll] = useState(false);
  const maxToShow = 8;
  const enableShowAll = habits.length > maxToShow;
  const displayedHabits = showAll ? habits : habits.slice(0, maxToShow);

  const handleToggle = () => {
    if (!enableShowAll) return;
    setShowAll((prev) => !prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="habit-grid" className="w-full mb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-poppins sm:text-2xl font-semibold tracking-tight dark:text-white text-gray-800">
          Your Daily Habits
        </h2>
        <div className="flex gap-2">
          {enableShowAll && (
            <Button
              text={showAll ? "Show Less" : "Show All"}
              onClick={handleToggle}
              variants="ghost"
              className="font-poppins"
            />
          )}
          {/* <Button
            text="Add New"
            title="Add new button"
            icon={<FaPlus />}
            onClick={() => dispatch(setOpenAdder(true))}
            variants="primary"
            className="font-poppins"
          /> */}
        </div>
      </div>

      {/* Habit Grid */}
      {habits && habits.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          <AnimatePresence>
            {displayedHabits.map((habit) => (
              <motion.div
                className="max-w-2xl"
                key={habit.name}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <HabitCard
                  habit={habit}
                  weeklyProgress={progress[habit.category] || []}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          No habits to display.
        </p>
      )}
    </section>
  );
};

export default HabitSummaryStats;
