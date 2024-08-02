import { addNotification } from '@app/store/slices/WebsocketSlice';

export const handleNotification = (notification, dispatch) => {
    if (!notification.type) {
        console.log(`Invalid notification: ${JSON.stringify(notification)}`);
        return;
    }
    switch (notification.type) {
        case "message":
            dispatch(addNotification(notification));
            break;
        default:
            console.log(`Notification not handled: ${JSON.stringify(notification)}`);
            break;
    }
};