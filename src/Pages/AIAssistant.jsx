import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, Send } from "lucide-react";
import axiosClient from "@/Utils/axiosClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react";

export default function AIAssistant({ problem, messages, setMessages }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (customPrompt = null) => {
    const userMessage = customPrompt || input;

    if (!userMessage.trim() || loading) return;

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        text: userMessage,
      },
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axiosClient.post("/ai/chat", {
        message: userMessage,

        // chat history
        messages: updatedMessages,

        // problem context
        problem: {
          title: problem?.title,
          description: problem?.description,
          visibleTestCases: problem?.visibleTestCases,
          startCode: problem?.startCode,
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.data.reply || "No response from BitMentor.",
        },
      ]);
    } catch (err) {
      console.log("AI ERROR:", err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

return (
  <Card className="relative h-full overflow-hidden flex flex-col p-4 border border-slate-800 rounded-2xl shadow-xl bg-slate-950 text-slate-200">
    {/* Animated Background */}
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#020617,#020617,#0f172a,#020617)]  animate-[gradientMove_12s_ease_infinite] bg-size-[200%_200%]" />
    <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-slate-500/20 blur-3xl" />
    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-slate-400/10 blur-3xl" />

    {/* Main Content */}
    <div className="relative z-10 flex h-full flex-col">
      {/* Header */}
      <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.25)]">
              <Sparkles size={20} className="text-purple-300" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                BitMentor AI
              </h2>
              <p className="text-xs text-slate-400">
                Hints, dry runs, debugging and optimization
              </p>
            </div>
          </div>

          <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/20">
            Online
          </span>
        </div>

        {/* Quick Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            disabled={loading}
            onClick={() => sendMessage("Give me a hint")}
            className="cursor-pointer rounded-xl bg-slate-900/80 text-slate-200 border border-slate-700 hover:bg-purple-500/20 hover:border-purple-400/30"
          >
            Hint
          </Button>

          <Button
            size="sm"
            disabled={loading}
            onClick={() => sendMessage("Explain the approach")}
            className="cursor-pointer rounded-xl bg-slate-900/80 text-slate-200 border border-slate-700 hover:bg-cyan-500/20 hover:border-cyan-400/30"
          >
            Approach
          </Button>

          <Button
            size="sm"
            disabled={loading}
            onClick={() => sendMessage("Optimize the solution")}
            className="cursor-pointer rounded-xl bg-slate-900/80 text-slate-200 border border-slate-700 hover:bg-indigo-500/20 hover:border-indigo-400/30"
          >
            Optimize
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="mb-4 h-16 w-16 rounded-2xl bg-white/5 border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] flex items-center justify-center  animate-pulse">
              <Sparkles size={30} className="text-purple-300" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              Stuck on this problem?
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
              Ask BitMentor for hints, dry runs, approach explanation, or code debugging.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap transition-all duration-300 ${
              msg.role === "user"
                ? "ml-auto bg-linear-to-br from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.25)]"
                : "bg-white/5 text-slate-200 border border-white/10 backdrop-blur-xl"
            }`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ inline, children }) {
                  const codeText = String(children).replace(/\n$/, "");

                  if (inline) {
                    return (
                      <code className="bg-slate-950 px-1.5 py-0.5 rounded-md text-cyan-300">
                        {children}
                      </code>
                    );
                  }

                  return (
                    <div className="my-3 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                      <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-700">
                        <span className="text-xs text-slate-400">Code</span>

                        <button
                          onClick={() => navigator.clipboard.writeText(codeText)}
                          className="cursor-pointer flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
                        >
                          <Copy size={13} />
                          Copy
                        </button>
                      </div>

                      <pre className="p-3 overflow-x-auto text-sm text-slate-200">
                        <code>{codeText}</code>
                      </pre>
                    </div>
                  );
                },

                p({ children }) {
                  return <p className="mb-2 leading-relaxed">{children}</p>;
                },

                ul({ children }) {
                  return (
                    <ul className="list-disc ml-5 mb-2 space-y-1">
                      {children}
                    </ul>
                  );
                },

                ol({ children }) {
                  return (
                    <ol className="list-decimal ml-5 mb-2 space-y-1">
                      {children}
                    </ol>
                  );
                },

                h3({ children }) {
                  return (
                    <h3 className="text-base font-semibold mt-3 mb-2 text-white">
                      {children}
                    </h3>
                  );
                },
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div className="w-fit rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-3 text-sm text-slate-400">
            <span className="animate-pulse">BitMentor is thinking...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
        <div className="flex gap-2">
          <Input
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Ask for hint, dry run, or debug help..."
            className="bg-transparent border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-purple-500"
          />

          <Button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="cursor-pointer rounded-xl bg-purple-600 hover:bg-purple-500 text-white"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  </Card>
);
}