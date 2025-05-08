"use client";

import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useOutSideClick";
import LogCard from "./ui/log-card";
import NoHabits from "@/components/no-habits";
import { getDefaultLogs } from "@/lib/utils/getDefaultLogs";
import { getDefaultHabitKeys } from "@/lib/utils/getDefaultHabitKeys";
import { showSuccess } from "@/lib/utils/toast";
import { updateHabitCurrent } from "@/redux/slices/app";

const LogTemplate = () => {
  const { habits } = useAppSelector((state) => state.app);
  const [logs, setLogs] = useState<Record<string, number>>(
    getDefaultLogs(habits)
  );
  const dispatch = useAppDispatch();
  const keys = useMemo(() => {
    return getDefaultHabitKeys(habits);
  }, [habits]);

  const handleLogChange = (id: string, value: number) => {
    setLogs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (name: string) => {
    const currentValue = logs[name] || 0;
    showSuccess("Logged Successfully");
    dispatch(updateHabitCurrent({ name: name, newCurrent: currentValue }));
  };

  return (
    <section id="log" className="w-full mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white font-poppins tracking-tight">
        Log Your Daily Progress
      </h2>

      <div className="space-y-6">
        {habits.length === 0 ? (
          <NoHabits />
        ) : (
          habits.map((habit) => (
            <LogCard
              key={keys[habit.name]}
              habit={habit}
              value={logs[habit.name]}
              onChange={(val) => handleLogChange(habit.name, val)}
              onSubmit={() => handleSubmit(habit.name)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default LogTemplate;
