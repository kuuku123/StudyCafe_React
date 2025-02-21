import { User } from "../../utils/type";

export interface ChatMessageType {
  id: string;
  studyPath: string;
  email: string;
  text: string;
  createdAt: Date;
}

export class WSService {
  url: string;
  socket: WebSocket | null;
  onMessageCallback?: (message: ChatMessageType) => void;
  user?: User;

  constructor() {
    this.url = `${API_GATEWAY_WS_URL}/ws`;
    this.socket = null;
  }

  connect(
    studyPath: string,
    onMessageCallback: (message: ChatMessageType) => void,
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
          const message = JSON.parse(event.data) as ChatMessageType;
          if (user.email !== message.email) onMessageCallback(message);
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

  sendMessage(message: ChatMessageType) {
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
