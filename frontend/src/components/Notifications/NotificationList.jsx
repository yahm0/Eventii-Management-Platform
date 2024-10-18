import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_NOTIFICATIONS } from '../../graphql/queries';
import { MARK_NOTIFICATION_AS_READ } from '../../graphql/mutations';

const NotificationList = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_NOTIFICATIONS, {
    variables: { userId },
  });

  const [markAsRead] = useMutation(MARK_NOTIFICATION_AS_READ);

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>Error loading notifications: {error.message}</p>;

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead({ variables: { id: notificationId } });
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return (
    <div className="notification-list">
      <h2>Notifications</h2>
      {data.notifications.map((notification) => (
        <div key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'}`}>
          <p>{notification.message}</p>
          {notification.event && (
            <p>Related Event: <a href={`/event/${notification.event.id}`}>{notification.event.title}</a></p>
          )}
          <p>Received: {new Date(notification.createdAt).toLocaleString()}</p>
          {!notification.read && (
            <button onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
