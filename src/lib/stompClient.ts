import { Client } from "@stomp/stompjs";

export const stompClient = new Client({
  brokerURL: import.meta.env.VITE_WS_URL || "ws://localhost:8080/ws",
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
  onConnect: () => {
    console.log("%c🟢 STOMP connected", "color:green");
  },
  onStompError: (frame) => {
    console.error("STOMP error:", frame);
  },
});
