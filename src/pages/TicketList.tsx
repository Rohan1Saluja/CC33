import React, { useEffect } from "react";
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
  Pagination,
  Button,
} from "@mui/material";
import type { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router";
import TopBar from "../components/TopBar";
import TicketFilteration from "../components/TicketFilteration";
import CreateTicket from "../components/CreateTicket";

const TicketList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.role);
  const { tickets, loading, error } = useSelector(
    (state: RootState) => state.tickets
  );

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const [status, setStatus] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [assignee, setAssignee] = React.useState("");

  const [showForm, setShowForm] = React.useState(false);

  const filteredTickets = tickets.filter(
    (ticket) =>
      (status ? ticket.status === status : true) &&
      (priority ? ticket.priority === priority : true) &&
      (assignee ? ticket.assignee === assignee : true)
  );

  const paginatedTickets = filteredTickets.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  React.useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  //   console.log("DEBUG - ", { tickets, loading, error });

  if (loading) return <CircularProgress />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <TopBar />
      <div className="flex flex-col gap-4 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Typography variant="h5" className="font-semibold mb-4 text-gray-800">
            🎫 Ticket List
          </Typography>
          {role === "CUSTOMER" && (
            <Button
              variant="contained"
              className="!bg-primary"
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? "Cancel" : "Create Ticket"}
            </Button>
          )}
        </div>

        {showForm && <CreateTicket setShowForm={setShowForm} />}

        <TicketFilteration
          status={status}
          setStatus={setStatus}
          assignee={assignee}
          setAssignee={setAssignee}
          priority={priority}
          setPriority={setPriority}
          tickets={paginatedTickets}
        />

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
              {paginatedTickets?.map((ticket, idx) => (
                <TableRow
                  key={ticket.id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  hover
                  sx={{
                    height: 46,
                  }}
                >
                  <TableCell title={ticket.id}>
                    {ticket.id.slice(0, 6)}...
                  </TableCell>

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
        <Pagination
          count={Math.ceil(filteredTickets.length / rowsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          className="mt-4 self-end"
        />
      </div>
    </>
  );
};

export default TicketList;
