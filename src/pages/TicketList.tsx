import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../features/tickets/ticketSlice";
import {
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import type { AppDispatch, RootState } from "../store";

const TicketList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tickets, loading, error } = useSelector(
    (state: RootState) => state.tickets
  );

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  console.log("DEBUG - ", { tickets, loading, error });

  if (loading) return <CircularProgress />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Ticket List</h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets?.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.id}</TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>
                <Chip
                  label={ticket.status}
                  color={
                    ticket.status === "OPEN"
                      ? "warning"
                      : ticket.status === "IN_PROGRESS"
                      ? "info"
                      : "success"
                  }
                />
              </TableCell>
              <TableCell>{ticket.priority}</TableCell>
              <TableCell>{ticket.assignee}</TableCell>
              <TableCell>
                {new Date(ticket.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketList;
