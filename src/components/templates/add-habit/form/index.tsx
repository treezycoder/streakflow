import Button from "@/components/button";
import { categoryList } from "@/lib/data/defaults";
import { getUnitByCategory } from "@/lib/utils/getUnitByCategory";
import { showSuccess } from "@/lib/utils/toast";
import { Habits } from "@/types/states";
import { useState } from "react";

const defaultHabit: Habits = {
  name: "",
  category: "mind", // default, adjust as needed
  goal: 1,
  current: 0,
  dayTime: "morning",
  notify: true,
  completed: false,
};

const AddHabitForm: React.FC<{ onSubmit: (habit: Habits) => void }> = ({
  onSubmit,
}) => {
  const [form, setForm] = useState<Habits>(defaultHabit);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    const newValue =
      type === "checkbox" ? (target as HTMLInputElement).checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form, dateAdded: new Date().toISOString() });
    showSuccess("Habit added successfully");
    setForm(defaultHabit); // reset form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-inter">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Habit Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
        >
          {categoryList.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Goal */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Daily Goal ({`${getUnitByCategory(form.category)}`})
        </label>
        <input
          name="goal"
          type="number"
          min={1}
          value={form.goal}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Day Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Preferred Time
        </label>
        <select
          name="dayTime"
          value={form.dayTime}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
        >
          {["morning", "afternoon", "evening"].map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <Button className="font-inter mt-4 md:mt-0" type="submit">
        Add Habit
      </Button>
    </form>
  );
};

export default AddHabitForm;
