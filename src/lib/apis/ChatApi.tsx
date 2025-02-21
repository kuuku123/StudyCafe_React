const getAllChats = async (path: string) => {
  const raw_response = await fetch(
    `${API_GATEWAY_URL}/app/get-all-chats/${path}`,
    {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response = await raw_response.json();
  return response;
};

const ChatApi = {
  getAllChats
};

export default ChatApi;