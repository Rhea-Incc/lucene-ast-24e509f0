import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/lyra-chat`;

const LyraChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi, I'm **Lyra** — Lucen's AI assistant. Tell me about your project and I'll suggest how we can help. ✨\n\nNeed to talk to a human? [Contact us](/contact) anytime." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const streamChat = useCallback(async (allMessages: Msg[]) => {
    setLoading(true);
    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Request failed" }));
        setMessages((prev) => [...prev, { role: "assistant", content: err.error || "Something went wrong. Please try again." }]);
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              const snap = assistantSoFar;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > 1 && last.content !== messages[0]?.content) {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: snap } : m));
                }
                return [...prev, { role: "assistant", content: snap }];
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (err) {
      console.error("Lyra stream error:", err);
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    await streamChat(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
      setOpen(false);
    } else if (href.startsWith("tel:") || href.startsWith("https://wa.me")) {
      window.open(href, "_blank");
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <>
      {/* Floating toggle button — always visible */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[hsl(var(--surface-glass-border))] bg-[hsl(var(--surface-glass))] backdrop-blur-[var(--glass-blur)] shadow-[0_0_30px_hsl(var(--glow-primary)/0.15),0_0_60px_hsl(var(--glow-accent)/0.08)] transition-shadow duration-500 hover:shadow-[0_0_40px_hsl(var(--glow-primary)/0.3),0_0_80px_hsl(var(--glow-accent)/0.15)]"
        aria-label={open ? "Close Lyra chatbot" : "Open Lyra chatbot"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="h-5 w-5 text-[hsl(var(--glow-primary))]" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Sparkles className="h-6 w-6 text-[hsl(var(--glow-primary))]" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[hsl(var(--surface-glass-border))] bg-[hsl(var(--surface-glass)/0.85)] backdrop-blur-[var(--glass-blur)] shadow-[0_0_60px_hsl(var(--glow-primary)/0.1),0_8px_32px_rgba(0,0,0,0.4)]"
            style={{ height: "min(520px, calc(100vh - 7rem))" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[hsl(var(--surface-glass-border))] px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--glow-primary)/0.3)] bg-[hsl(var(--glow-primary)/0.08)]">
                  <Sparkles className="h-4 w-4 text-[hsl(var(--glow-primary))]" />
                </div>
                <div>
                  <p className="font-display text-sm font-medium text-foreground tracking-wide">Lyra</p>
                  <p className="font-body text-[10px] text-muted-foreground tracking-wider">LUCEN AI ASSISTANT</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 font-body text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[hsl(var(--glow-primary)/0.15)] text-foreground rounded-br-sm"
                        : "bg-[hsl(var(--muted)/0.5)] text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <ReactMarkdown
                        components={{
                          a: ({ href, children }) => (
                            <button
                              onClick={() => href && handleLinkClick(href)}
                              className="text-[hsl(var(--glow-primary))] underline underline-offset-2 hover:text-[hsl(var(--glow-accent))] transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
                            >
                              {children}
                            </button>
                          ),
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>,
                          ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>,
                          li: ({ children }) => <li className="text-[13px]">{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold text-[hsl(var(--glow-primary))]">{children}</strong>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-xl bg-[hsl(var(--muted)/0.5)] px-4 py-3 rounded-bl-sm">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--glow-primary))]" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--glow-primary))]" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--glow-primary))]" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-[hsl(var(--surface-glass-border))] px-3 py-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Lyra anything..."
                  rows={1}
                  className="flex-1 resize-none rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.5)] px-3 py-2 font-body text-[13px] text-foreground placeholder:text-muted-foreground focus:border-[hsl(var(--glow-primary)/0.4)] focus:outline-none"
                  style={{ maxHeight: "80px" }}
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[hsl(var(--glow-primary)/0.3)] bg-[hsl(var(--glow-primary)/0.1)] text-[hsl(var(--glow-primary))] transition-all hover:bg-[hsl(var(--glow-primary)/0.2)] disabled:opacity-30"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LyraChat;
