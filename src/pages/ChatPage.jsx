import { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, Bot } from "lucide-react";

import ChatMessage from "../components/ChatMessage";
import { MOCK_DOCUMENTS, AI_RESPONSES } from "../data/mockData";

const SUGGESTIONS = ["Summarize Q4 report", "Key findings from analysis", "What's the product roadmap?"];

export default function ChatPage({ tenants }) {
  const [activeTenant, setActiveTenant] = useState(tenants[0]?.id || 1);
  const [messages,     setMessages]     = useState({});
  const [input,        setInput]        = useState("");
  const [typing,       setTyping]       = useState(false);
  const bottomRef = useRef();

  const tenantMsgs = messages[activeTenant] || [];
  const tenant     = tenants.find(t => t.id === activeTenant);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tenantMsgs, typing]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), role: "user", content: text };
    setMessages(prev => ({ ...prev, [activeTenant]: [...(prev[activeTenant] || []), userMsg] }));
    setInput("");
    setTyping(true);

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

    const aiMsg = {
      id:      Date.now() + 1,
      role:    "ai",
      content: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
    };
    setMessages(prev => ({ ...prev, [activeTenant]: [...(prev[activeTenant] || []), aiMsg] }));
    setTyping(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Q&A Chat</h1>
          <p className="text-sm text-slate-400 mt-1">Ask questions about tenant documents</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">Tenant:</span>
          <select
            value={activeTenant}
            onChange={e => setActiveTenant(Number(e.target.value))}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
          >
            {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-2xl flex flex-col overflow-hidden">
        {/* Context bar */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-700/50 bg-slate-800/50">
          <div className="w-6 h-6 rounded-lg bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-300">
            {tenant?.name[0]}
          </div>
          <span className="text-sm text-slate-300 font-medium">{tenant?.name}</span>
          <span className="text-xs text-slate-600">·</span>
          <span className="text-xs text-slate-500">{MOCK_DOCUMENTS[activeTenant]?.length || 0} docs indexed</span>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#334155 transparent" }}>
          {tenantMsgs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <div className="w-14 h-14 rounded-2xl bg-slate-700/50 flex items-center justify-center mb-4">
                <MessageSquare size={24} className="text-slate-500" />
              </div>
              <p className="text-slate-400 font-medium">Start a conversation</p>
              <p className="text-slate-600 text-sm mt-1">Ask anything about {tenant?.name}'s documents</p>
              <div className="flex flex-wrap gap-2 mt-5 justify-center">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded-xl transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tenantMsgs.map(msg => <ChatMessage key={msg.id} msg={msg} />)}

          {/* Typing indicator */}
          {typing && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <Bot size={14} className="text-indigo-400" />
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask a question about the documents…"
              rows={1}
              className="flex-1 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || typing}
              className="w-10 h-10 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
