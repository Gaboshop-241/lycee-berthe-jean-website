"use client";

import Image from "next/image";
import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CheckCheck,
  Clock3,
  GraduationCap,
  MessageCircle,
  Minus,
  Paperclip,
  Phone,
  Send,
  ShieldCheck,
  Trash2,
  UserRound,
  UsersRound,
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
  icon: LucideIcon;
};

const STORAGE_KEY = "berthe-jean-chatbot-history-v1";
const MAX_INPUT_LENGTH = 700;

const quickReplies: QuickReply[] = [
  {
    label: "Admissions",
    message: "Je veux des informations sur les admissions.",
    icon: UserRound,
  },
  {
    label: "Horaires",
    message: "Quels sont les horaires du Lycée Privé International Berthe & Jean ?",
    icon: Clock3,
  },
  {
    label: "Vie scolaire",
    message: "Quelles informations avez-vous sur la vie scolaire ?",
    icon: UsersRound,
  },
  {
    label: "Contact",
    message: "Comment contacter le Lycée Privé International Berthe & Jean ?",
    icon: Phone,
  },
  {
    label: "Programmes",
    message: "Pouvez-vous me présenter les programmes du lycée ?",
    icon: BookOpen,
  },
];

const suggestedReplies: QuickReply[] = [
  {
    label: "Quels sont les documents à fournir ?",
    message: "Quels sont les documents à fournir pour une inscription ?",
    icon: BookOpen,
  },
  {
    label: "Y a-t-il des frais d'inscription ?",
    message: "Y a-t-il des frais d'inscription au lycée ?",
    icon: GraduationCap,
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

function formatMessageTime(timestamp: number) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
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

function AssistantAvatar({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "chatbot-message-avatar" : "chatbot-avatar"} aria-hidden="true">
      <Image
        src="/assets/logo-berthe-jean.png"
        alt=""
        width={compact ? 30 : 48}
        height={compact ? 30 : 48}
        sizes={compact ? "30px" : "48px"}
      />
    </span>
  );
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
            <AssistantAvatar />
            <div className="chatbot-heading">
              <h2>Assistant Berthe & Jean</h2>
              <p>Bonjour ! Comment puis-je vous aider ?</p>
            </div>
            <div className="chatbot-header-actions">
              <button
                type="button"
                className="chatbot-icon-button"
                onClick={closeChat}
                aria-label="Réduire le chatbot"
                title="Réduire"
              >
                <Minus size={20} />
              </button>
              <button
                type="button"
                className="chatbot-icon-button"
                onClick={closeChat}
                aria-label="Fermer le chatbot"
                title="Fermer"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          <div className="chatbot-quick-zone">
            <div className="chatbot-quick-replies" aria-label="Réponses rapides">
              {quickReplies.map((reply) => {
                const Icon = reply.icon;

                return (
                  <button
                    type="button"
                    key={reply.label}
                    onClick={() => void sendMessage(reply.message)}
                    disabled={isLoading}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {reply.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="chatbot-messages" role="log" aria-label="Conversation">
            {messages.map((message) => (
              <article
                className={`chatbot-message ${message.role === "user" ? "from-user" : "from-assistant"}`}
                key={message.id}
              >
                {message.role === "assistant" ? <AssistantAvatar compact /> : null}
                <div className="chatbot-bubble">
                  <div className="chatbot-bubble-content">{renderMessageContent(message.content)}</div>
                  <span className="chatbot-message-meta">
                    {formatMessageTime(message.createdAt)}
                    {message.role === "user" ? <CheckCheck size={14} aria-hidden="true" /> : null}
                  </span>
                </div>
              </article>
            ))}
            {isLoading ? (
              <article className="chatbot-message from-assistant">
                <AssistantAvatar compact />
                <div className="chatbot-bubble is-typing">Assistant en train d&apos;écrire...</div>
              </article>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-suggestion-row" aria-label="Suggestions">
            {suggestedReplies.map((reply) => (
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

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <div className="chatbot-input-shell">
              <button
                type="button"
                className="chatbot-attach-button"
                aria-label="Pièce jointe indisponible"
                title="Pièce jointe"
                disabled
              >
                <Paperclip size={18} />
              </button>
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
            </div>
            <button
              className="chatbot-send-button"
              type="submit"
              aria-label="Envoyer le message"
              disabled={isLoading || input.trim().length === 0}
            >
              <Send size={19} />
            </button>
          </form>

          <footer className="chatbot-footer">
            <span>
              Réponses fournies par le Lycée Privé International Berthe & Jean
              <ShieldCheck size={15} aria-hidden="true" />
            </span>
            <button type="button" onClick={clearConversation}>
              <Trash2 size={14} aria-hidden="true" />
              Effacer
            </button>
          </footer>
        </section>
      ) : null}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={openChat}
        aria-label="Ouvrir l'assistant Berthe & Jean"
        aria-expanded={isOpen}
      >
        <MessageCircle className="chatbot-toggle-chat" size={32} aria-hidden="true" />
        <GraduationCap className="chatbot-toggle-cap" size={20} aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </div>
  );
}
