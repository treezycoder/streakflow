import { Habits } from "@/types/states";
import HabitProgressInput from "../progress-input";
import Button from "@/components/button";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import {
  getUnitByCategory,
  getUnitMessage,
} from "@/lib/utils/getUnitByCategory";

type Props = {
  habit: Habits;
  value: number;
  onChange: (value: number) => void;
  onSubmit: () => void;
};

const LogCard = ({ habit, value, onChange, onSubmit }: Props) => {
  const isCompleted = habit.current >= habit.goal;
  const unit = getUnitByCategory(habit.category);
  const message = getUnitMessage(habit.category);

  return (
    <div className="p-5 rounded-xl border bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 space-y-3 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            {habit.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
        </div>
        {isCompleted ? (
          <FaCheckCircle className="text-green-500 w-6 h-6" />
        ) : (
          <FaRegCircle className="text-gray-400 w-6 h-6" />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <HabitProgressInput label="Current" value={value} onChange={onChange} />
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Target
          </label>
          <p className="text-base font-medium text-gray-700 dark:text-gray-200">
            {habit.goal} {unit}
          </p>
        </div>
        <div className="mt-4 flex lg:justify-end sm:mt-7">
          <Button
            variants="primary"
            onClick={onSubmit}
            className="w-full font-inter max-w-60"
            text={isCompleted ? "Update Log" : "Save Log"}
          />
        </div>
      </div>
    </div>
  );
};

export default LogCard;
