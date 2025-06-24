import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { TextField, Button, Chip } from "@mui/material";
import type { AppDispatch, RootState } from "../store";
import { fetchTickets } from "../features/tickets/ticketSlice";
import { fakeStomp } from "../lib/fakeStomp";
import TopBar from "../components/TopBar";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

const TicketDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: ticketId } = useParams<{ id: string }>();
  const { role } = useSelector((state: RootState) => state.auth);

  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const ticket = tickets.find((t) => t.id === ticketId);

  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");

  // Fetch ticket if not loaded
  React.useEffect(() => {
    if (tickets.length === 0) {
      dispatch(fetchTickets());
    }
  }, [tickets.length, dispatch]);

  // Load initial mock messages
  React.useEffect(() => {
    if (!ticketId) return;

    setTimeout(() => {
      setMessages([
        role === "CUSTOMER"
          ? {
              id: "1",
              sender: "customer_456",
              text: "Hello, I’m facing an issue.",
              timestamp: new Date().toISOString(),
            }
          : {
              id: "1",
              sender: "agent_123",
              text: "We’re checking that for you.",
              timestamp: new Date().toISOString(),
            },
      ]);
    }, 500);
  }, [ticketId]);

  // Handle incoming message from fake STOMP
  const handleMessage = React.useCallback((msg: any) => {
    const parsed: Message = JSON.parse(msg.body);
    setMessages((prev) => [...prev, parsed]);
  }, []);

  // Subscribe to fake STOMP
  React.useEffect(() => {
    if (!ticketId || !role) return;

    fakeStomp.subscribe(
      `/topic/tickets/${ticketId}`,
      handleMessage,
      role,
      ticketId
    );

    return () => {
      fakeStomp.unsubscribe();
    };
  }, [ticketId, role, handleMessage]);

  const handleSend = () => {
    if (!input.trim() || !ticketId) return;

    const sender =
      role === "AGENT"
        ? "agent_123"
        : role === "CUSTOMER"
        ? "customer_456"
        : "admin";

    const newMsg: Message = {
      id: crypto.randomUUID(),
      sender,
      text: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  if (!ticket) return <div className="p-4">Ticket not found.</div>;

  return (
    <div className="flex flex-col w-full gap-8">
      <TopBar />

      <div className="p-6 sm:min-w-[60%] 2xl:min-w-[50%] mx-auto space-y-6 bg-white rounded-xl shadow-md border">
        {/* Ticket Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            {ticket.subject}
          </h2>
          <div className="flex gap-2 text-sm text-gray-500">
            <Chip
              label={`Status: ${ticket.status}`}
              color="info"
              size="small"
            />
            <Chip
              label={`Priority: ${ticket.priority}`}
              color="warning"
              size="small"
            />
            <Chip label={`Assignee: ${ticket.assignee}`} size="small" />
            <span className="ml-auto text-xs italic">
              Created: {new Date(ticket.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="bg-gray-50 rounded-md p-4 max-h-[400px] overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isMine =
              (role === "AGENT" && msg.sender === "agent_123") ||
              (role === "CUSTOMER" && msg.sender === "customer_456");
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  isMine ? "items-end" : "items-start"
                }`}
              >
                <div className="text-xs text-gray-400 mb-1">
                  {msg.sender} • {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
                <div
                  className={`px-4 py-2 rounded-lg text-sm max-w-xs ${
                    isMine
                      ? "bg-primary/90 text-white"
                      : "bg-secondary-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Box */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            className={`${!input.trim() ? "" : "!bg-primary-700/75"}`}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
