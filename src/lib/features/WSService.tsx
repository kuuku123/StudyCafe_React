import { User } from "../../utils/type";

export interface ChatMessage {
  id: number;
  sender: string;
  text: string;
}

class WSService {
  url: string;
  socket: WebSocket | null;
  onMessageCallback?: (message: ChatMessage) => void;
  user?: User;

  constructor(url: string) {
    this.url = url;
    this.socket = null;
  }

  connect(
    studyPath: string,
    onMessageCallback: (message: ChatMessage) => void,
    user: User
  ) {
    this.onMessageCallback = onMessageCallback;
    this.user = user;
    console.log("WebSocket => ", this.socket, studyPath);
    if (!this.socket) {
      // Construct the WebSocket URL.
      const wsUrl = `${this.url}/chat/${studyPath}`;
      console.log("wsURl => ", wsUrl);
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log("WebSocket connection is opened!");
      };

      this.socket.onmessage = (event: MessageEvent) => {
        try {
          console.log("event.data => ", event.data);
          const message = JSON.parse(event.data) as ChatMessage;
          if (user.email !== message.sender) onMessageCallback(message);
          console.log("message => ", message);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket connection error, reconnecting...", error);
        this.disconnect();
        setTimeout(
          () => this.connect(studyPath, onMessageCallback, user),
          5000
        );
      };
    }
  }

  sendMessage(message: ChatMessage) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const serializedMessage = JSON.stringify(message);
      this.socket.send(serializedMessage);
      console.log("Sent message:", message);
    } else {
      console.warn("WebSocket is not open. Message not sent.");
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const wsService = new WSService(`${API_GATEWAY_URL}/chat`);
