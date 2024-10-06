import { createContext, useState, useEffect, useContext } from "react";

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
  const updateUserType = () => {
    setUserType(() => {
      if (userType === "Guest") return "FARMER";
      else return "Guest";
    });
  };
  return (
    <AccountContext.Provider value={userType}>
      <AccountUpdateContext.Provider value={updateUserType}>
        {children}
      </AccountUpdateContext.Provider>
    </AccountContext.Provider>
  );
};
