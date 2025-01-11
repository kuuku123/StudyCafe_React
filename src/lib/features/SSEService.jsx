import { addStudyCreated, addStudyUpdated } from "./redux/notificationSlice";
import store from "./redux/store"; // Import your Redux store
import { v4 as uuidv4 } from "uuid";

class SSEService {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
  }

  connect() {
    console.log("EventSource => ", this.eventSource);
    if (!this.eventSource) {
      this.eventSource = new EventSource(this.url, { withCredentials: true });

      this.eventSource.onopen = () => {
        console.log("eventSource is opened");
      };

      this.eventSource.addEventListener("StudyCreated", (event) => {
        console.log("StudyCreated Notification => ", event);
        store.dispatch(
          addStudyCreated({
            id: uuidv4(),
            path: event.data,
          })
        );
      });

      this.eventSource.addEventListener("StudyUpdated", (event) => {
        console.log("StudyUpdated Notification => ", event);
        store.dispatch(
          addStudyUpdated({
            id: uuidv4(),
            path: event.data,
          })
        );
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
