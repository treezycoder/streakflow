import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Categories } from "@/types/states";
import { ProgressStats } from "@/redux/slices/app";
import HabitChart from "../habit-chart";

interface HabitChartSliderProps {
  categories: Categories[];
  progressStats: ProgressStats;
}

// Arrow button component
interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  size?: number;
  className?: string;
}
const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  onClick,
  size = 20,
  className = "",
}) => {
  const Icon = direction === "left" ? FaChevronLeft : FaChevronRight;
  return (
    <button
      onClick={onClick}
      className={`${className} bg-white p-2 rounded-full shadow-lg`}
    >
      <Icon size={size} />
    </button>
  );
};

// Dots navigation
interface DotsNavProps {
  count: number;
  current: number;
  onSelect: (index: number) => void;
  className?: string;
}
const DotsNav: React.FC<DotsNavProps> = ({
  count,
  current,
  onSelect,
  className = "flex gap-2",
}) => (
  <div className={className}>
    {Array.from({ length: count }).map((_, idx) => (
      <button
        key={idx}
        onClick={() => onSelect(idx)}
        className={`w-3 h-3 cursor-pointer rounded-full ${
          idx === current ? "bg-blue-600" : "bg-gray-300"
        }`}
      />
    ))}
  </div>
);

// Slides container
interface SlidesContainerProps {
  current: number;
  children: React.ReactNode;
}
const SlidesContainer: React.FC<SlidesContainerProps> = ({
  current,
  children,
}) => (
  <motion.div
    className="flex w-full"
    animate={{ x: `-${current * 100}%` }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    {children}
  </motion.div>
);

// Individual slide wrapper
interface SlideProps {
  title: string;
  children: React.ReactNode;
}
const Slide: React.FC<SlideProps> = ({ title, children }) => (
  <div className="w-full flex-shrink-0 p-4">
    <h3 className="text-lg font-semibold mb-2 !dark:text-white capitalize">
      {title}
    </h3>
    {children}
  </div>
);

// Main slider component
const HabitChartSlider: React.FC<HabitChartSliderProps> = ({
  categories,
  progressStats,
}) => {
  const [current, setCurrent] = useState(0);
  const length = categories.length;

  const next = () => setCurrent((prev) => (prev + 1) % length);
  const prev = () => setCurrent((prev) => (prev - 1 + length) % length);

  return (
    <div className="relative w-full overflow-hidden">
      <SlidesContainer current={current}>
        {categories.map((category) => {
          const categoryProgress = progressStats[category];
          // Check if there is any data for the category
          const hasData =
            categoryProgress &&
            Object.values(categoryProgress).some(
              (entries) => entries && entries.length > 0
            );
          return (
            <Slide key={category} title={category}>
              {hasData ? (
                <HabitChart category={category} progress={categoryProgress} />
              ) : (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  No data for this category.
                </p>
              )}
            </Slide>
          );
        })}
      </SlidesContainer>

      {/* Desktop Arrows */}
      <ArrowButton
        direction="left"
        onClick={prev}
        className="hidden md:flex absolute left-2 top-1/2 transform -translate-y-1/2"
      />
      <ArrowButton
        direction="right"
        onClick={next}
        className="hidden md:flex absolute right-2 top-1/2 transform -translate-y-1/2"
      />

      {/* Mobile Controls */}
      <div className="flex md:hidden flex-col items-center mt-4 gap-2">
        <div className="flex gap-4">
          <ArrowButton direction="left" size={16} onClick={prev} />
          <ArrowButton direction="right" size={16} onClick={next} />
        </div>
        <DotsNav count={length} current={current} onSelect={setCurrent} />
      </div>

      {/* Desktop Dots */}
      <div className="hidden md:flex justify-center mt-4">
        <DotsNav count={length} current={current} onSelect={setCurrent} />
      </div>
    </div>
  );
};

export default HabitChartSlider;
