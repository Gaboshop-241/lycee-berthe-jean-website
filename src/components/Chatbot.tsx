"use client";

import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  MessageCircle,
  Minus,
  Send,
  Trash2,
  X,
} from "lucide-react";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

type QuickReply = {
  label: string;
  message: string;
};

const STORAGE_KEY = "berthe-jean-chatbot-history-v1";
const MAX_INPUT_LENGTH = 700;

const quickReplies: QuickReply[] = [
  {
    label: "Admissions",
    message: "Je veux des informations sur les admissions.",
  },
  {
    label: "Programmes",
    message: "Pouvez-vous me présenter les programmes du lycée ?",
  },
  {
    label: "Vie scolaire",
    message: "Quelles informations avez-vous sur la vie scolaire ?",
  },
  {
    label: "Contact",
    message: "Comment contacter le Lycée Privé International Berthe & Jean ?",
  },
  {
    label: "Actualités",
    message: "Où puis-je consulter les actualités du lycée ?",
  },
];

function createWelcomeMessage(): ChatMessage {
  return {
    id: "welcome",
    role: "assistant",
    content:
      "Bonjour 👋 Je suis l'assistant du Lycée Privé International Berthe & Jean. Comment puis-je vous aider ?",
    createdAt: Date.now(),
  };
}

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    createdAt: Date.now(),
  };
}

function isStoredMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ChatMessage>;

  return (
    typeof candidate.id === "string" &&
    (candidate.role === "assistant" || candidate.role === "user") &&
    typeof candidate.content === "string" &&
    typeof candidate.createdAt === "number"
  );
}

function loadStoredMessages(): ChatMessage[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawHistory = window.localStorage.getItem(STORAGE_KEY);
    const parsed = rawHistory ? JSON.parse(rawHistory) : [];

    if (Array.isArray(parsed)) {
      return parsed.filter(isStoredMessage).slice(-30);
    }
  } catch {
    return [];
  }

  return [];
}

function renderMessageContent(content: string) {
  const linkPattern =
    /(https?:\/\/[^\s]+|\/(?:admissions|preinscription|programmes|vie-scolaire|actualites|contact)(?:#[a-z0-9-]+)?)/gi;
  const pieces = content.split(linkPattern);

  return pieces.map((piece, index) => {
    if (!piece) {
      return null;
    }

    if (piece.startsWith("http")) {
      return (
        <a key={`${piece}-${index}`} href={piece} target="_blank" rel="noreferrer">
          {piece}
        </a>
      );
    }

    if (piece.startsWith("/")) {
      return (
        <a key={`${piece}-${index}`} href={piece}>
          {piece}
        </a>
      );
    }

    return <span key={`${piece}-${index}`}>{piece}</span>;
  });
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadStoredMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isOpen, messages, isLoading]);

  useEffect(() => {
    if (!isOpen || isLoading) {
      return;
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 160);

    return () => window.clearTimeout(timer);
  }, [isLoading, isOpen]);

  const ensureWelcomeMessage = useCallback(() => {
    setMessages((current) => (current.length > 0 ? current : [createWelcomeMessage()]));
  }, []);

  function openChat() {
    setIsOpen(true);
    ensureWelcomeMessage();
  }

  function closeChat() {
    setIsOpen(false);
  }

  function clearConversation() {
    const welcome = createWelcomeMessage();
    setMessages([welcome]);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([welcome]));
    inputRef.current?.focus();
  }

  async function sendMessage(rawContent: string) {
    const trimmed = rawContent.trim().slice(0, MAX_INPUT_LENGTH);

    if (!trimmed || isLoading) {
      return;
    }

    const baseMessages = messages.length > 0 ? messages : [createWelcomeMessage()];
    const userMessage = createMessage("user", trimmed);
    const outgoingMessages = [...baseMessages, userMessage];

    setMessages(outgoingMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: outgoingMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok || typeof data.message !== "string") {
        throw new Error("Chat request failed");
      }

      setMessages((current) => [...current, createMessage("assistant", data.message ?? "")]);
    } catch {
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "Désolé, une erreur est survenue. Veuillez réessayer dans un instant.",
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  return (
    <div className="chatbot-root" aria-live="polite">
      {isOpen ? (
        <section className="chatbot-window" aria-label="Assistant Berthe & Jean">
          <header className="chatbot-header">
            <div className="chatbot-avatar" aria-hidden="true">
              <Bot size={24} />
            </div>
            <div className="chatbot-heading">
              <h2>Assistant Berthe & Jean</h2>
              <p>
                <span aria-hidden="true" />
                En ligne
              </p>
            </div>
            <div className="chatbot-header-actions">
              <button
                type="button"
                className="chatbot-icon-button"
                onClick={clearConversation}
                aria-label="Effacer la conversation"
                title="Effacer la conversation"
              >
                <Trash2 size={18} />
              </button>
              <button
                type="button"
                className="chatbot-icon-button"
                onClick={closeChat}
                aria-label="Réduire le chatbot"
                title="Réduire"
              >
                <Minus size={19} />
              </button>
              <button
                type="button"
                className="chatbot-icon-button"
                onClick={closeChat}
                aria-label="Fermer le chatbot"
                title="Fermer"
              >
                <X size={19} />
              </button>
            </div>
          </header>

          <div className="chatbot-messages" role="log" aria-label="Conversation">
            {messages.map((message) => (
              <article
                className={`chatbot-message ${message.role === "user" ? "from-user" : "from-assistant"}`}
                key={message.id}
              >
                {message.role === "assistant" ? (
                  <span className="chatbot-message-avatar" aria-hidden="true">
                    <Bot size={17} />
                  </span>
                ) : null}
                <div className="chatbot-bubble">{renderMessageContent(message.content)}</div>
              </article>
            ))}
            {isLoading ? (
              <article className="chatbot-message from-assistant">
                <span className="chatbot-message-avatar" aria-hidden="true">
                  <Bot size={17} />
                </span>
                <div className="chatbot-bubble is-typing">
                  Assistant en train d&apos;écrire...
                </div>
              </article>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-zone">
            <div className="chatbot-quick-replies" aria-label="Réponses rapides">
              {quickReplies.map((reply) => (
                <button
                  type="button"
                  key={reply.label}
                  onClick={() => void sendMessage(reply.message)}
                  disabled={isLoading}
                >
                  {reply.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="chatbot-clear-text"
              onClick={clearConversation}
            >
              Effacer la conversation
            </button>
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <label htmlFor="chatbot-input" className="sr-only">
              Écrivez votre message
            </label>
            <textarea
              id="chatbot-input"
              ref={inputRef}
              value={input}
              maxLength={MAX_INPUT_LENGTH}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Écrivez votre message..."
              rows={1}
              disabled={isLoading}
            />
            <button
              type="submit"
              aria-label="Envoyer le message"
              disabled={isLoading || input.trim().length === 0}
            >
              <Send size={19} />
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={openChat}
        aria-label="Ouvrir l'assistant Berthe & Jean"
        aria-expanded={isOpen}
      >
        <MessageCircle size={28} />
        <span aria-hidden="true" />
      </button>
    </div>
  );
}
