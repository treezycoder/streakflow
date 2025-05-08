import HabitTable from "../habit-table";

const HabitStats: React.FC = () => {
  return (
    <section id="habit-stats" className="w-full space-y-6 mb-6">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white font-poppins tracking-tight">
        Your Habits
      </h3>
      <HabitTable />
    </section>
  );
};

export default HabitStats;
