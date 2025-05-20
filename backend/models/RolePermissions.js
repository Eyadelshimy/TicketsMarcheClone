const mongoose = require("mongoose");

// Define role permission schema
const rolePermissionSchema = new mongoose.Schema(
  {
    role: { 
      type: String, 
      enum: ["User", "Organizer", "Admin"], 
      required: true,
      unique: true
    },
    permissions: {
      // User permissions
      canBookTickets: { type: Boolean, default: false },
      canViewEvents: { type: Boolean, default: false },
      canViewOwnBookings: { type: Boolean, default: false },
      
      // Organizer permissions
      canCreateEvents: { type: Boolean, default: false },
      canEditEvents: { type: Boolean, default: false },
      canManageEventTickets: { type: Boolean, default: false },
      canViewEventAttendees: { type: Boolean, default: false },
      canViewSalesReports: { type: Boolean, default: false },
      
      // Admin permissions
      canManageUsers: { type: Boolean, default: false },
      canManageAllEvents: { type: Boolean, default: false },
      canViewSystemReports: { type: Boolean, default: false },
      canConfigureSystem: { type: Boolean, default: false }
    },
    description: { 
      type: String, 
      required: true 
    }
  },
  {
    timestamps: true
  }
);

// Create and export the model
const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);

// Function to create default permissions if they don't exist
async function initializeDefaultPermissions() {
  try {
    // Define default permissions for each role
    const defaultPermissions = [
      {
        role: "User",
        permissions: {
          canBookTickets: true,
          canViewEvents: true,
          canViewOwnBookings: true,
        },
        description: "Standard users can browse and book event tickets"
      },
      {
        role: "Organizer",
        permissions: {
          canBookTickets: true,
          canViewEvents: true,
          canViewOwnBookings: true,
          canCreateEvents: true, 
          canEditEvents: true,
          canManageEventTickets: true,
          canViewEventAttendees: true,
          canViewSalesReports: true
        },
        description: "Organizers can create and manage their own events"
      },
      {
        role: "Admin",
        permissions: {
          canBookTickets: true, 
          canViewEvents: true,
          canViewOwnBookings: true,
          canCreateEvents: true,
          canEditEvents: true, 
          canManageEventTickets: true,
          canViewEventAttendees: true,
          canViewSalesReports: true,
          canManageUsers: true,
          canManageAllEvents: true,
          canViewSystemReports: true,
          canConfigureSystem: true
        },
        description: "Administrators have full platform management access"
      }
    ];

    // For each default permission, update if exists or create
    for (const perm of defaultPermissions) {
      await RolePermission.findOneAndUpdate(
        { role: perm.role },
        perm,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    console.log("Default permissions initialized");
  } catch (error) {
    console.error("Error initializing permissions:", error);
  }
}

module.exports = { 
  RolePermission,
  initializeDefaultPermissions
}; 