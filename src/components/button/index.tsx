import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  title?: string;
  icon?: ReactNode;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  children?: ReactNode;
  variants?: "ghost" | "primary" | "secondary";
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  className = "",
  iconClassName = "",
  textClassName = "",
  children,
  variants = "primary",
  iconPosition = "left",
  onClick,
  title = "",
  type,
}) => {
  const baseStyles =
    "inline-flex cursor-pointer justify-center items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors";

  const variantStyles = {
    primary: "bg-orange-600 text-white hover:bg-orange-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    ghost:
      "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100",
  };

  return (
    <motion.button
      type={type}
      title={title}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={clsx(baseStyles, variantStyles[variants], className)}
    >
      {icon && iconPosition === "left" && (
        <span className={`${iconClassName} flex items-center`}>{icon}</span>
      )}
      {text && <span className={textClassName}>{text}</span>}
      {children}
      {icon && iconPosition === "right" && (
        <span className={`${iconClassName} flex items-center`}>{icon}</span>
      )}
    </motion.button>
  );
};

export default Button;
