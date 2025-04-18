const markNotificationChecked = async (id: number) => {
  const raw_data = await fetch(
    `${API_GATEWAY_URL}/app/mark-notification-checked?notificationId=${id}`,
    {
      credentials: "include",
      method: "POST",
    }
  );
  const raw_data_json = await raw_data.json();
  return raw_data_json;
};

const getNotificationUnRead = async () => {
  const raw_data = await fetch(`${API_GATEWAY_URL}/app/notifications`, {
    credentials: "include",
    method: "GET",
  });
  const raw_data_json = await raw_data.json();
  return raw_data_json;
};

const NotificationApi = {
  markNotificationChecked,
  getNotificationUnRead,
};

export default NotificationApi;
