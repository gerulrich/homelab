import { addNotification } from '@app/store/slices/NotificationSlice';

export const handleNotification = (notification, dispatch) => {
    if (!notification.type) {
        console.log(`Invalid notification: ${JSON.stringify(notification)}`);
        return;
    }
    switch (notification.type) {
        case 'system':
            dispatch(addNotification(notification));
            break;
        
        case "message":
            dispatch(addNotification(notification));
            break;
        default:
            console.log(`Notification not handled: ${JSON.stringify(notification)}`);
            break;
    }
};