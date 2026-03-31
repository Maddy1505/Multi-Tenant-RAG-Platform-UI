import { Bot, User } from "lucide-react";

/**
 * Renders a single chat bubble. Bolds text wrapped in **double asterisks**.
 */
export default function ChatMessage({ msg }) {
  const isUser = msg.role === "user";

  const renderContent = (text) =>
    text.split("**").map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="font-semibold text-white">{part}</strong>
        : part
    );

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
        isUser ? "bg-violet-500/20 text-violet-400" : "bg-indigo-500/20 text-indigo-400"
      }`}>
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isUser
          ? "bg-violet-600/80 text-white rounded-tr-sm"
          : "bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm"
      }`}>
        {renderContent(msg.content)}
      </div>
    </div>
  );
}
