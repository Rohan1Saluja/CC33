import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { TextField, Button, Chip } from "@mui/material";
import type { AppDispatch, RootState } from "../store";
import { fetchTickets } from "../features/tickets/ticketSlice";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

const TicketDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const ticket = tickets.find((t) => t.id === id);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Mock fetching messages
  useEffect(() => {
    // simulate fetch from /api/tickets/:id/messages
    setTimeout(() => {
      setMessages([
        {
          id: "1",
          sender: "customer_456",
          text: "Hello, I’m facing an issue.",
          timestamp: new Date().toISOString(),
        },
        {
          id: "2",
          sender: "agent_123",
          text: "We’re checking that for you.",
          timestamp: new Date().toISOString(),
        },
      ]);
    }, 500);
  }, [id]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: Message = {
      id: crypto.randomUUID(),
      sender: "agent_123",
      text: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  React.useEffect(() => {
    if (tickets.length === 0) {
      dispatch(fetchTickets());
    }
  }, [tickets.length, dispatch]);

  if (!ticket) return <div className="p-4">Ticket not found.</div>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Ticket: {ticket.subject}</h2>

      <div className="space-x-2">
        <Chip label={`Status: ${ticket.status}`} color="info" />
        <Chip label={`Priority: ${ticket.priority}`} color="warning" />
        <Chip label={`Assignee: ${ticket.assignee}`} />
      </div>

      <div className="bg-white rounded shadow p-4 max-h-[400px] overflow-y-auto space-y-4 border">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col">
            <div className="text-sm text-gray-500">
              {msg.sender} • {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
            <div className="bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-900 max-w-prose">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default TicketDetail;
