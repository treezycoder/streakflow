import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import Button from "@/components/button";
import { Habits } from "@/types/states";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useOutSideClick";
import { calculateTotalMissed } from "@/lib/utils/getTotalMissed";
import { getUnitByCategory } from "@/lib/utils/getUnitByCategory";
import { calculateTotalCompleted } from "@/lib/utils/getTotalCompleted";
import { formatDate } from "@/lib/utils/formatDate";
import { getTotalWeeklyProgress } from "@/lib/utils/getTotalWeeklyProgress";
import { getStreakCount } from "@/lib/utils/getStreakCount";
import { deleteHabit } from "@/redux/slices/app";
import { showSuccess } from "@/lib/utils/toast";

interface HabitTableRowProps {
  habit: Habits;
}

export const HabitTableRow: React.FC<HabitTableRowProps> = ({ habit }) => {
  const { progress } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const handleDelete = (name: string) => {
    showSuccess("Habit deleted successfully");
    dispatch(deleteHabit(name));
  };

  return (
    <tr className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
        {habit.name}
      </td>
      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 capitalize">
        {habit.category}
      </td>
      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 capitalize">
        {getTotalWeeklyProgress(habit.name, progress[habit.category])}
      </td>
      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 capitalize">
        {getUnitByCategory(habit.category)}
      </td>
      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
        {habit.goal}
      </td>
      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
        {habit.current}
      </td>
      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
        {getStreakCount(habit.name, progress[habit.category])}
      </td>
      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 capitalize">
        {calculateTotalCompleted(habit.name, progress[habit.category])}
      </td>
      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
        {calculateTotalMissed(habit.name, progress[habit.category])}
      </td>
      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
        {formatDate(habit?.dateAdded || "")}
      </td>
      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 flex gap-2">
        <Button
          icon={<FaTrashAlt className="dark:text-white" />}
          onClick={() => handleDelete(habit.name)}
          variants="ghost"
          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-600"
        />
      </td>
    </tr>
  );
};
