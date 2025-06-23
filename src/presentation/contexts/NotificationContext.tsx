import { NotificationDTO } from "@/infrastructure/dtos/NotificationDTO";
import React, { createContext, ReactNode, useContext, useState } from "react";

const NotificationContext = createContext<{
  notifications: NotificationDTO[];
  addNotification: (n: NotificationDTO) => void;
}>({
  notifications: [],
  addNotification: () => {},
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);

  const addNotification = (n: NotificationDTO) => {
    setNotifications((prev) => [n, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
