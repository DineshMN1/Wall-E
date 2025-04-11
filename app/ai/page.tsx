"use client";

import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "../component/Navbar";
import { Mobileview } from "../component/Mobilemenu";

const suggestions: Record<string, string> = {
  irrigation: "When should I irrigate?",
  pest: "When should I perform pest control?",
  battery: "When should I charge the rover?",
  nutrients: "When should I analyze the soil nutrients?",
};

const aiReplies: Record<string, string> = {
  irrigation: "💧 I recommend irrigating when soil moisture drops below 40%.",
  pest: "🪲 Pest control is best done when pest levels cross 20%, usually after rain.",
  battery: "🔋 Charge the rover when battery falls below 30%.",
  nutrients: "📊 Soil nutrients should be analyzed every 7 days for optimal crop health.",
};

const AI = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<
    { text: string; from: "user" | "ai" }[]
  >([]);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSuggestionClick = (key: string) => {
    setInputText(suggestions[key]);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const foundKey = Object.keys(suggestions).find(
      (k) => suggestions[k] === inputText.trim()
    );

    const aiResponse = foundKey
      ? aiReplies[foundKey]
      : "🤖 I'm analyzing your question... please wait for updates.";

    setMessages((prev) => [
      ...prev,
      { text: inputText, from: "user" },
      { text: aiResponse, from: "ai" },
    ]);
    setInputText("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar & Mobile View */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Mobileview menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Main Container */}
      <div className="pt-24 px-4 max-w-3xl mx-auto flex flex-col h-[calc(100vh-96px)]">
        <h1 className="text-3xl font-bold mb-4">AI Assist</h1>

        {/* Chat Display with fixed height */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto space-y-3 border border-white/10 rounded-lg p-4 bg-zinc-900/50 mb-4"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-md max-w-md text-sm shadow-md ${
                  msg.from === "user"
                    ? "bg-blue-700 text-white"
                    : "bg-gray-700 text-green-300"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggestion Buttons */}
        <div className="flex flex-wrap gap-3 mb-4">
          {Object.keys(suggestions).map((key) => (
            <button
              key={key}
              className="px-4 py-2 rounded-md capitalize bg-green-800 hover:bg-green-600 transition text-sm"
              onClick={() => handleSuggestionClick(key)}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Input Box + Send Button */}
        <div className="flex items-center gap-2">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            type="text"
            placeholder="Ask your AI assistant..."
            className="flex-1 px-4 py-2 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-md disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AI;
