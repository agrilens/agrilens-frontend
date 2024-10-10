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
  const [userType, setUserType] = useState("Default");
  const updateUserType = () => {
    setUserType(() => {
      if (userType === "Default") return "Not Default";
      else return "Default";
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
