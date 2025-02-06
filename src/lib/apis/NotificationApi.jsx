const markNotificationChecked = async (id) => {
  const raw_data = await fetch( `${SERVER_API_URL}/mark-notification-checked?notificationId=${id}`,
    {
      credentials: "include",
      method: "POST",
    }
  );
  const raw_data_json = await raw_data.json();
  return raw_data_json;
};

const getNotificationUnRead = async (jwt) => {
  const raw_data = await fetch(
    `${API_GATEWAY_URL}/app/notifications`,
    {
      credentials: "include",
      method: "GET",
      headers: {
      // Include the JWT as a Bearer token in the Authorization header
      'Authorization': `Bearer ${jwt}`
    }
    }
  );
  const raw_data_json = await raw_data.json();
  return raw_data_json;
};

const NotificationApi = {
  markNotificationChecked,
  getNotificationUnRead,
};

export default NotificationApi;