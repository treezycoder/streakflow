// components/shared/no-habits.tsx
import { useDispatch } from "react-redux";
import Button from "../button";
import { setOpenAdder } from "@/redux/slices/app";

const NoHabits: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <p className="text-gray-500 dark:text-gray-400">
        No habits available to log.
      </p>
      <Button onClick={() => dispatch(setOpenAdder(true))} variants="primary">
        Add new habit
      </Button>
    </div>
  );
};

export default NoHabits;
