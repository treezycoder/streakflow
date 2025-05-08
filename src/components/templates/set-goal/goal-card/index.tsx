import { Habits } from "@/types/states";
import Button from "@/components/button";
import HabitProgressInput from "../../log/ui/progress-input";
import { getUnitByCategory } from "@/lib/utils/getUnitByCategory";

type Props = {
  habit: Habits;
  value: number;
  onChange: (value: number) => void;
  onSubmit: () => void;
};

const GoalCard = ({ habit, value, onChange, onSubmit }: Props) => {
  const unit = getUnitByCategory(habit.category);
  const message = `How many ${unit} to go?`;

  return (
    <div className="p-5 rounded-xl border bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 space-y-3 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            {habit.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <HabitProgressInput label="Goal" value={value} onChange={onChange} />
        <div className="mt-4 sm:mt-7 sm:col-span-2">
          <Button variants="primary" onClick={onSubmit} className="w-fit">
            Update Goal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
