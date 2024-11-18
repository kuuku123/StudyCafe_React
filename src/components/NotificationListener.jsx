import { useEffect } from 'react';

const NotificationListener = ({ userId }) => {
    useEffect(() => {
        const eventSource = new EventSource(`${SERVER_API_URL}/sse/subscribe/${userId}`);

        eventSource.addEventListener('notification', (event) => {
            console.log('New Notification:', event.data);
            alert(`Notification: ${event.data}`);
        });

        eventSource.onerror = (error) => {
            console.error('SSE Error:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [userId]);

    return null; // This component doesn't render anything
};

export default NotificationListener;