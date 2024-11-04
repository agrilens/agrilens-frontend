import React, { useState } from "react";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import Row from "react-bootstrap/Row";

import "./Chat.css";

// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "You are a chatbot for AgriLens App. The app provides users with plant diagnosis service where users would submit a plant picture and AgriLens by using a LVM provides analyses result. Your responsibility is to provide users with further questions to the result and the plant itself.",
};

export const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm AgriGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    // let apiMessages = chatMessages.map((messageObject) => {
    //   let role = "";
    //   if (messageObject.sender === "ChatGPT") {
    //     role = "assistant";
    //   } else {
    //     role = "user";
    //   }
    //   return { role: role, content: messageObject.message };
    // });
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
          },
        ]);
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
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput
              style={{
                color: "red",
                height: "56px",
              }}
              placeholder="Ask me anything about your results"
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </Row>
    </section>
  );
};

export default Chat;
