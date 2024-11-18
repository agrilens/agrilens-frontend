import { useContext, createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAccountContext, useAccountUpdateContext } from "./AccountContext";

const url = process.env.REACT_APP_BACKEND_API_URL;

// Create contexts
const EvaluationContext = createContext();
const EvaluationUpdateContext = createContext();

// Custom hooks for accessing contexts
export function useEvaluationContext() {
  return useContext(EvaluationContext);
}

export function useEvaluationUpdateContext() {
  return useContext(EvaluationUpdateContext);
}

export const EvaluationProvider = ({ children }) => {
  // Temporary content storage states
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedEvaluationDetail, setSelectedEvaluationDetail] =
    useState(null);
  const [lastConversation, setLastConversation] = useState([]);
  const [messages, setMessages] = useState([]);

  const { userID } = useAccountContext();
  const { updateUserLastScanId, updateUserLastScanSummary } =
    useAccountUpdateContext();

  const updateSelectedImage = (imgSrc) => setSelectedImage(imgSrc);
  const updateSelectedEvaluationDetail = (evaluation) =>
    setSelectedEvaluationDetail(evaluation);
  const updateLastConversation = (messages) => setLastConversation(messages);
  const updateMessages = (messages) => setMessages(messages);

  useEffect(() => {
    if (userID !== "") {
      getUserRecentConversation();
    }
    // eslint-disable-next-line
  }, []);

  const getUserRecentConversation = async () => {
    const timestam = Date.now().toString();
    updateUserLastScanId(timestam); // default value for user's chat-history ID

    try {
      const uplaodHeaders = {
        headers: {
          // Authorization: `Bearer ${"token"}`,
          userID: userID,
        },
      };

      const response = await axios.get(
        `${url}/users/chat-history/recent`,
        uplaodHeaders
      );

      if (response.status === 200) {
        const conversations = response?.data?.conversations || [];
        setLastConversation(() => conversations);
        updateUserLastScanId(() => response?.data?.docId);
        updateUserLastScanSummary(() => response?.data?.initialAnalysisSummary);
      }

      return response?.data;
    } catch (err) {
      console.error("fetchData() Error:", err);
    } finally {
    }
  };
  // Provide state and update functions as objects
  return (
    <EvaluationContext.Provider
      value={{
        selectedImage,
        selectedEvaluationDetail,
        messages,
        lastConversation,
      }}
    >
      <EvaluationUpdateContext.Provider
        value={{
          updateSelectedImage,
          updateSelectedEvaluationDetail,
          updateMessages,
          updateLastConversation,
        }}
      >
        {children}
      </EvaluationUpdateContext.Provider>
    </EvaluationContext.Provider>
  );
};
