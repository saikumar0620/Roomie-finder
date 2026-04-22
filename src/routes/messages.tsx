import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, MoreHorizontal, Search } from "lucide-react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/shared/Navbar";
import { mockConversations, findUser, type MockMessage } from "@/lib/mock-data";

export const Route = createFileRoute("/messages")({
  head: () => ({ meta: [{ title: "Messages — RoomieMatch" }] }),
  component: MessagesPage,
});

function MessagesPage() {
  const [activeId, setActiveId] = useState(mockConversations[0].id);
  const active = mockConversations.find((c) => c.id === activeId)!;
  const user = findUser(active.userId)!;
  const [messages, setMessages] = useState<MockMessage[]>(active.messages);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMessages(active.messages); }, [active]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    setMessages([...messages, { id: String(Date.now()), fromMe: true, text, time: "now" }]);
    setText("");
  };

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto h-[calc(100vh-9rem)] md:h-[calc(100vh-7rem)] grid md:grid-cols-[320px_1fr] border border-border md:rounded-3xl overflow-hidden md:m-4">
        <aside className="border-r border-border bg-card overflow-y-auto">
          <div className="p-4 sticky top-0 bg-card border-b border-border">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input className="w-full h-10 pl-9 pr-4 rounded-xl bg-muted border-none outline-none text-sm" placeholder="Search conversations" />
            </div>
          </div>
          {mockConversations.map((c) => {
            const u = findUser(c.userId)!;
            const sel = c.id === activeId;
            return (
              <button key={c.id} onClick={() => setActiveId(c.id)} className={`w-full text-left flex gap-3 p-4 transition-colors border-l-2 ${sel ? "bg-muted border-primary" : "border-transparent hover:bg-muted/60"}`}>
                <div className="relative shrink-0">
                  <img src={u.avatar} className="w-12 h-12 rounded-full" alt="" />
                  {u.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <p className={`truncate ${c.unread > 0 ? "font-semibold" : "font-medium"}`}>{u.name}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{c.time}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                    {c.unread > 0 && <span className="shrink-0 w-5 h-5 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-pulse-glow">{c.unread}</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </aside>

        <section className="flex flex-col bg-background">
          <header className="px-5 py-3 border-b border-border flex items-center gap-3 bg-card">
            <img src={user.avatar} className="w-10 h-10 rounded-full" alt="" />
            <div className="flex-1">
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-emerald-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Online</p>
            </div>
            <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center"><MoreHorizontal className="w-4 h-4" /></button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-3">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: m.fromMe ? 8 : -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[70%] px-4 py-2.5 text-sm ${m.fromMe ? "gradient-primary text-primary-foreground rounded-2xl rounded-tr-sm" : "bg-muted rounded-2xl rounded-tl-sm"}`}>
                  {m.text}
                  <p className={`text-[10px] mt-1 ${m.fromMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-3 border-t border-border bg-card">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background p-1.5 focus-within:border-primary focus-within:shadow-glow transition-all">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-transparent outline-none text-sm"
              />
              <button onClick={send} disabled={!text.trim()} className="w-9 h-9 rounded-full gradient-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 active:scale-90 transition-all">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}