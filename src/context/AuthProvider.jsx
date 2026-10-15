import React, {
  createContext,
  useContext,
  useState,
} from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const initialAuthUser = localStorage.getItem("Users");

      return initialAuthUser
        ? JSON.parse(initialAuthUser)
        : null;
    } catch (error) {
      console.error("Error loading authenticated user:", error);
      localStorage.removeItem("Users");
      return null;
    }
  });

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);