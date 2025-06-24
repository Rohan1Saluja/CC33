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
  Typography,
  Paper,
} from "@mui/material";
import type { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router";
import TopBar from "../components/TopBar";

const TicketList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
    <>
      <TopBar />
      <div className="flex flex-col gap-4 px-6 py-4">
        <Typography variant="h5" className="font-semibold mb-4 text-gray-800">
          🎫 Ticket List
        </Typography>

        <Paper
          elevation={1}
          className="overflow-x-auto rounded-2xl border border-secondary-300 mt-4"
        >
          <Table size="small" className="min-w-[60dvw]">
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableCell className="font-semibold">ID</TableCell>
                <TableCell className="font-semibold">Subject</TableCell>
                <TableCell className="font-semibold">Status</TableCell>
                <TableCell className="font-semibold">Priority</TableCell>
                <TableCell className="font-semibold">Assignee</TableCell>
                <TableCell className="font-semibold">Created At</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tickets?.map((ticket, idx) => (
                <TableRow
                  key={ticket.id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  hover
                  sx={{
                    height: 46,
                  }}
                >
                  <TableCell>{ticket.id}</TableCell>

                  <TableCell
                    onClick={() => navigate(ticket.id)}
                    className="!text-links font-medium hover:!text-links-light hover:underline cursor-pointer"
                  >
                    {ticket.subject}
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={ticket.status}
                      color={
                        ticket.status === "OPEN"
                          ? "warning"
                          : ticket.status === "IN_PROGRESS"
                          ? "info"
                          : "success"
                      }
                      sx={{
                        p: 1.2,
                        fontSize: "0.75rem",
                      }}
                      className="rounded-xl"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={ticket.priority}
                      color={
                        ticket.priority === "HIGH"
                          ? "error"
                          : ticket.priority === "MEDIUM"
                          ? "warning"
                          : "default"
                      }
                      sx={{
                        p: 1.2,
                        fontSize: "0.75rem",
                      }}
                    />
                  </TableCell>

                  <TableCell>{ticket.assignee}</TableCell>

                  <TableCell className="whitespace-nowrap text-sm text-gray-600">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </>
  );
};

export default TicketList;
