import { InputHTMLAttributes } from "react";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">;

const HabitProgressInput = ({ label, value, onChange, ...props }: Props) => (
  <div>
    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type="number"
      min={0}
      className="w-full h-10 rounded-md px-3 py-2 text-sm border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      {...props}
    />
  </div>
);

export default HabitProgressInput;
