"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/useOutSideClick";
import {
  clearAllNotifications,
  deleteNotification,
  markAllNotificationsRead,
  markNotificationRead,
  setNavigation,
} from "@/redux/slices/app";
import { Navigation } from "@/types/states";
import { motion, AnimatePresence } from "framer-motion";
import { RefObject } from "react";
import { BsDot } from "react-icons/bs";
import { FiCheckCircle, FiTrash2 } from "react-icons/fi";

interface NotificationPreviewProps {
  title?: string;
  preview?: boolean;
  className?: boolean;
  innerRef?: RefObject<HTMLDivElement | null>;
  onNavigate?: () => void;
}

const NotificationPreview: React.FC<NotificationPreviewProps> = ({
  preview = false,
  className = "",
  innerRef,
  onNavigate,
  title = "Recent Notifications",
}) => {
  const { notifications } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const notificationsUpdate = !preview
    ? notifications.slice(0, 3)
    : notifications;

  const handleClick = (navigation: Navigation, id: string) => {
    if (onNavigate) onNavigate();
    dispatch(markNotificationRead(id));
    dispatch(setNavigation(navigation));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteNotification(id));
  };

  const handleMarkAll = () => {
    dispatch(markAllNotificationsRead());
  };

  const handleDeleteAll = () => {
    dispatch(clearAllNotifications());
  };

  return (
    <div
      ref={innerRef}
      className={`${
        preview ? "absolute z-50" : ""
      } font-inter  -right-4 mt-2 flex flex-col gap-2 max-w-[450px] w-full border-zinc-200 border dark:border-zinc-700 min-w-fit p-4 lg-p6 max-h-96 overflow-x-hidden overflow-y-auto shadow-md bg-white dark:bg-gray-900 rounded-lg  ${className}`}
    >
      {/* Title */}
      <div className="flex items-center gap-8 justify-between pb-2 border-b border-gray-200 dark:border-zinc-700">
        <h3 className="text-base truncate font-poppins font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {preview && notifications.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleDeleteAll}
              className="text-xs truncate flex items-center gap-1 text-red-500 hover:underline"
            >
              <FiTrash2 className="text-sm" />
              Clear All
            </button>
            <button
              onClick={handleMarkAll}
              className="text-xs truncate flex items-center gap-1 text-green-600 hover:underline"
            >
              <FiCheckCircle className="text-sm" />
              Mark All
            </button>
          </div>
        )}
      </div>

      {/* List */}
      <AnimatePresence>
        {notifications.length > 0 ? (
          notificationsUpdate.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleClick(note.navigation, note.id)}
              className={`cursor-pointer group flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition`}
            >
              <span className="">
                {
                  <BsDot
                    className={`${
                      !note.read ? "text-orange-500" : "text-transparent"
                    }  text-3xl shrink-0`}
                  />
                }
              </span>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {note.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-2">
                  {note.message}
                </p>
                <span className="text-[10px] mt-1 text-orange-600 font-bold uppercase tracking-wider">
                  {note.habit}
                </span>
              </div>
              <div className=" flex flex-grow justify-end items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(note.id);
                  }}
                  className="text-red-500 group-hover:inline hidden hover:text-red-600"
                >
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center truncate sm:w-[350px] text-sm text-gray-500 dark:text-zinc-400 mt-4">
            No notifications yet.
          </p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPreview;
