import React, { useState } from "react";

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
import AgriLensNewLogo from "../assets/images/AgriLensNewLogo.png";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  // console.log(">>>> 1. messages: ", messages);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };
    // console.log(">>>> 2. newMessage: ", newMessage);

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "AgriChat" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });
    // console.log(">>>> 3. apiMessages: ", apiMessages);

    const lastFollowUpMessage =
      apiMessages[apiMessages.length - 1]?.content || "";
    // console.log(">>>> 3. lastFollowUpMessageContent: ", lastFollowUpMessage);

    const apiRequestBody = {
      initialAnalysis:
        '{\n  "overall_health_status": "Severe Issues",\n  "health_score": 40,\n  "pest_identification": "A large caterpillar is present, likely a corn earworm.",\n  "disease_identification": "None detected",\n  "weed_presence": "None detected",\n  "recommendations": [\n    "Apply appropriate insecticides to control the corn earworm.",\n    "Monitor the field for further pest infestations.",\n    "Consider using integrated pest management strategies to prevent future infestations."\n  ]\n}',
      model: "qwen",
      message: lastFollowUpMessage, // The message from our client chat input.
      conversationId: "121212",
    };
    // console.log(">>>> 4. apiRequestBody: ", apiRequestBody);

    await fetch(
      "http://127.0.0.1:5001/agrilens-web/us-central1/app/chat/follow-up",
      {
        method: "POST",
        headers: {
          // Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // console.log(">>>> 5. data: ", data);
        setMessages([
          ...chatMessages,
          {
            // message: data.choices[0].message.content,
            message: data.response,
            sender: "AgriGPT",
            direction: "incoming",
          },
        ]);
        // console.log(">>>> 5. res messages: ", messages);
        setIsTyping(false);
      });
  }

  return (
    <section id="chat" className="pb-4">
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
                  <div className="agriLesn-intro-logo pb-1">
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
                    <Message.CustomContent className="chat-message-content">
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
