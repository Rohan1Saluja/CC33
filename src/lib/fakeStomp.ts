import type { UserRole } from "../features/auth/authSlice";

// lib/fakeStomp.ts
let interval: any;

const agentReplies = [
  "Hello! How can I help you today?",
  "Sure, I can assist with that.",
  "Let me check that for you.",
  "Thanks for waiting.",
  "Anything else I can do for you?",
];

const customerReplies = [
  "I’m facing an issue with the app.",
  "It crashes when I open it.",
  "I’ve reinstalled it twice.",
  "Is there any fix?",
  "Thanks for helping!",
];

export const fakeStomp = {
  subscribe: (
    destination: string,
    callback: (msg: any) => void,
    role: UserRole | null,
    ticketId: string
  ) => {
    const mockSender = role === "CUSTOMER" ? "agent_123" : "customer_456";
    const replies = role === "CUSTOMER" ? agentReplies : customerReplies;
    let count = 0;

    interval = setInterval(() => {
      if (count >= replies.length) {
        clearInterval(interval);
        return;
      }

      callback({
        body: JSON.stringify({
          id: crypto.randomUUID(),
          ticketId,
          sender: mockSender,
          text: replies[count],
          timestamp: new Date().toISOString(),
        }),
      });

      count++;
    }, 5000);
    console.log("→ Mock STOMP sent:", replies[count]);
  },

  unsubscribe: () => {
    clearInterval(interval);
  },
};
