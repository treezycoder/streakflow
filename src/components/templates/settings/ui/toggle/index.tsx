"use client";
import { motion } from "framer-motion";

const ToggleSwitch = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
      <div
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full  cursor-pointer flex items-center px-1 ${
          checked ? "bg-orange-500" : "bg-gray-400 dark:bg-zinc-600"
        }`}
      >
        <motion.div
          className="w-4 h-4 bg-white rounded-full shadow-md"
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          style={{ x: checked ? 24 : 0 }}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
