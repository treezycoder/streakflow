import { motion } from "framer-motion";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  color = "text-blue-500",
}) => {
  return (
    <motion.div
      className="flex flex-col gap-2 bg-white min-w-fit dark:bg-zinc-900 border dark:border-zinc-700 border-zinc-200 shadow-sm rounded-2xl p-4 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`text-3xl ${color}`}>{icon}</div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
      <div className="text-lg font-semibold text-gray-900 dark:text-white">
        {value}
      </div>
    </motion.div>
  );
};

export default StatCard;
