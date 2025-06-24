import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { addTicket } from "../features/tickets/ticketSlice";

interface Props {
  setShowForm: any;
}

const CreateTicket: React.FC<Props> = ({ setShowForm }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [subject, setSubject] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [newPriority, setNewPriority] = React.useState("MEDIUM");
  const handleCreate = () => {
    if (!subject.trim()) return;
    dispatch(
      addTicket({
        id: crypto.randomUUID(),
        subject,
        description,
        priority: newPriority,
        status: "OPEN",
        assignee: "",
        createdAt: new Date().toISOString(),
      })
    );
    setSubject("");
    setDescription("");
    setNewPriority("MEDIUM");
    setShowForm(false);
  };
  return (
    <Paper className="flex flex-col gap-4 p-4 border border-secondary-300 rounded-xl space-y-4">
      <Typography variant="subtitle1">New Ticket</Typography>
      <TextField
        fullWidth
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormControl size="small" fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          label="Priority"
        >
          <MenuItem value="LOW">Low</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
        </Select>
      </FormControl>
      <div className="text-right">
        <Button
          variant="contained"
          className="!bg-primary"
          onClick={handleCreate}
        >
          Submit
        </Button>
      </div>
    </Paper>
  );
};

export default CreateTicket;
