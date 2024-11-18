import React, { useState, useEffect, useRef } from "react";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "remark-gfm";

import Row from "react-bootstrap/Row";

import "./Chat.css";

import { useAccountContext } from "../contexts/AccountContext";
import {
  useEvaluationContext,
  useEvaluationUpdateContext,
} from "../contexts/EvaluationContext";

import AgriLensNewLogo from "../assets/images/AgriLensNewLogo.png";
const url = process.env.REACT_APP_BACKEND_API_URL;

export const Chat = () => {
  // const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const {
    userID,
    userLastScanId,
    userLastScanSummary,
    userSelectedModel,
    chatBotRef,
  } = useAccountContext();

  const { lastConversation, messages } = useEvaluationContext();
  const { updateMessages } = useEvaluationUpdateContext();

  useEffect(() => {
    updateMessages(lastConversation);
  }, [lastConversation]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    updateMessages(newMessages);
    setIsTyping(true);
    await processMessageToLLM(newMessages);
  };

  async function processMessageToLLM(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "AgriChat" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const lastFollowUpMessage =
      apiMessages[apiMessages.length - 1]?.content || "";

    const apiRequestBody = {
      initialAnalysis: userLastScanSummary,
      model: userSelectedModel,
      message: lastFollowUpMessage, // The message from our client chat input.
      conversationId: userLastScanId,
      userID: userID,
    };

    await fetch(`${url}/chat/follow-up`, {
      method: "POST",
      headers: {
        // Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        updateMessages([
          ...chatMessages,
          {
            // message: data.choices[0].message.content,
            message: data.response,
            sender: "AgriGPT",
            direction: "incoming",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <section id="chat" className="pb-4" ref={chatBotRef}>
      <Row className="m-auto px-3 py-5">
        <MainContainer className="pb-4 pt-4">
          <ChatContainer>
            <MessageList
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="AgriGPT is typing" />
                ) : null
              }
            >
              <Message
                model={{
                  direction: "incoming",
                  type: "custom",
                }}
                className="custom-message-content-wrapper w-100 ms-auto"
              >
                <Message.CustomContent className="agriLesn-intro">
                  <div className="agriLesn-intro-logo pb-1 mb-1">
                    <Avatar src={AgriLensNewLogo} name="AgriLenslogo" />
                  </div>
                  <div className="agriLesn-intro-text fw-bold fs-6">
                    Hello, I'm AgriGPT! Ask me About your Results or Plants.
                  </div>
                </Message.CustomContent>
              </Message>
              {messages.map((message, i) => {
                // console.log(i, message);
                return (
                  <Message key={i} model={message}>
                    <Message.Header
                      sender={message.sender === "user" ? "ME" : "AGRILENS"}
                      sentTime="just now"
                      className="chat-message-header bolder"
                    />
                    <Message.CustomContent className="chat-message-content pt-1">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {message.message.trim()}
                      </ReactMarkdown>
                    </Message.CustomContent>
                  </Message>
                );
              })}
            </MessageList>
            <MessageInput
              className="chat-message-input"
              placeholder="Ask me anything about your results"
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {messages[messages.length - 1]?.content}
        </ReactMarkdown>
      </Row>
    </section>
  );
};

export default Chat;
