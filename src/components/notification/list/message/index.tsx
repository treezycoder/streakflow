import { Notifications } from "@/redux/slices/app";
import { Navigation } from "@/types/states";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

interface NotificationMessageProps {
  className?: string;
  data: Notifications;
  onClick: (navigation: Navigation) => void;
  onDelete: (id: string) => void;
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({
  data,
  onClick,
  onDelete,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className={`bg-white dark:bg-gray-800 border-b border-gray-300 p-4 flex justify-between items-start cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition ${className}`}
      onClick={() => onClick(data.navigation)}
    >
      <div>
        <p
          className={`${
            data.read ? "font-semibold" : "font-bold text-blue-500"
          } font-inter`}
        >
          {data.title}
        </p>
        <p className="text-sm text-gray-600 font-poppins dark:text-gray-300">
          {data.message}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(data.id);
        }}
        className="text-red-500 hover:text-red-600"
      >
        <FiTrash2 />
      </button>
    </motion.div>
  );
};

export default NotificationMessage;
