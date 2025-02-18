import { User } from "../../utils/type";
import { addStudyCreated, addStudyUpdated } from "./redux/notificationSlice";
import store from "./redux/store"; // Import your Redux store
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

class SSEService {
  url: string;
  eventSource: EventSource | null;

  constructor(url: string) {
    this.url = url;
    this.eventSource = null;
  }

  connect(user: User) {
    console.log("EventSource => ", this.eventSource, user);
    if (!this.eventSource) {
      const EventSource = EventSourcePolyfill || NativeEventSource;
      this.eventSource = new EventSource(
        `${this.url}/notifications?email=${user.email}`,
        {
          withCredentials: true,
        }
      );

      this.eventSource.onopen = () => {
        console.log("eventSource is opened");
      };

      this.eventSource.addEventListener("StudyCreated", (event) => {
        console.log("StudyCreated Notification => ", event);
        store.dispatch(addStudyCreated(event.data));
      });

      this.eventSource.addEventListener("StudyUpdated", (event) => {
        console.log("StudyUpdated Notification => ", event);
        store.dispatch(addStudyUpdated(event.data));
      });

      this.eventSource.onerror = () => {
        console.error("SSE connection error, reconnecting...");
        this.disconnect();
        setTimeout(() => this.connect(user), 5000); // Reconnect after 3s
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

export const sseService = new SSEService(`${API_GATEWAY_URL}/noti`);
