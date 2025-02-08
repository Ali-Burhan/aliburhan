'use client'
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import MessageRenderer from "../markdownrenderer";

export function Chatbot() {
  const [messages, setMessages] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{role:string;content:string}[]>([]); // Save chat history
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(true);
  const [showPrompts, setShowPrompts] = useState(true); // Display predefined prompts
  const [pendingBotMessage, setPendingBotMessage] = useState<any>(null); // Track ongoing bot response
  const chatBoxRef = useRef(null);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatBoxRef.current) {
      //@ts-ignore
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory, pendingBotMessage]);

  async function messageToBot(e:any, userMessage:any = null) {
    if (e) e.preventDefault();
    setFlag(false);
    setLoading(true);

    const messageToSend = userMessage || messages.trim();
    if (!messageToSend) {
      alert("Please enter a message.");
      setLoading(false);
      return;
    }

    setMessages(''); // Clear input field
    setShowPrompts(false); // Hide predefined prompts
    setChatHistory((prevHistory) => [...prevHistory, { role: "user", content: messageToSend }]);
    setPendingBotMessage(""); // Initialize pending message for bot response

    try {
      const res = await fetch(`https://b8ac-13-60-187-193.ngrok-free.app/chat?question=${encodeURIComponent(messageToSend)}`, {
        method: "GET",
        headers:{
          'ngrok-skip-browser-warning': 'true',
        }
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response from server");
      }

      const reader = res?.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let botResponse = "";

      while (true) {
        //@ts-ignore
        const { done, value } = await reader?.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        botResponse += chunk;

        // Update the pending bot response progressively
        setPendingBotMessage(botResponse);
      }

      // Finalize the bot's response
      setPendingBotMessage(null); // Clear pending bot response
      setChatHistory((prevHistory) => [...prevHistory, { role: "bot", content: botResponse }]);
      setLoading(false);
    } catch (error) {
      console.error("Error during fetch:", error);
      setLoading(false);
    }
  }

  const predefinedPrompts = [
    "Give me the details of Ali Burhan",
    "List down Ali Burhan's projects",
    "Ali Burhan's experience and expertise",
    "What are Ali Burhan's achievements?",
    "How did Ali Burhan contribute to the tech community?",
    "Tell me about Ali Burhan's skills and technologies.",
    "Provide a summary of Ali Burhan's career path.",
    "What are some notable projects Ali Burhan has worked on?",
    "Give me an overview of Ali Burhan's educational background.",
    "What are Ali Burhan's areas of expertise in programming?",
    "Tell me about the tech stack used by Ali Burhan.",
    "What is Ali Burhan's experience with AI and machine learning?",
    "How does Ali Burhan approach problem-solving in software development?",
    "What are the top projects Ali Burhan is known for?",
    "Can you provide a list of certifications held by Ali Burhan?",
    "What are Ali Burhan's contributions to open-source software?",
    "Explain Ali Burhan's role in software development teams.",
    "Where has Ali Burhan worked in the past?"
  ];
  
  return (
    <div className="flex flex-col h-[90vh] w-full border border-gray-300 rounded-lg bg-white shadow dark:border-gray-800 dark:bg-gray-900">
      {/* Header */}
      <div className="md:flex items-center hidden justify-between px-4 py-1 border-b border-gray-300 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <Avatar className="w-10 h-10">
            <Image
              alt="Avatar"
              className="rounded-full"
              height="40"
              src={"/ali.jpg"}
              width="40"
            />
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Support Bot</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
          </div>
        </div>
        <Button size="sm" variant="outline" className="cursor-not-allowed">
          Need help?
        </Button>
      </div>

      {/* Chat Content */}
      <div
        ref={chatBoxRef}
        className="flex-1 flex flex-col p-4 overflow-y-auto"
      >
        {flag && (
          <div className="place-self-center flex flex-col items-center gap-2 text-center">
            <Image
              src={'/chatbot.png'}
              height={80}
              width={80}
              alt="Chatbot"
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">How can I help you today?</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Ask me anything</p>
          </div>
        )}
         {/* Predefined Prompts */}
      {showPrompts && (
       <Marquee speed={100} className="p-4 flex space-x-4 justify-start">
       {predefinedPrompts.map((prompt:string, index) => (
         <Button
           key={index}
           className="bg-blue-500 text-white shadow hover:bg-blue-600 mx-2 whitespace-nowrap"
           onClick={() => messageToBot(null, prompt)}
         >
           {prompt}
         </Button>
       ))}
     </Marquee>
     
      )}
        {chatHistory.map((message:{role:string,content:string}, index:number) => (
          <div
            key={index}
            className={`flex my-2 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg p-3 text-sm max-w-[80%] ${
                message.role === "user"
                  ? "bg-blue-600 text-white self-end"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 self-start"
              }`}
            >
              {message.role === "bot" ? (
                <MessageRenderer message={message.content} />
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          </div>
        ))}
        {pendingBotMessage? (
          <div className="flex justify-start">
            <div className="rounded-lg max-w-[80%] p-3 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              <MessageRenderer message={pendingBotMessage} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center animate-pulse">
            <div className="max-w-[80%] px-4 py-3 text-sm rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 shadow-lg">
              <p className="font-semibold">Bot is under maintenance</p>
              <p className="text-sm">
                Please bear with me while I work on getting the bot back online.
                <span className="animate-spin h-5 w-5 border-b-2 border-yellow-900 dark:border-yellow-300 ml-2"></span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <form onSubmit={messageToBot}>
      <div className="flex items-center space-x-2 p-4 border-t border-gray-300 dark:border-gray-800">
        <Input
          className="flex-1 min-h-[50px] shadow"
          value={messages}
          placeholder="Type a message..."
          onChange={(e) => setMessages(e.target.value)}
        />
        {loading ? (
          <Button className="bg-blue-300 shadow" disabled>
            Sending...
          </Button>
        ) : (
          <Button className="bg-blue-600 text-white shadow hover:bg-blue-700" type="submit">
            Send
          </Button>
        )}
      </div>
      </form>
    </div>
  );
}

export default Chatbot;
