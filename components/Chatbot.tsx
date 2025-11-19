import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { Project } from '../types';
import { EXPERIENCE_ITEMS, SERVICES } from '../constants';

interface ChatbotProps {
  projects: Project[];
}

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ projects }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'model', text: "Hello. I am Fatih's AI assistant. How can I help you navigate this portfolio?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Prepare Context Data
      const contextData = {
        profile: "Fatih is a Senior Frontend Engineer and Product Designer based in Jakarta, Indonesia.",
        skills: "React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Micro-frontends, WebGL.",
        services: SERVICES.map(s => s.title).join(", "),
        experience: EXPERIENCE_ITEMS.map(e => `${e.role} at ${e.company} (${e.period})`).join("; "),
        projects: projects.map(p => `${p.title} (${p.category}): ${p.description}`).join("; ")
      };

      const systemInstruction = `
        You are an AI assistant for Fatih's personal portfolio website.
        Your tone is professional, concise, and slightly technical but welcoming.
        Do not use emojis excessively. Keep the "clean, geometric" aesthetic in your writing style (direct, clear).
        
        Here is the data you have access to:
        - Profile: ${contextData.profile}
        - Technical Skills: ${contextData.skills}
        - Services Offered: ${contextData.services}
        - Experience: ${contextData.experience}
        - Projects: ${contextData.projects}

        Answer the user's question based on this data. If asked about contact info, refer them to the contact section or email hello@fatih.dev.
        If you don't know the answer, politely say you only have access to professional information.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
            ...messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            })),
            { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: systemInstruction,
        },
      });

      const responseText = response.text || "I apologize, but I couldn't process that request right now.";

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: "System error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center shadow-xl transition-colors border border-zinc-200 ${
          isOpen ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-900 hover:bg-zinc-50'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
               <Sparkles className="w-6 h-6" strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-8 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white border border-zinc-200 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-200 flex items-center justify-center border border-zinc-300">
                <Bot className="w-4 h-4 text-zinc-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center border ${
                    msg.role === 'user' ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-zinc-200 text-zinc-600'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  <div className={`max-w-[80%] p-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-zinc-100 text-zinc-900' 
                      : 'bg-white border border-zinc-100 text-zinc-600'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                   <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border bg-white border-zinc-200 text-zinc-600">
                     <Bot className="w-4 h-4" />
                   </div>
                   <div className="bg-white border border-zinc-100 p-4 flex gap-1 items-center h-10">
                     <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1 h-1 bg-zinc-400 rounded-full" />
                     <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }} className="w-1 h-1 bg-zinc-400 rounded-full" />
                     <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 h-1 bg-zinc-400 rounded-full" />
                   </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-zinc-100 bg-white">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask about my projects..."
                  className="flex-1 bg-zinc-50 border border-zinc-200 p-3 text-sm focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="px-4 bg-zinc-900 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
            
            {/* Decorative Corner */}
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-300 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-300 pointer-events-none"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;