"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let idleCallbackId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const initializeAuth = () => {
      // Check for token in localStorage
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          // Decode JWT token (simple decoding, NOT verification)
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUser(payload);
        } catch (error) {
          console.error("Failed to decode token:", error);
          localStorage.removeItem("auth_token");
        }
      }

      // Check for token in URL (from OAuth callback)
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get("token");
      if (urlToken) {
        try {
          const payload = JSON.parse(atob(urlToken.split(".")[1]));
          setUser(payload);
          localStorage.setItem("auth_token", urlToken);
          // Clean up URL
          window.history.replaceState({}, "", window.location.pathname);
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }

      setIsLoading(false);
    };

    if (typeof window.requestIdleCallback === "function") {
      idleCallbackId = window.requestIdleCallback(initializeAuth, {
        timeout: 2000,
      });
    } else {
      timeoutId = globalThis.setTimeout(initializeAuth, 300);
    }

    return () => {
      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, []);

  const login = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
      localStorage.setItem("auth_token", token);
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
