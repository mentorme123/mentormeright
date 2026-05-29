"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, X, Send, Loader2, Bot, User,
  Sparkles, ChevronRight 
} from "lucide-react";
import Link from "next/link";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content: `👋 Hello! I'm **AI Corner**, your personal MentorMe guide!

I'm here to help you with:
• 🗺️ Building a **personalized career roadmap**
• 📚 Exploring the **Career Library** (5000+ paths)
• 🎯 Taking the **Free Career Assessment Test**
• 👥 Booking a **1-on-1 Expert Counseling** session (₹4,999)
• 🌍 **Study Abroad** guidance

How can I help you today?`,
    suggestions: [
      "Build my career roadmap 🗺️",
      "Tell me about MentorMe",
      "Book a counseling session",
      "Explore Career Library"
    ]
  }
];

export function AiCornerChatbot() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasShownPing, setHasShownPing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-open with delay to grab attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasShownPing(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "I apologize, I had trouble processing that. Please try again.",
        suggestions: data.suggestions || []
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm having a moment of difficulty. Please try again or contact us directly at admin@mentormeright.in 📧"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // New search handling – reuse sendMessage to treat search as a regular query
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    // Send the search query as a normal message so the AI can respond
    sendMessage(searchQuery);
    setSearchQuery("");
  };
  // Parse markdown-like bold text with XSS protection
  const parseContent = (content: string) => {
    // Basic sanitization - remove script tags and dangerous attributes
    const sanitized = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/on\w+='[^']*'/g, '');

    return sanitized.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-black text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Button */}
      <div 
        id="ai-chatbot-root"
        className="fixed right-6 top-6 z-[999] print-hidden w-auto h-auto flex flex-col items-end justify-center"
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mb-3 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 pr-6 flex items-center gap-3 cursor-pointer hover:shadow-brand-blue/20 transition-all group"
              onClick={() => setIsOpen(true)}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-orange rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800">AI Corner</p>
                <p className="text-[10px] text-slate-400">Ask me anything! 👋</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
          className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl shadow-2xl shadow-brand-blue/30 flex items-center justify-center relative"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="text-white w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle className="text-white w-7 h-7" />
              </motion.div>
            )}
          </AnimatePresence>
          {/* Ping dot */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-orange border-2 border-white"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed left-1/2 top-1/2 z-[998] w-[420px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
            style={{ height: isMinimized ? "auto" : "600px", maxHeight: "85vh" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-blue to-brand-blue/80 p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot className="text-white w-6 h-6" />
                </div>
                <div>
                  <p className="font-black text-white text-sm">AI Corner</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <p className="text-blue-100 text-xs">MentorMe Agent • Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="text-white text-sm font-black">{isMinimized ? "▲" : "▼"}</span>
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white/10 hover:bg-red-400 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="text-white w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Search Bar Below Header */}
                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search</span>
                  <input
                    type="text"
                    placeholder="Search mentors, topics, etc..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 text-sm px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-3.5 py-1.5 bg-brand-blue text-white text-xs font-bold rounded-xl hover:bg-brand-blue/90 transition-all flex-shrink-0"
                  >
                    Search
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${
                        msg.role === "assistant" 
                          ? "bg-gradient-to-br from-brand-blue to-brand-orange" 
                          : "bg-slate-200"
                      }`}>
                        {msg.role === "assistant" 
                          ? <Sparkles className="text-white w-4 h-4" />
                          : <User className="text-slate-500 w-4 h-4" />
                        }
                      </div>

                      <div className={`max-w-[85%] space-y-2 ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === "assistant"
                            ? "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"
                            : "bg-brand-blue text-white rounded-tr-sm"
                        }`}>
                          {parseContent(msg.content)}
                        </div>

                        {/* Quick Suggestions */}
                        {msg.suggestions && msg.suggestions.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {msg.suggestions.map((s, i) => (
                              <button
                                key={i}
                                onClick={() => handleSuggestion(s)}
                                className="px-3 py-1.5 bg-brand-blue/5 hover:bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold rounded-xl transition-all flex items-center gap-1"
                              >
                                {s} <ChevronRight size={10} />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2 items-center">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center">
                        <Sparkles className="text-white w-4 h-4" />
                      </div>
                      <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-brand-blue/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                          <span className="w-2 h-2 bg-brand-blue/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                          <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Links Bar */}
                <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto flex-shrink-0">
                  <Link href="/assessment" className="px-3 py-1.5 bg-brand-orange/10 text-brand-orange text-xs font-black rounded-lg whitespace-nowrap hover:bg-brand-orange/20 transition-colors">
                    Free Test 🎯
                  </Link>
                  <Link href="/counsellors" className="px-3 py-1.5 bg-brand-blue/10 text-brand-blue text-xs font-black rounded-lg whitespace-nowrap hover:bg-brand-blue/20 transition-colors">
                    Book ₹4,999 Session
                  </Link>
                  <Link href="/career-library" className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-black rounded-lg whitespace-nowrap hover:bg-emerald-100 transition-colors">
                    Career Library 📚
                  </Link>
                  <Link href="/study-abroad" className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-black rounded-lg whitespace-nowrap hover:bg-purple-100 transition-colors">
                    Study Abroad 🌍
                  </Link>
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
                  <div className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/10 transition-all">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask AI Corner anything..."
                      className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                      disabled={isLoading}
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || isLoading}
                      className="w-8 h-8 bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all disabled:cursor-not-allowed flex-shrink-0"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-slate-300 mt-2 font-medium">Powered by MentorMe AI • Gemini</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
