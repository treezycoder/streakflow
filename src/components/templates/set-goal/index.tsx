"use client";

import { useMemo, useState } from "react";
import { useAppSelector } from "@/redux/hooks/useOutSideClick";
import { updateHabitGoal } from "@/redux/slices/app";
import NoHabits from "@/components/no-habits";
import GoalCard from "./goal-card";
import { getDefaultLogs } from "@/lib/utils/getDefaultLogs";
import { getDefaultHabitKeys } from "@/lib/utils/getDefaultHabitKeys";
import { useDispatch } from "react-redux";
import { showSuccess } from "@/lib/utils/toast";

const SetGoalTemplate = () => {
  const { habits } = useAppSelector((state) => state.app);
  const dispatch = useDispatch();
  const [logs, setLogs] = useState<Record<string, number>>(
    getDefaultLogs(habits)
  );

  const keys = useMemo(() => {
    return getDefaultHabitKeys(habits);
  }, [habits]);

  const handleLogChange = (id: string, value: number) => {
    setLogs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (habitName: string) => {
    const currentValue = logs[habitName] || 0;
    showSuccess("Goal Updated Successfully");
    dispatch(
      updateHabitGoal({ name: habitName, newGoal: Number(currentValue) })
    );
    // Dispatch redux action here
  };

  return (
    <section className="w-full mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white font-poppins tracking-tight">
        Set Your Daily Goals
      </h2>

      <div className="space-y-6">
        {habits.length === 0 ? (
          <NoHabits />
        ) : (
          habits.map((habit) => (
            <GoalCard
              key={keys[habit.name]}
              habit={habit}
              value={logs?.[habit.name] ?? 0}
              onChange={(val) => handleLogChange(habit.name, val)}
              onSubmit={() => handleSubmit(habit.name)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default SetGoalTemplate;
