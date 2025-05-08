import { motion } from "framer-motion";
import React from "react";

type ProgressBarProps = {
  percentage: number;
  height?: string;
  backgroundColor?: string;
  showLabel?: boolean;
};

const getFillColor = (percent: number): string => {
  if (percent >= 100) return "#10b981"; // Green
  if (percent >= 80) return "#3b82f6"; // Blue
  if (percent >= 50) return "#f59e0b"; // Amber
  return "#ef4444"; // Red
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  height = "8px",
  backgroundColor = "#e5e7eb", // gray-200
  showLabel = true,
}) => {
  const cappedPercent = Math.min(percentage, 100);
  const fillColor = getFillColor(percentage);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1 text-sm font-medium text-gray-700">
          {percentage > 100 ? "100+" : `${Math.round(percentage)}%`}
        </div>
      )}
      <div
        className="rounded-full overflow-hidden"
        style={{ height, backgroundColor }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${cappedPercent}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ height: "100%", backgroundColor: fillColor }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
