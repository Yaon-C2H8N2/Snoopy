import React, { createContext, useContext, useState, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthProvider as Auth, User } from "./auth.ts";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface IAuthContextType {
  user: User | null;
  signin: (
    username: string,
    password: string,
    setError: (error: string) => void,
    callback: VoidFunction,
  ) => void;
  signout: (callback: VoidFunction) => void;
}

interface DecodedToken {
  username: string;
  role: string;
  exp: number;
}

const AuthContext = createContext<IAuthContextType | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signin = async (
    username: string,
    password: string,
    setError: (error: string) => void,
    callback: VoidFunction,
  ) => {
    await Auth.SignIn(username, password, setError, () => {
      authWithToken();
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    Auth.SignOut(() => {
      setUser(null);
      Cookies.remove("token");
      callback();
    });
  };

  const authWithToken = () => {
    const token = Cookies.get("token");
    if (
      token !== undefined &&
      user === null &&
      (jwtDecode<DecodedToken>(token).exp || 0) > Date.now() / 1000
    ) {
      Auth.isAuthenticated = true;
      setUser({
        username: jwtDecode<DecodedToken>(token)["username"] || "",
        role: jwtDecode<DecodedToken>(token)["role"] || "USER",
      });
    }
  };

  authWithToken();

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();
  const token = Cookies.get("token");

  // redirect to login if not auth or if jwt expired
  if (!auth.user && token === undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (token !== undefined) {
    if ((jwtDecode(token).exp || 0) < Date.now() / 1000) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return children;
}

function RequireAdmin({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();
  const token = Cookies.get("token");

  // redirect to home if not admin or if jwt expired
  if (!auth.user && token === undefined) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else if (token !== undefined) {
    if (jwtDecode<DecodedToken>(token)["role"] !== "ADMIN") {
      return <Navigate to="/" state={{ from: location }} replace />;
    } else if ((jwtDecode<DecodedToken>(token).exp || 0) < Date.now() / 1000) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return children;
}

export { useAuth, RequireAuth, RequireAdmin, AuthProvider };
