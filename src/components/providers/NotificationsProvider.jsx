import React, { useState } from 'react';
import { NotificationsContext } from '../../context/notifications.context';

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { ...notification, id, isNew: true }]);
    };

    const markAsRead = (id) => {
        setNotifications(prev => 
            prev.map(notif => 
                notif.id === id ? { ...notif, isNew: false } : notif
            )
        );
    };

    return (
        <NotificationsContext.Provider value={{ notifications, addNotification, markAsRead }}>
            {children}
        </NotificationsContext.Provider>
    );
};
