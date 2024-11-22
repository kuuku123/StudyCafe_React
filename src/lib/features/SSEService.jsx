import { addMessage, addStudyCreate } from "./redux/notificationSlice";
import store from "./redux/store"; // Import your Redux store

class SSEService {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
  }

  connect() {
    if (!this.eventSource) {
      this.eventSource = new EventSource(this.url, { withCredentials: true });

      this.eventSource.onopen = () => {
        console.log("eventSource is opened");
      };

      this.eventSource.addEventListener("StudyCreate", (event) => {
        console.log("StudyCreated Notification => ", event)
        store.dispatch(addStudyCreate(event.data))
      });

      this.eventSource.onerror = () => {
        console.error("SSE connection error, reconnecting...");
        this.disconnect();
        setTimeout(() => this.connect(), 3000); // Reconnect after 3s
      };
    }
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

export const sseService = new SSEService(`${SERVER_API_URL}/sse/subscribe`);
