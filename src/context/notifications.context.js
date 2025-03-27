import { createContext } from 'react';

export const NotificationsContext = createContext({
    notifications: [],
    addNotification: () => {},
    markAsRead: () => {}
});
