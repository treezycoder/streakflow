import GeneralStats from "./ui/general-stats";
import HabitStats from "./ui/habit-stats";
import WeeklyStats from "./ui/weekly-stats";

const StatsTemplate: React.FC = () => {
  return (
    <div>
      <GeneralStats />
      <HabitStats />
      <WeeklyStats />
    </div>
  );
};

export default StatsTemplate;
