import { motion } from "framer-motion";
import { forwardRef } from "react";
import { FiBell, FiBellOff } from "react-icons/fi";

interface NotificationBellProps {
  className?: string;
  unread: boolean;
  unreadCount: number;
  onClick: () => void;
}

const NotificationBell = forwardRef<HTMLButtonElement, NotificationBellProps>(
  ({ unread, unreadCount, onClick, className = "" }, ref) => {
    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        className={`relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${className}`}
        whileTap={{ scale: 0.9 }}
      >
        {unread ? (
          <FiBell className="text-2xl text-yellow-500" />
        ) : (
          <FiBellOff className="text-2xl text-gray-400" />
        )}

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </motion.button>
    );
  }
);

NotificationBell.displayName = "NotificationBell";

export default NotificationBell;
