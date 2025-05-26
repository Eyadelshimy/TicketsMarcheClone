import React, { createContext, useState, useContext, useEffect } from "react";
import { users, auth } from "../Connections/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useModal } from "./ModalContext";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { openLoginModal } = useModal();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  // Check if user is already logged in on page load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const savedToken = cookies["token"];
        if (
          (savedToken === null || savedToken === undefined) &&
          (location.pathname !== "/login" || location.pathname !== "/register")
        ) {
          openLoginModal();
          return;
        }

        const response = await users.get("/me", {
          headers: { Authorization: "Bearer " + savedToken },
        });

        if (response.data.success) {
          const userData = response.data;
          setUser(userData.data);
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await auth.post("/login", {
        email,
        password,
        rememberMe,
      });

      const data = await response.data;

      if (data.success) {
        setUser(data.data);

        // If remember me is checked, store the token in localStorage
        if (rememberMe && data.token) {
          setCookie("token", data.token);
        } else {
          removeCookie();
        }

        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error occurred" };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      // Make sure role follows the correct capitalization format when sending to backend
      const modifiedUserData = { ...userData };

      const response = await auth.post("/register", modifiedUserData);

      const data = response.data;

      if (data.success) {
        setUser(data.data);

        // Store token if provided with registration
        if (data.token) {
          setCookie("token", data.token);
        }

        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Network error occurred" };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await auth.post("/logout");
      setUser(null);
      // Clear the stored token on logout
      removeCookie("token");
      // Navigate to home page after logout
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
