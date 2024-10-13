import { createContext, useState, useContext } from "react";

// Create contexts
const AccountContext = createContext();
const AccountUpdateContext = createContext();

// Custom hooks for accessing contexts
export function useAccountContext() {
  return useContext(AccountContext);
}

export function useAccountUpdateContext() {
  return useContext(AccountUpdateContext);
}

export const AccountProvider = ({ children }) => {
  const [userType, setUserType] = useState("Guest");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userToken, setUserToken] = useState("");

  // Update functions
  const updateUserType = (type) => setUserType(type);
  const updateUserEmail = (email) => setUserEmail(email);
  const updateUserName = (name) => setUserName(name);
  const updateUserToken = (token) => setUserToken(token);

  // Provide state and update functions as objects
  return (
    <AccountContext.Provider
      value={{ userType, userEmail, userName, userToken }}
    >
      <AccountUpdateContext.Provider
        value={{
          updateUserType,
          updateUserEmail,
          updateUserName,
          updateUserToken,
        }}
      >
        {children}
      </AccountUpdateContext.Provider>
    </AccountContext.Provider>
  );
};
