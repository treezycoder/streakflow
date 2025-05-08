/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { weekDays } from "@/lib/data/defaults";
import { getColorByCategory } from "@/lib/utils/getColorByCategory";
import { getUnitByCategory } from "@/lib/utils/getUnitByCategory";
import { Progress } from "@/redux/slices/app";
import { Categories } from "@/types/states";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface HabitChartProps {
  category: Categories;
  progress: Progress;
}

const HabitChart: React.FC<HabitChartProps> = ({ category, progress }) => {
  const unit = getUnitByCategory(category);
  const baseColor = getColorByCategory(category);

  // 1) Collect only the habits in this category
  const uniqueHabits = new Set<string>();
  Object.values(progress).forEach((dayHabits) => {
    dayHabits?.forEach((h) => {
      if (h.category === category) uniqueHabits.add(h.name);
    });
  });
  const habitNames = Array.from(uniqueHabits);

  // 2) Generate a distinct shade for each habit
  const habitColors = habitNames.reduce<Record<string, string>>(
    (acc, name, idx) => {
      const shade = Math.max(0, 100 - idx * 15).toString();
      acc[name] = `${baseColor}${shade}`;
      return acc;
    },
    {}
  );

  // 3) Build the data array: one object per weekday, with a key per habit
  const data = weekDays.map((day) => {
    const row: Record<string, any> = { day };
    const dayHabits = progress[day] || [];
    habitNames.forEach((hn) => {
      const found = dayHabits.find((h) => h.name === hn);
      row[hn] = found ? found.current : 0;
    });
    return row;
  });

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          className="w-full"
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            {habitNames.map((hn) => (
              <linearGradient
                key={hn}
                id={`grad-${hn}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={habitColors[hn]}
                  stopOpacity={0.4}
                />
                <stop
                  offset="75%"
                  stopColor={habitColors[hn]}
                  stopOpacity={0.05}
                />
              </linearGradient>
            ))}
          </defs>

          {habitNames.map((hn) => (
            <Area
              key={hn}
              type="monotone"
              dataKey={hn}
              stroke={habitColors[hn]}
              strokeWidth={1.5}
              fill={`url(#grad-${hn})`}
            />
          ))}

          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, dy: 15, fontWeight: 500, fill: "#616161" }}
            tickLine={false}
            axisLine={{ strokeWidth: 1, stroke: "#000", opacity: 0.2 }}
          />

          <YAxis
            tick={{ fontSize: 12, fontWeight: 500, fill: "#727E8A" }}
            tickFormatter={(v) => `${v}${unit}`}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip formatter={(val: any) => `${val} ${unit}`} />

          <CartesianGrid opacity={0.2} vertical={false} />

          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitChart;
