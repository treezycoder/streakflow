import { useAppDispatch, useAppSelector } from "@/redux/hooks/useOutSideClick";
import { addHabit } from "@/redux/slices/app";
import AddHabitForm from "./form";
import { Habits } from "@/types/states";
import { showError } from "@/lib/utils/toast";

const AddHabitTemplate = () => {
  const { habits } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const handleAddHabit = (habit: Habits) => {
    if (habits.some((habitItem) => habitItem.name === habit.name)) {
      showError("Habit with name already exist");
      return;
    }
    dispatch(addHabit(habit));
  };

  return (
    <section className="w-full mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white font-poppins tracking-tight">
        Add a new habit
      </h2>

      <AddHabitForm onSubmit={handleAddHabit} />
    </section>
  );
};

export default AddHabitTemplate;
