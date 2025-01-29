const markNotificationRead = async (id) => {
  const raw_data = await fetch(
    `${SERVER_API_URL}/mark-notification?notificationId=${id}`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const raw_data_json = await raw_data.json();
  return raw_data_json;
};


const NotificationApi = {
  markNotificationRead,
};

export default NotificationApi;