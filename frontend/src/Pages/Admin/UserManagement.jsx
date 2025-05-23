import React, { useState, useEffect } from "react";
import ConfirmModal from "../../Components/ConfirmModal";
import EditUserRoleModal from "../../Components/EditUserRoleModal";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { users as usersAxios } from "../../Connections/axios";
import "../../assets/css/admin.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await usersAxios.get("/");

      const data = response.data;
      setUsers(data.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser || !newRole) return;

    try {
      await usersAxios.put(`/${selectedUser.userID}`, {
        role: newRole,
      });

      // Update user in state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, role: newRole } : user,
        ),
      );

      setIsEditingRole(false);
      setSelectedUser(null);
      setNewRole("");
    } catch (err) {
      console.error("Error updating user role:", err);
      alert("Failed to update user role. Please try again.");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await usersAxios.delete(`/${selectedUser.userID}`);

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== selectedUser._id),
      );

      setIsConfirmingDelete(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsEditingRole(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsConfirmingDelete(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === "all" ||
      user.role?.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  // Count users by role
  const roleCounts = users.reduce((counts, user) => {
    const role = user.role?.toLowerCase() || "unknown";
    counts[role] = (counts[role] || 0) + 1;
    return counts;
  }, {});

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>User Management</h1>
        <div>
          <Link to="/admin/events" className="btn btn-outline-secondary me-2">
            Event Management
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <h2 className="card-text">{users.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Admin</h5>
              <h2 className="card-text">{roleCounts.admin || 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Organizer</h5>
              <h2 className="card-text">{roleCounts.organizer || 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">User</h5>
              <h2 className="card-text">{roleCounts.user || 0}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={roleFilter}
                onChange={handleRoleFilterChange}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="organizer">Organizer</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id.slice(-6)}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`badge ${
                            user.role === "admin"
                              ? "bg-info"
                              : user.role === "organizer"
                                ? "bg-success"
                                : "bg-primary"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => handleEditClick(user)}
                          title="Update Role"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteClick(user)}
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No users found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isConfirmingDelete && selectedUser && (
        <ConfirmModal
          title={"Confirm Delete User"}
          body={"Are you sure?"}
          onCancel={() => setIsConfirmingDelete(false)}
          onConfirm={handleDeleteUser}
        />
      )}

      {isEditingRole && selectedUser && (
        <EditUserRoleModal
          name={selectedUser.name}
          show={isEditingRole}
          handleClose={() => setIsEditingRole(false)}
          onConfirm={() => {
            setIsEditingRole(false);
            handleUpdateRole();
          }}
          onRoleChange={(role) => setNewRole(role)}
        />
      )}
    </div>
  );
};

export default UserManagement;
