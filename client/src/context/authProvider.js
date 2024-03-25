// AuthProvider.js
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  return (
    <AuthContext.Provider value={{ auth, setAuth, hasVoted, setHasVoted }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
