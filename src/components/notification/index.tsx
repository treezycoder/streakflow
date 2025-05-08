"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import NotificationBell from "./bell";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { Notifications } from "@/redux/slices/app";
import NotificationPreview from "../templates/dashboard/ui/notifications";

export const fakeNotifications: Notifications[] = [
  {
    id: "1",
    read: false,
    habit: "Sleep",
    title: "Time to sleep",
    message: "Try getting at least 7 hours tonight.",
    navigation: "stats",
  },
  {
    id: "2",
    read: true,
    habit: "Water",
    title: "Hydration reminder",
    message: "You haven't logged water today.",
    navigation: "dashboard",
  },
];

interface NotificationProps {
  notifications: Notifications[];
}

const Notification: React.FC<NotificationProps> = ({ notifications }) => {
  const [showList, setShowList] = useState(false);
  // const [notifications, setNotifications] =
  //   useState<Notifications[]>(fakeNotifications);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const unreadCount = notifications?.filter((n) => !n.read).length || 0;

  useOutsideClick({
    mainRef: dropdownRef,
    exceptionRef: buttonRef,
    handler: () => setShowList(false),
  });

  const handleNavigate = () => {
    setShowList(false);
  };

  return (
    <motion.div className="max-w-fit w-fit min-w-fit">
      <NotificationBell
        ref={buttonRef}
        onClick={() => setShowList((prev) => !prev)}
        unread={unreadCount > 0}
        unreadCount={unreadCount}
      />

      <AnimatePresence>
        {showList && (
          <NotificationPreview
            onNavigate={handleNavigate}
            innerRef={dropdownRef}
            preview
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Notification;
