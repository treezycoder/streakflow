import { Notifications } from "@/redux/slices/app";
import { motion, AnimatePresence } from "framer-motion";
import NotificationMessage from "./message";
import { Navigation } from "@/types/states";
import { RefObject } from "react";
import { FiTrash2 } from "react-icons/fi";

interface NotificationListProps {
  className?: string;
  data: Notifications[];
  innerRef: RefObject<HTMLDivElement | null>;
  onNavigate: (nav: Navigation) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  data,
  innerRef,
  onNavigate,
  onDelete,
  onClearAll,
  className = "",
}) => {
  return (
    <motion.div
      ref={innerRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto shadow-lg bg-white dark:bg-gray-900 rounded-lg z-50 ${className}`}
    >
      <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50 dark:bg-gray-800">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Notifications
        </p>
        {data.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs flex items-center gap-1 text-red-500 hover:underline"
          >
            <FiTrash2 className="text-sm" />
            Clear All
          </button>
        )}
      </div>

      <AnimatePresence>
        {data.length > 0 ? (
          data.map((notification) => (
            <NotificationMessage
              key={notification.id}
              data={notification}
              onClick={onNavigate}
              onDelete={onDelete}
              className={
                notification.read ? "opacity-60" : "opacity-100 font-semibold"
              }
            />
          ))
        ) : (
          <p className="p-4 text-gray-500 text-sm">No notifications.</p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NotificationList;
