import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, Send } from "lucide-react";
import axiosClient from "@/Utils/axiosClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react";

export default function AIAssistant({ problem }) {
  const [messages, setMessages] = useState([]);
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
    <Card className="h-full flex flex-col p-4 bg-[#1e1e1e] text-[#d4d4d4] border border-[#2d2d2d] rounded-md shadow-none">
      {/* Header Buttons */}
      <div className="flex gap-2 mb-4 border-b border-[#2d2d2d] pb-3">
        <Button
          size="sm"
          disabled={loading}
          onClick={() => sendMessage("Give me a hint")}
          className="bg-[#252526] text-[#d4d4d4] border border-[#3c3c3c] hover:bg-[#2a2d2e]"
        >
          Hint
        </Button>

        <Button
          size="sm"
          disabled={loading}
          onClick={() => sendMessage("Explain the approach")}
          className="bg-[#252526] text-[#d4d4d4] border border-[#3c3c3c] hover:bg-[#2a2d2e]"
        >
          Approach
        </Button>

        <Button
          size="sm"
          disabled={loading}
          onClick={() => sendMessage("Optimize the solution")}
          className="bg-[#252526] text-[#d4d4d4] border border-[#3c3c3c] hover:bg-[#2a2d2e]"
        >
          Optimize
        </Button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-[#858585]">
            <Sparkles size={34} className="mb-3 text-[#569cd6]" />
            <p className="text-sm">Ask BitMentor about this problem</p>
            <p className="text-xs mt-1">
              Get hints, approach, dry run, and optimization help
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[82%] text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user"
                ? "ml-auto bg-[#0e639c] text-white"
                : "bg-[#252526] text-[#d4d4d4] border border-[#333333]"
            }`}
          >
          <ReactMarkdown
              remarkPlugins={[remarkGfm]}  // READ FROM CHATGPT "AI Integration Ideas"
              components={{
                code({ inline, className, children }) {
                  const codeText = String(children).replace(/\n$/, "");

                  if (inline) {
                    return (
                      <code className="bg-[#1e1e1e] px-1 py-0.5 rounded text-[#dcdcaa]">
                        {children}
                      </code>
                    );
                  }

                  return (
                    <div className="my-3 rounded-lg overflow-hidden border border-[#3c3c3c] bg-[#0d1117]">
                      <div className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-[#3c3c3c]">
                        <span className="text-xs text-gray-400">Code</span>

                        <button
                          onClick={() => navigator.clipboard.writeText(codeText)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                        >
                          <Copy size={13} />
                          Copy
                        </button>
                      </div>

                      <pre className="p-3 overflow-x-auto text-sm text-gray-200">
                        <code>{codeText}</code>
                      </pre>
                    </div>
                  );
                },

                p({ children }) {
                  return <p className="mb-2 leading-relaxed">{children}</p>;
                },

                ul({ children }) {
                  return <ul className="list-disc ml-5 mb-2 space-y-1">{children}</ul>;
                },

                ol({ children }) {
                  return <ol className="list-decimal ml-5 mb-2 space-y-1">{children}</ol>;
                },

                h3({ children }) {
                  return <h3 className="text-base font-semibold mt-3 mb-2 text-white">{children}</h3>;
                },
              }}
              >
                {msg.text}
          </ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div className="bg-[#252526] border border-[#333333] text-[#858585] text-sm p-3 rounded-lg w-fit">
            BitMentor is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-4 border-t border-[#2d2d2d] pt-3">
        <Input
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Ask about this problem..."
          className="bg-[#252526] border-[#3c3c3c] text-[#d4d4d4] placeholder:text-[#858585] focus-visible:ring-[#007acc]"
        />

        <Button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          className="bg-[#0e639c] hover:bg-[#4692c4] text-white"
        >
          <Send size={16} />
        </Button>
      </div>
    </Card>
  );
}