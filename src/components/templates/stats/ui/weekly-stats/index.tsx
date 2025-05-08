import HabitChart from "@/components/templates/dashboard/ui/habit-chart";
import { categoryIcons, categoryList } from "@/lib/data/defaults";
import { useAppSelector } from "@/redux/hooks/useOutSideClick";

const WeeklyStats: React.FC = () => {
  const { progress } = useAppSelector((state) => state.app);

  return (
    <section id="week-stats" className="w-full space-y-6 mb-6">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white font-poppins tracking-tight">
        Weekly Habit Charts
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryList.map((category) => {
          const categoryProgress = progress[category];
          const hasData =
            categoryProgress &&
            Object.values(categoryProgress).some(
              (entries) => entries && entries.length > 0
            );

          return (
            <div
              key={category}
              className="p-4 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800"
            >
              <h4 className="text-lg font-inter capitalize font-semibold mb-3 text-center text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2">
                {categoryIcons[category]} {category}
              </h4>
              {hasData ? (
                <HabitChart category={category} progress={categoryProgress} />
              ) : (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  No data for this category.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WeeklyStats;
