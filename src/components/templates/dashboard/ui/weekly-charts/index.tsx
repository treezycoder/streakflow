"use client";

import { useAppSelector } from "@/redux/hooks/useOutSideClick";
import HabitChartSlider from "../habit-chart-slider";
import { categoryList } from "@/lib/data/defaults";

const WeeklyCharts: React.FC = () => {
  const { progress } = useAppSelector((state) => state.app);

  return (
    <section id="weekly-charts" className="w-full flex-1 space-y-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight dark:text-white text-gray-800 font-poppins">
          Your Progress This Week
        </h2>
      </div>

      {/* Chart Slider */}
      <div className="w-full">
        <HabitChartSlider categories={categoryList} progressStats={progress} />
      </div>
    </section>
  );
};

export default WeeklyCharts;
