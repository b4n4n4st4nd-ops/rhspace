"use client";

import { useState } from "react";
import {
  AgentLogsPanel,
  type AgentLog,
} from "@/components/lab/AgentLogsPanel";

interface Message {
  role: "user" | "assistant";
  content: string;
  logs?: AgentLog[];
}

export function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "I'm a clean-room retail inventory routing assistant. Ask about stock levels, rebalancing between distribution centers, or routing recommendations.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastLogs, setLastLogs] = useState<AgentLog[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Request failed");
      }

      const data = await res.json();
      setLastLogs(data.logs ?? []);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          logs: data.logs,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col rounded-xl border border-border bg-surface">
      <div
        className="flex max-h-96 flex-col gap-4 overflow-y-auto p-4"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
              msg.role === "user"
                ? "ml-auto bg-accent/15 text-foreground"
                : "bg-border/30 text-muted"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent"
              aria-hidden
            />
            Agent processing…
          </div>
        )}
      </div>

      {error && (
        <p className="border-t border-border px-4 py-2 text-sm text-accent-warm">
          {error}
        </p>
      )}

      <AgentLogsPanel logs={lastLogs} />

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-border p-4"
      >
        <label htmlFor="agent-input" className="sr-only">
          Message
        </label>
        <input
          id="agent-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Which DC should fulfill excess SKU-1042 demand?"
          disabled={loading}
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:border-accent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
