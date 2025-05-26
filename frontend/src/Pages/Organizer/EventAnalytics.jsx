import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { events as eventsConnection } from "../../Connections/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EventAnalytics = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) fetchEventAnalytics();
  }, [user]);

  const fetchEventAnalytics = async () => {
    try {
      setLoading(true);
      const response = await eventsConnection.get(`/organizer/${user._id}`);
      const data = response.data.data;

      // Transform data for the chart
      const transformedData = data.map((event) => ({
        name: event.title,
        totalTickets: event.totalTickets,
        soldTickets: event.totalTickets - event.remainingTickets,
        percentageSold: Math.round(
          ((event.totalTickets - event.remainingTickets) / event.totalTickets) *
            100,
        ),
      }));

      setEvents(transformedData);
    } catch (err) {
      console.error("Error fetching event analytics:", err);
      setError("Failed to load analytics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Event Analytics</h1>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Ticket Sales Overview</h5>
              <div style={{ height: "400px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={events}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                      height={80}
                      tick={{ fill: "#666" }}
                    />
                    <YAxis tick={{ fill: "#666" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="totalTickets"
                      stroke="#212121"
                      strokeWidth={2}
                      dot={{ fill: "#212121", r: 6 }}
                      activeDot={{ r: 8 }}
                      name="Total Tickets"
                    />
                    <Line
                      type="monotone"
                      dataKey="soldTickets"
                      stroke="#f7c53f"
                      strokeWidth={2}
                      dot={{ fill: "#f7c53f", r: 6 }}
                      activeDot={{ r: 8 }}
                      name="Sold Tickets"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Detailed Statistics</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Total Tickets</th>
                      <th>Sold Tickets</th>
                      <th>Sales Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => (
                      <tr key={index}>
                        <td>{event.name}</td>
                        <td>{event.totalTickets}</td>
                        <td>{event.soldTickets}</td>
                        <td>
                          <div className="progress" style={{ height: "20px" }}>
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${event.percentageSold}%`,
                                backgroundColor: "#f7c53f",
                              }}
                              aria-valuenow={event.percentageSold}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {event.percentageSold}%
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAnalytics;
