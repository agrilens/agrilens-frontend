import { useContext, createContext, useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import axios from "axios";

const url = process.env.REACT_APP_BACKEND_API_URL;

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
  const [userType, setUserType] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userFName, setUserFName] = useState("");
  const [userLName, setUserLName] = useState("");
  const [userAccInfo, setUserAccInfo] = useState("");
  const [userAccDetail, setUserAccDetail] = useState({});
  const [userID, setUserID] = useState(localStorage.getItem("userID") || "");
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || ""
  );
  const [userLastScanId, setUserLastScanId] = useState(0);
  const [userLastScanSummary, setUserLastScanSummary] = useState(
    "No chosen analysis result."
  );
  const [userSelectedModel, setUserSelectedModel] = useState("qwen"); // Qwen by default.

  const chatBotRef = useRef(null);

  // useEffect(() => {
  //   const savedUserID = localStorage.getItem("userID");
  //   const savedUserToken = localStorage.getItem("userToken");

  //   if (savedUserID && savedUserToken) {
  //     setUserID(savedUserID);
  //     setUserToken(savedUserToken);
  //   }
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userID = user.uid;
        const userToken = user.accessToken;

        setUserID(userID);
        setUserToken(userToken);
        localStorage.setItem("userID", userID);
        localStorage.setItem("userToken", userToken);
        setUserEmail(user.email);

        // Wait for the account information to be fetched
        const data = await getUserAccInfo(userID);
        const accountInfo = data?.account;
        // console.log(">> 2 Context user account Data :", accountInfo);

        setUserType(accountInfo?.type);
        setUserFName(accountInfo?.firstName);
        setUserLName(accountInfo?.lastName);
        setUserName(accountInfo?.firstName + " " + accountInfo?.lastName);

        setUserAccDetail(() => accountInfo);
      } else {
        // User is signed out
        setUserID("");
        setUserToken("");
        setUserEmail("");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Account ifno initialization and update functions
  const getUserAccInfo = async (userId, headers = {}) => {
    try {
      const response = await axios.get(`/users/${userId}/account`, headers);
      // console.log("Response:", response.data);
      // console.log("Response:", response.status);
      const data = response?.data;
      setUserAccInfo(() => data?.account);

      // console.log("data: ", data);
      return data;
    } catch (err) {
      console.error("fetchData() Error:", err);
    } finally {
    }
  };
  const updateUserAccInfoDB = async (userId, data, headers = {}) => {
    try {
      const response = await axios.put(
        `${url}/users/${userId}/account`,
        data,
        headers
      );

      const updatedData = response?.data;
      setUserAccInfo(() => updatedData?.account);

      return updatedData;
    } catch (err) {
      console.error("fetchData() Error:", err);
    } finally {
    }
  };

  // Context state update functions
  const updateUserType = (type) => setUserType(type);
  const updateUserEmail = (email) => setUserEmail(email);
  const updateUserName = (name) => setUserName(name);
  const updateUserFName = (name) => setUserFName(name);
  const updateUserLName = (name) => setUserLName(name);
  const updateUserAccDetail = (detail) => {
    setUserAccDetail((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        ...detail,
      };
      updateUserAccInfoDB(userID, updatedDetails);
      return updatedDetails;
    });
  };
  const updateUserID = (id) => {
    setUserID(id);
    localStorage.setItem("userID", id);
  };
  const updateUserToken = (token) => {
    setUserToken(token);
    localStorage.setItem("userToken", token);
  };
  const updateUserLastScanSummary = (summary) =>
    setUserLastScanSummary(summary);
  const updateUserSelectedModel = (model) => setUserSelectedModel(model);
  const updateUserLastScanId = (id) => setUserLastScanId(id);

  // Provide state and update functions as objects
  return (
    <AccountContext.Provider
      value={{
        userType,
        userEmail,
        userName,
        userFName,
        userLName,
        userAccDetail,
        userID,
        userToken,
        userLastScanId,
        userLastScanSummary,
        userSelectedModel,
        chatBotRef,
      }}
    >
      <AccountUpdateContext.Provider
        value={{
          updateUserType,
          updateUserEmail,
          updateUserName,
          updateUserFName,
          updateUserLName,
          updateUserID,
          updateUserToken,
          updateUserAccDetail,
          updateUserLastScanId,
          updateUserLastScanSummary,
          updateUserSelectedModel,
        }}
      >
        {children}
      </AccountUpdateContext.Provider>
    </AccountContext.Provider>
  );
};
