import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";

interface User {
  id: number;
  email: string;
  fullname: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Recupera el usuario si hay token al cargar la app
  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const response = await fetch("http://localhost:5000/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
          }
        } catch {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token, user]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const register = async (
    email: string,
    password: string,
    fullname: string,
    username: string
  ) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullname, username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
