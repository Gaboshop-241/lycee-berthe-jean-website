"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Bot,
  CheckCheck,
  GraduationCap,
  MessageCircle,
  Minus,
  Send,
  ShieldCheck,
  Trash2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import type { ChatAction } from "@/app/chatbot-knowledge";
import type { Locale } from "@/app/i18n-config";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  actions?: ChatAction[];
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

type MessageContentPart =
  | {
      id: string;
      kind: "text";
      text: string;
    }
  | {
      href: string;
      id: string;
      isExternal: boolean;
      kind: "link";
      text: string;
    };

const STORAGE_KEY = "berthe-jean-chatbot-history-v1";
const NOTIFICATION_STORAGE_KEY = "berthe-jean-chatbot-notifications-v1";
const INVITATION_SHOWN_SESSION_KEY = "berthe-jean-chatbot-invitation-shown-v1";
const INVITATION_READ_SESSION_KEY = "berthe-jean-chatbot-invitation-read-v1";
const SOUND_PLAYED_SESSION_KEY = "berthe-jean-chatbot-sound-played-v1";
const SOUND_PREFERENCE_STORAGE_KEY = "berthe-jean-chatbot-sound-preference-v1";
const NOTIFICATION_SOUND_PATH = "/sounds/chatbot-notification.wav";
const INVITATION_DELAY_MS = 4_000;
const INVITATION_AUTO_DISMISS_MS = 9_000;
const MAX_INPUT_LENGTH = 700;
const REQUEST_TIMEOUT_MS = 25_000;

const chatbotCopy = {
  fr: {
    title: "Assistant Berthe & Jean",
    subtitle: "Bonjour ! Comment puis-je vous aider ?",
    welcome:
      "Bonjour 👋 Je suis l'assistant du Lycée Privé International Berthe & Jean. Comment puis-je vous aider ?",
    reduce: "Réduire le chatbot",
    reduceTitle: "Réduire",
    close: "Fermer le chatbot",
    closeTitle: "Fermer",
    conversation: "Conversation",
    typing: "Assistant en train d'écrire",
    typingSr: "Assistant en train d'écrire...",
    inputLabel: "Écrivez votre message",
    inputPlaceholder: "Écrivez votre message...",
    send: "Envoyer le message",
    footer: "Réponses fournies par le Lycée Privé International Berthe & Jean",
    clear: "Effacer",
    open: "Ouvrir l'assistant Berthe & Jean",
    invitationTitle: "Bonjour 👋",
    invitationBody:
      "Une question sur l'inscription, les horaires ou le lycée ? Je peux vous aider.",
    invitationOpen: "Ouvrir l'assistant du lycée",
    invitationDismiss: "Fermer cette notification",
    soundDisable: "Désactiver le son du chatbot",
    soundEnable: "Activer le son du chatbot",
    unread: "1 message non lu",
    error: "Désolé, une erreur est survenue. Veuillez réessayer dans un instant.",
    notificationGranted:
      "C'est noté. Les notifications sont activées sur ce navigateur. Le raccordement aux annonces automatiques du lycée pourra être ajouté ensuite.",
    notificationDenied:
      "Les notifications ne sont pas activées. Vous pouvez toujours consulter les informations importantes sur la page /actualites.",
    notificationUnsupported:
      "Ce navigateur ne permet pas les notifications web ici. Vous pouvez suivre les annonces sur la page /actualites.",
  },
  en: {
    title: "Berthe & Jean Assistant",
    subtitle: "Hello! How can I help you?",
    welcome:
      "Hello 👋 I am the assistant for Lycée Privé International Berthe & Jean. How can I help you?",
    reduce: "Minimize the chatbot",
    reduceTitle: "Minimize",
    close: "Close the chatbot",
    closeTitle: "Close",
    conversation: "Conversation",
    typing: "Assistant is typing",
    typingSr: "Assistant is typing...",
    inputLabel: "Write your message",
    inputPlaceholder: "Write your message...",
    send: "Send message",
    footer: "Answers provided by Lycée Privé International Berthe & Jean",
    clear: "Clear",
    open: "Open the Berthe & Jean assistant",
    invitationTitle: "Hello 👋",
    invitationBody: "Questions about admissions, schedules or the school? I can help.",
    invitationOpen: "Open the school assistant",
    invitationDismiss: "Close this notification",
    soundDisable: "Mute chatbot sounds",
    soundEnable: "Enable chatbot sounds",
    unread: "1 unread message",
    error: "Sorry, an error occurred. Please try again in a moment.",
    notificationGranted:
      "Done. Notifications are enabled on this browser. Automatic school announcements can be connected later.",
    notificationDenied:
      "Notifications are not enabled. You can still follow important updates on /actualites.",
    notificationUnsupported:
      "This browser does not support web notifications here. You can follow school updates on /actualites.",
  },
} as const;

function getStorageKey(locale: Locale) {
  return `${STORAGE_KEY}-${locale}`;
}

function hasSessionFlag(key: string) {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.sessionStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function setSessionFlag(key: string) {
  try {
    window.sessionStorage.setItem(key, "true");
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

function loadSoundPreference() {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    return window.localStorage.getItem(SOUND_PREFERENCE_STORAGE_KEY) !== "muted";
  } catch {
    return true;
  }
}

function loadUnreadInvitation() {
  return hasSessionFlag(INVITATION_SHOWN_SESSION_KEY) && !hasSessionFlag(INVITATION_READ_SESSION_KEY);
}

function createWelcomeMessage(locale: Locale): ChatMessage {
  return {
    id: "welcome",
    role: "assistant",
    content: chatbotCopy[locale].welcome,
    createdAt: Date.now(),
  };
}

function createMessage(role: ChatRole, content: string, actions: ChatAction[] = []): ChatMessage {
  return {
    actions: actions.length > 0 ? actions : undefined,
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    createdAt: Date.now(),
  };
}

function formatMessageTime(timestamp: number, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function isChatAction(value: unknown): value is ChatAction {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ChatAction>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.label === "string" &&
    ["internal", "external", "phone", "email", "notification"].includes(candidate.kind ?? "") &&
    (candidate.kind === "notification" || typeof candidate.href === "string") &&
    (candidate.href === undefined || typeof candidate.href === "string") &&
    (candidate.topic === undefined ||
      candidate.topic === "news" ||
      candidate.topic === "admissions" ||
      candidate.topic === "general")
  );
}

function sanitizeActions(value: unknown): ChatAction[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isChatAction).slice(0, 4);
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
    typeof candidate.createdAt === "number" &&
    (candidate.actions === undefined || sanitizeActions(candidate.actions).length === candidate.actions.length)
  );
}

function loadStoredMessages(locale: Locale): ChatMessage[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawHistory = window.localStorage.getItem(getStorageKey(locale));
    const parsed = rawHistory ? JSON.parse(rawHistory) : [];

    if (Array.isArray(parsed)) {
      return parsed.filter(isStoredMessage).slice(-30);
    }
  } catch {
    return [];
  }

  return [];
}

function getMessageContentParts(content: string): MessageContentPart[] {
  const linkPattern =
    /(https?:\/\/[^\s]+|\/(?:admissions|preinscription|programmes|vie-scolaire|actualites|contact)(?:#[a-z0-9-]+)?)/gi;
  const pieces = content.split(linkPattern);

  return pieces.flatMap((piece, index): MessageContentPart[] => {
    if (!piece) {
      return [];
    }

    if (piece.startsWith("http")) {
      return [{ href: piece, id: `${piece}-${index}`, isExternal: true, kind: "link", text: piece }];
    }

    if (piece.startsWith("/")) {
      return [{ href: piece, id: `${piece}-${index}`, isExternal: false, kind: "link", text: piece }];
    }

    return [{ id: `${piece}-${index}`, kind: "text", text: piece }];
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

export function Chatbot({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const copy = chatbotCopy[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [isInvitationVisible, setIsInvitationVisible] = useState(false);
  const [hasUnreadInvitation, setHasUnreadInvitation] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadStoredMessages(locale));
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const notificationAudioRef = useRef<HTMLAudioElement>(null);
  const soundAttemptedRef = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesViewportRef = useRef<HTMLDivElement>(null);
  const activeRequestRef = useRef<AbortController | null>(null);
  const previousPathnameRef = useRef(pathname);

  const playNotificationSound = useCallback((allowRetry = false) => {
    const audio = notificationAudioRef.current;

    if (!audio || hasSessionFlag(SOUND_PLAYED_SESSION_KEY)) {
      return;
    }

    if (soundAttemptedRef.current && !allowRetry) {
      return;
    }

    soundAttemptedRef.current = true;
    audio.currentTime = 0;
    audio.volume = 0.22;

    void audio
      .play()
      .then(() => setSessionFlag(SOUND_PLAYED_SESSION_KEY))
      .catch(() => {
        // Autoplay is commonly blocked until a user gesture. The visual cue remains sufficient.
      });
  }, []);

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setHasUnreadInvitation(loadUnreadInvitation());
      setIsSoundEnabled(loadSoundPreference());
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    if (hasSessionFlag(INVITATION_SHOWN_SESSION_KEY)) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (
        hasSessionFlag(INVITATION_SHOWN_SESSION_KEY) ||
        hasSessionFlag(INVITATION_READ_SESSION_KEY)
      ) {
        return;
      }

      setSessionFlag(INVITATION_SHOWN_SESSION_KEY);
      setHasUnreadInvitation(true);
      setIsInvitationVisible(true);
    }, INVITATION_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInvitationVisible) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsInvitationVisible(false);
    }, INVITATION_AUTO_DISMISS_MS);

    return () => window.clearTimeout(timer);
  }, [isInvitationVisible]);

  useEffect(() => {
    if (isInvitationVisible && isSoundEnabled) {
      playNotificationSound();
    }
  }, [isInvitationVisible, isSoundEnabled, playNotificationSound]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(getStorageKey(locale), JSON.stringify(messages.slice(-30)));
  }, [locale, messages]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      const viewport = messagesViewportRef.current;

      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isOpen, messages, isLoading]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;

    const animationFrame = window.requestAnimationFrame(() => {
      activeRequestRef.current?.abort();
      activeRequestRef.current = null;
      setIsLoading(false);
      setInput("");
      setIsOpen(false);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [pathname]);

  useEffect(() => {
    return () => {
      activeRequestRef.current?.abort();
    };
  }, []);

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
    setMessages((current) => (current.length > 0 ? current : [createWelcomeMessage(locale)]));
  }, [locale]);

  function markInvitationRead() {
    setSessionFlag(INVITATION_SHOWN_SESSION_KEY);
    setSessionFlag(INVITATION_READ_SESSION_KEY);
    setIsInvitationVisible(false);
    setHasUnreadInvitation(false);
  }

  function openChat() {
    markInvitationRead();
    setIsOpen(true);
    ensureWelcomeMessage();
  }

  function dismissInvitation() {
    setSessionFlag(INVITATION_SHOWN_SESSION_KEY);
    setIsInvitationVisible(false);
  }

  function toggleNotificationSound() {
    const nextSoundEnabled = !isSoundEnabled;

    setIsSoundEnabled(nextSoundEnabled);

    try {
      window.localStorage.setItem(
        SOUND_PREFERENCE_STORAGE_KEY,
        nextSoundEnabled ? "enabled" : "muted",
      );
    } catch {
      // The in-memory preference still works when local storage is unavailable.
    }

    if (nextSoundEnabled && isInvitationVisible) {
      playNotificationSound(true);
    }
  }

  function closeChat() {
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    setIsLoading(false);
    setIsOpen(false);
  }

  function minimizeChat() {
    setIsOpen(false);
  }

  function clearConversation() {
    const welcome = createWelcomeMessage(locale);
    setMessages([welcome]);
    window.localStorage.setItem(getStorageKey(locale), JSON.stringify([welcome]));
    inputRef.current?.focus();
  }

  async function sendMessage(rawContent: string) {
    const trimmed = rawContent.trim().slice(0, MAX_INPUT_LENGTH);

    if (!trimmed || isLoading) {
      return;
    }

    const baseMessages = messages.length > 0 ? messages : [createWelcomeMessage(locale)];
    const userMessage = createMessage("user", trimmed);
    const outgoingMessages = [...baseMessages, userMessage];

    setMessages(outgoingMessages);
    setInput("");
    setIsLoading(true);
    activeRequestRef.current?.abort();

    const requestController = new AbortController();
    activeRequestRef.current = requestController;
    let didTimeout = false;
    const timeoutId = window.setTimeout(() => {
      didTimeout = true;
      requestController.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale,
          messages: outgoingMessages.map(({ role, content }) => ({ role, content })),
        }),
        signal: requestController.signal,
      });

      const data = (await response.json().catch(() => ({}))) as {
        actions?: unknown;
        message?: string;
      };

      if (!response.ok || typeof data.message !== "string") {
        throw new Error("Chat request failed");
      }

      setMessages((current) => [
        ...current,
        createMessage("assistant", data.message ?? "", sanitizeActions(data.actions)),
      ]);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError" && !didTimeout) {
        return;
      }

      setMessages((current) => [
        ...current,
        createMessage("assistant", copy.error),
      ]);
    } finally {
      window.clearTimeout(timeoutId);
      if (activeRequestRef.current === requestController) {
        activeRequestRef.current = null;
        setIsLoading(false);
      }
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

  function handleInternalLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    setIsLoading(false);
    setInput("");
    setIsOpen(false);
    router.push(href);
  }

  function appendAssistantMessage(content: string) {
    setMessages((current) => [...current, createMessage("assistant", content)]);
  }

  async function requestChatNotifications(action: ChatAction) {
    if (typeof window === "undefined" || !("Notification" in window)) {
      appendAssistantMessage(copy.notificationUnsupported);
      return;
    }

    try {
      const permission =
        window.Notification.permission === "default"
          ? await window.Notification.requestPermission()
          : window.Notification.permission;

      if (permission !== "granted") {
        appendAssistantMessage(copy.notificationDenied);
        return;
      }

      window.localStorage.setItem(
        NOTIFICATION_STORAGE_KEY,
        JSON.stringify({
          enabledAt: new Date().toISOString(),
          locale,
          topic: action.topic ?? "general",
        }),
      );

      if (document.visibilityState === "visible") {
        new window.Notification(copy.title, {
          body: copy.notificationGranted,
          icon: "/assets/logo-berthe-jean.png",
        });
      }

      appendAssistantMessage(copy.notificationGranted);
    } catch {
      appendAssistantMessage(copy.notificationUnsupported);
    }
  }

  function handleActionClick(
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    action: ChatAction,
  ) {
    if (action.kind === "notification") {
      event.preventDefault();
      void requestChatNotifications(action);
      return;
    }

    if (action.kind === "internal" && action.href) {
      event.preventDefault();
      activeRequestRef.current?.abort();
      activeRequestRef.current = null;
      setIsLoading(false);
      setInput("");
      setIsOpen(false);
      router.push(action.href);
    }
  }

  return (
    <div className="chatbot-root" aria-live="polite">
      <audio
        className="chatbot-notification-audio"
        ref={notificationAudioRef}
        src={NOTIFICATION_SOUND_PATH}
        preload="auto"
        aria-hidden="true"
      />

      {!isOpen && isInvitationVisible ? (
        <aside className="chatbot-invitation" aria-label={copy.invitationOpen}>
          <button
            type="button"
            className="chatbot-invitation-main"
            onClick={openChat}
            aria-label={copy.invitationOpen}
          >
            <span className="chatbot-invitation-icon" aria-hidden="true">
              <Bot size={22} />
            </span>
            <span className="chatbot-invitation-copy" aria-live="polite" aria-atomic="true">
              <strong>{copy.invitationTitle}</strong>
              <span>{copy.invitationBody}</span>
            </span>
          </button>
          <div className="chatbot-invitation-actions">
            <button
              type="button"
              onClick={toggleNotificationSound}
              aria-label={isSoundEnabled ? copy.soundDisable : copy.soundEnable}
              title={isSoundEnabled ? copy.soundDisable : copy.soundEnable}
              aria-pressed={isSoundEnabled}
            >
              {isSoundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              type="button"
              onClick={dismissInvitation}
              aria-label={copy.invitationDismiss}
              title={copy.invitationDismiss}
            >
              <X size={16} />
            </button>
          </div>
        </aside>
      ) : null}

      {isOpen ? (
        <section className="chatbot-window" aria-label={copy.title}>
          <header className="chatbot-header">
            <AssistantAvatar />
            <div className="chatbot-heading">
              <h2>{copy.title}</h2>
              <p>{copy.subtitle}</p>
            </div>
            <div className="chatbot-header-actions">
              <button
                type="button"
                className="chatbot-icon-button"
                onClick={toggleNotificationSound}
                aria-label={isSoundEnabled ? copy.soundDisable : copy.soundEnable}
                title={isSoundEnabled ? copy.soundDisable : copy.soundEnable}
                aria-pressed={isSoundEnabled}
              >
                {isSoundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button
                type="button"
                className="chatbot-icon-button"
                onClick={minimizeChat}
                aria-label={copy.reduce}
                title={copy.reduceTitle}
              >
                <Minus size={20} />
              </button>
              <button
                type="button"
                className="chatbot-icon-button"
                onClick={closeChat}
                aria-label={copy.close}
                title={copy.closeTitle}
              >
                <X size={18} />
              </button>
            </div>
          </header>

          <div
            className="chatbot-messages"
            role="log"
            aria-label={copy.conversation}
            aria-busy={isLoading}
            ref={messagesViewportRef}
          >
            {messages.map((message) => (
              <article
                className={`chatbot-message ${message.role === "user" ? "from-user" : "from-assistant"}`}
                key={message.id}
              >
                {message.role === "assistant" ? <AssistantAvatar compact /> : null}
                <div className="chatbot-message-stack">
                  <div className="chatbot-bubble">
                    <div className="chatbot-bubble-content">
                      {getMessageContentParts(message.content).map((part) => {
                        if (part.kind === "link" && part.isExternal) {
                          return (
                            <a key={part.id} href={part.href} target="_blank" rel="noreferrer">
                              {part.text}
                            </a>
                          );
                        }

                        if (part.kind === "link") {
                          return (
                            <a
                              key={part.id}
                              href={part.href}
                              onClick={(event) => handleInternalLinkClick(event, part.href)}
                            >
                              {part.text}
                            </a>
                          );
                        }

                        return <span key={part.id}>{part.text}</span>;
                      })}
                    </div>
                    <span className="chatbot-message-meta">
                      {formatMessageTime(message.createdAt, locale)}
                      {message.role === "user" ? <CheckCheck size={14} aria-hidden="true" /> : null}
                    </span>
                  </div>
                  {message.role === "assistant" && message.actions?.length ? (
                    <div
                      className="chatbot-action-row"
                      aria-label={locale === "en" ? "Useful actions" : "Actions utiles"}
                    >
                      {message.actions.map((action) =>
                        action.kind === "notification" ? (
                          <button
                            type="button"
                            key={action.id}
                            onClick={(event) => handleActionClick(event, action)}
                          >
                            {action.label}
                          </button>
                        ) : (
                          <a
                            key={action.id}
                            href={action.href}
                            target={action.kind === "external" ? "_blank" : undefined}
                            rel={action.kind === "external" ? "noreferrer" : undefined}
                            onClick={(event) => handleActionClick(event, action)}
                          >
                            {action.label}
                          </a>
                        ),
                      )}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
            {isLoading ? (
              <article className="chatbot-message from-assistant">
                <AssistantAvatar compact />
                <div className="chatbot-bubble is-typing" aria-label={copy.typing}>
                  <span className="chatbot-typing-dot" aria-hidden="true" />
                  <span className="chatbot-typing-dot" aria-hidden="true" />
                  <span className="chatbot-typing-dot" aria-hidden="true" />
                  <span className="sr-only">{copy.typingSr}</span>
                </div>
              </article>
            ) : null}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <div className="chatbot-input-shell">
              <label htmlFor="chatbot-input" className="sr-only">
                {copy.inputLabel}
              </label>
              <textarea
                id="chatbot-input"
                ref={inputRef}
                value={input}
                maxLength={MAX_INPUT_LENGTH}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={copy.inputPlaceholder}
                rows={1}
              />
            </div>
            <button
              className="chatbot-send-button"
              type="submit"
              aria-label={copy.send}
              disabled={isLoading || input.trim().length === 0}
            >
              <Send size={19} />
            </button>
          </form>

          <footer className="chatbot-footer">
            <span>
              {copy.footer}
              <ShieldCheck size={15} aria-hidden="true" />
            </span>
            <button type="button" onClick={clearConversation}>
              <Trash2 size={14} aria-hidden="true" />
              {copy.clear}
            </button>
          </footer>
        </section>
      ) : null}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={isOpen ? closeChat : openChat}
        aria-label={
          isOpen ? copy.close : `${copy.open}${hasUnreadInvitation ? `. ${copy.unread}` : ""}`
        }
        aria-expanded={isOpen}
      >
        <MessageCircle className="chatbot-toggle-chat" size={32} aria-hidden="true" />
        <GraduationCap className="chatbot-toggle-cap" size={20} aria-hidden="true" />
        {hasUnreadInvitation ? (
          <span className="chatbot-unread-badge" aria-hidden="true">
            1
          </span>
        ) : null}
      </button>
    </div>
  );
}
