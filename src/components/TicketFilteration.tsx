import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
  status: string;
  setStatus: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  assignee: string;
  setAssignee: (value: string) => void;
  tickets: any;
}

const TicketFilteration: React.FC<Props> = ({
  status,
  setStatus,
  priority,
  setPriority,
  tickets,
  assignee,
  setAssignee,
}) => {
  const uniqueAssignees = [
    ...new Set(tickets.map((t: any) => t.assignee)),
  ].filter(Boolean);
  return (
    <div className="flex gap-4 items-center flex-wrap">
      <FormControl size="small">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
          className="min-w-24"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="OPEN">Open</MenuItem>
          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
          <MenuItem value="CLOSED">Closed</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          label="Priority"
          className="min-w-24"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="LOW">Low</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Assignee</InputLabel>
        <Select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          label="Assignee"
          className="min-w-28"
        >
          <MenuItem value="">All</MenuItem>
          {uniqueAssignees.map((a: any, index: number) => (
            <MenuItem key={`assignee-${index}`} value={a}>
              {a || "Unassigned"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default TicketFilteration;
