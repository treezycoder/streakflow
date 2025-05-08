import { useAppDispatch } from "@/redux/hooks/useOutSideClick";
import DashboardHeader from "./ui/header";
import WeeklyCharts from "./ui/weekly-charts";
import NotificationPreview from "./ui/notifications";
import Button from "@/components/button";
import { setNavigation } from "@/redux/slices/app";
import HabitSummaryStats from "./ui/habit-stats";

const DashboardTemplate: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full">
      {/* Header */}
      <DashboardHeader />
      {/* Habit Cards */}
      <HabitSummaryStats />
      {/* Habit Chat */}
      <div className="w-full mb-6 flex flex-col xl:flex-row gap-4 md:items-center">
        <WeeklyCharts />
        {/* Notifications Preview */}
        <NotificationPreview />
      </div>

      {/* Bottom Action */}
      <div className="flex w-full items-center justify-center">
        <Button
          text="More Stats"
          onClick={() => dispatch(setNavigation("stats"))}
          variants="secondary"
          className="font-inter"
        />
      </div>
    </div>
  );
};

export default DashboardTemplate;
