/* eslint-disable react-hooks/exhaustive-deps */
import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Maximize2, Minimize2, RefreshCw, Send, X } from "lucide-react";

const ADK_API_URL =
  import.meta.env.VITE_ADK_API_URL ||
  "http://localhost:8000";

const ADK_APP_NAME = import.meta.env.VITE_ADK_APP_NAME || "portfolio_agent";

type MessageRole = "user" | "assistant" | "system";
type ChatViewMode = "floating" | "expanded";
interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
}

interface AdkPart {
  text?: string;
  functionCall?: unknown;
  functionResponse?: unknown;
}

interface AdkEvent {
  content?: {
    role?: string;
    parts?: AdkPart[];
  };
  partial?: boolean;
  author?: string;
  errorCode?: string;
  errorMessage?: string;
}

const createId = () => crypto.randomUUID();

const getOrCreateVisitorId = () => {
  const storageKey = "portfolio_adk_user_id";
  const existingId = localStorage.getItem(storageKey);

  if (existingId) {
    return existingId;
  }

  const visitorId = `visitor_${crypto.randomUUID()}`;
  localStorage.setItem(storageKey, visitorId);

  return visitorId;
};

const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-1 py-1">
    <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
    <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
    <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
  </div>
);

interface MarkdownMessageProps {
  text: string;
}

const MarkdownMessage = ({ text }: MarkdownMessageProps) => (
  <div className="min-w-0 text-xs leading-relaxed">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="mb-2 leading-relaxed last:mb-0">{children}</p>
        ),

        h1: ({ children }) => (
          <h1 className="mb-2 mt-3 text-base font-bold text-white first:mt-0">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mb-2 mt-3 text-sm font-bold text-white first:mt-0">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mb-1.5 mt-2.5 text-xs font-semibold text-blue-300 first:mt-0">
            {children}
          </h3>
        ),

        ul: ({ children }) => (
          <ul className="mb-2 ml-4 list-disc space-y-1 marker:text-blue-400 last:mb-0">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="mb-2 ml-4 list-decimal space-y-1 marker:text-blue-400 last:mb-0">
            {children}
          </ol>
        ),

        li: ({ children }) => (
          <li className="pl-1 leading-relaxed">{children}</li>
        ),

        strong: ({ children }) => (
          <strong className="font-semibold text-white">{children}</strong>
        ),

        em: ({ children }) => <em className="text-slate-300">{children}</em>,

        blockquote: ({ children }) => (
          <blockquote className="my-2 border-l-2 border-blue-400/60 pl-3 italic text-slate-300">
            {children}
          </blockquote>
        ),

        hr: () => <hr className="my-3 border-white/10" />,

        a: ({ href, children }) => (
          <a>
            {href}
            {children}
          </a>
        ),

        code: ({ className, children, ...props }) => {
          const isCodeBlock = Boolean(className);

          if (!isCodeBlock) {
            return (
              <code
                className="rounded bg-slate-950/80 px-1.5 py-0.5 font-mono text-[11px] text-cyan-300"
                {...props}
              >
                {children}
              </code>
            );
          }

          return (
            <code
              className={`${className ?? ""} font-mono text-[11px] text-slate-200`}
              {...props}
            >
              {children}
            </code>
          );
        },

        pre: ({ children }) => (
          <pre className="my-2 max-w-full overflow-x-auto rounded-xl border border-white/10 bg-slate-950/90 p-3">
            {children}
          </pre>
        ),

        table: ({ children }) => (
          <div className="my-2 max-w-full overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full border-collapse text-left text-[11px]">
              {children}
            </table>
          </div>
        ),

        thead: ({ children }) => (
          <thead className="bg-white/10 text-slate-200">{children}</thead>
        ),

        th: ({ children }) => (
          <th className="border-b border-white/10 px-2 py-1.5 font-semibold">
            {children}
          </th>
        ),

        td: ({ children }) => (
          <td className="border-b border-white/5 px-2 py-1.5 align-top">
            {children}
          </td>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  </div>
);

interface ChatBubbleProps {
  message?: ChatMessage;
  typing?: boolean;
}

const ChatBubble = ({ message, typing = false }: ChatBubbleProps) => {
  const isUser = message?.role === "user";
  const isSystem = message?.role === "system";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      } animate-slide-in`}
    >
      <div
        className={`
          max-w-[85%] break-words rounded-2xl
          px-4 py-2.5 text-xs font-medium leading-relaxed tracking-wide
          shadow-md backdrop-blur-md transition-all duration-300
          ${
            isUser
              ? "rounded-br-none border border-blue-500/30 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              : isSystem
                ? "rounded-bl-none border border-rose-500/20 bg-rose-500/10 text-rose-200"
                : "rounded-bl-none border border-white/5 bg-white/10 text-slate-200"
          }
        `}
      >
        {typing ? (
          <TypingIndicator />
        ) : (
          <MarkdownMessage text={message?.text ?? ""} />
        )}
      </div>
    </div>
  );
};

const extractTextFromEvent = (event: AdkEvent) => {
  if (event.content?.role !== "model") {
    return "";
  }

  return event.content.parts?.map((part) => part.text || "").join("") || "";
};

interface ChatPreviewModalProps {
  onClose: () => void;
}

const ChatPreviewModal = ({ onClose }: ChatPreviewModalProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: createId(),
      role: "assistant",
      text: "Hi! I’m Kunal’s portfolio assistant. Ask me about his skills, experience, or projects.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [isResponding, setIsResponding] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState("");

  const userIdRef = useRef("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  const [viewMode, setViewMode] = useState<ChatViewMode>("floating");

  const promptPool = [
    "What AI projects has Kuber worked on?",
    "What is Kuber's experience with Google ADK?",
    "Which Google Cloud services has Kuber used?",
    "Tell me about Kuber's agentic AI experience.",
    "What programming languages does Kuber use?",
    "Has Kuber worked with multi-agent systems?",
    "Tell me about Kuber's ADF-to-GCP migration work.",
    "What experience does Kuber have with BigQuery?",
    "What are Kuber's core technical skills?",
    "What kind of data pipeline work has Kuber done?",
  ];

  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);

  const selectRandomPrompts = () => {
    const shuffledPrompts = [...promptPool];

    for (
      let currentIndex = shuffledPrompts.length - 1;
      currentIndex > 0;
      currentIndex -= 1
    ) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

      [shuffledPrompts[currentIndex], shuffledPrompts[randomIndex]] = [
        shuffledPrompts[randomIndex],
        shuffledPrompts[currentIndex],
      ];
    }

    setSuggestedPrompts(shuffledPrompts.slice(0, 3));
  };

  useEffect(() => {
    selectRandomPrompts();
  }, []);

  useEffect(() => {
    const lastMessage = messages.at(-1);

    const hasCompletedAssistantResponse =
      !isResponding &&
      lastMessage?.role === "assistant" &&
      Boolean(lastMessage.text.trim());

    if (hasCompletedAssistantResponse) {
      selectRandomPrompts();
    }
  }, [isResponding, messages]);

  useEffect(() => {
    isMountedRef.current = true;
    userIdRef.current = getOrCreateVisitorId();

    const createSession = async () => {
      setIsInitializing(true);
      setConnectionError("");

      const newSessionId = `session_${crypto.randomUUID()}`;

      try {
        const response = await fetch(
          `${ADK_API_URL}/apps/${encodeURIComponent(
            ADK_APP_NAME,
          )}/users/${encodeURIComponent(
            userIdRef.current,
          )}/sessions/${encodeURIComponent(newSessionId)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              source: "portfolio_web",
            }),
          },
        );

        if (!response.ok) {
          const errorBody = await response.text();

          throw new Error(
            errorBody || `Could not create session. HTTP ${response.status}`,
          );
        }

        if (isMountedRef.current) {
          setSessionId(newSessionId);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to connect to the ADK API server.";

        if (isMountedRef.current) {
          setConnectionError(message);
        }
      } finally {
        if (isMountedRef.current) {
          setIsInitializing(false);
        }
      }
    };

    void createSession();

    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isResponding]);

  const updateAssistantMessage = (messageId: string, text: string) => {
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              text,
            }
          : message,
      ),
    );
  };

  const consumeSseEvent = (
    rawEvent: string,
    onEvent: (event: AdkEvent) => void,
  ) => {
    const data = rawEvent
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n")
      .trim();

    if (!data || data === "[DONE]") {
      return;
    }

    try {
      onEvent(JSON.parse(data) as AdkEvent);
    } catch {
      console.warn("Unable to parse ADK SSE event:", data);
    }
  };

  const sendMessage = async () => {
    const question = input.trim();

    if (!question || !sessionId || isResponding || isInitializing) {
      return;
    }

    setInput("");
    setConnectionError("");

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      text: question,
    };

    const assistantMessageId = createId();

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      {
        id: assistantMessageId,
        role: "assistant",
        text: "",
      },
    ]);

    setIsResponding(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    let accumulatedText = "";

    try {
      const response = await fetch(`${ADK_API_URL}/run_sse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        signal: abortController.signal,
        body: JSON.stringify({
          appName: ADK_APP_NAME,
          userId: userIdRef.current,
          sessionId,
          newMessage: {
            role: "user",
            parts: [
              {
                text: question,
              },
            ],
          },
          streaming: true,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();

        throw new Error(
          errorBody || `Agent request failed. HTTP ${response.status}`,
        );
      }

      if (!response.body) {
        throw new Error("The ADK server returned an empty stream.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";

      const handleAdkEvent = (event: AdkEvent) => {
        if (event.errorMessage) {
          throw new Error(event.errorMessage);
        }

        const eventText = extractTextFromEvent(event);

        if (!eventText) {
          return;
        }

        /*
         * For token-level streaming, ADK emits partial model text.
         * Append those chunks to the current assistant message.
         */
        if (event.partial === true) {
          accumulatedText += eventText;
        } else if (!accumulatedText.trim()) {
          accumulatedText = eventText;
        } else if (
          eventText.length >= accumulatedText.length &&
          eventText.includes(accumulatedText)
        ) {
          accumulatedText = eventText;
        } else if (!accumulatedText.includes(eventText)) {
          accumulatedText += eventText;
        }

        updateAssistantMessage(assistantMessageId, accumulatedText);
      };

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          buffer += decoder.decode();
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        const eventBlocks = buffer.split(/\r?\n\r?\n/);
        buffer = eventBlocks.pop() || "";

        eventBlocks.forEach((eventBlock) => {
          consumeSseEvent(eventBlock, handleAdkEvent);
        });
      }

      if (buffer.trim()) {
        consumeSseEvent(buffer, handleAdkEvent);
      }

      if (!accumulatedText.trim()) {
        updateAssistantMessage(
          assistantMessageId,
          "The agent completed the request but did not return a text response.",
        );
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting the assistant.";

      updateAssistantMessage(
        assistantMessageId,
        "I couldn’t complete that request. Please make sure the local ADK API server is running and try again.",
      );

      setConnectionError(errorMessage);
    } finally {
      if (isMountedRef.current) {
        setIsResponding(false);
      }

      abortControllerRef.current = null;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  const closeModal = () => {
    abortControllerRef.current?.abort();
    onClose();
  };

  const isReady = Boolean(sessionId) && !isInitializing && !connectionError;

  return (
    <div
      className={`
      fixed z-[10000] transition-all duration-300 ease-out

      ${
        viewMode === "expanded"
          ? `
            inset-0 flex items-center justify-center
            p-4 backdrop-blur-sm
          `
          : `
            bottom-5 right-5
            max-sm:inset-0 max-sm:p-0
          `
      }
    `}
    >
      {/* Expanded-mode background glow */}
      {viewMode === "expanded" && (
        <>
          <div
            className="
            pointer-events-none absolute
            h-[500px] w-[500px]
            rounded-full bg-blue-500/10
            blur-[120px]
          "
          />

          <div
            className="
            pointer-events-none absolute
            h-[300px] w-[300px]
            translate-x-20 translate-y-20
            rounded-full bg-indigo-500/10
            blur-[100px]
          "
          />
        </>
      )}

      {/* Chatbot card */}
      <section
        aria-label="Kuber's AI portfolio assistant"
        className={`
        relative flex flex-col overflow-hidden
        border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950
        shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]
        backdrop-blur-xl
        transition-all duration-300 ease-out

        ${
          viewMode === "expanded"
            ? `
              h-[min(760px,90vh)]
              w-[min(680px,94vw)]
              rounded-3xl p-5
            `
            : `
              h-[60vh]
              w-[420px]
              rounded-3xl p-5

              max-sm:h-full
              max-sm:w-full
              max-sm:rounded-none
            `
        }
      `}
      >
        {/* Top border illumination */}
        <div
          className="
          pointer-events-none absolute
          left-0 right-0 top-0 h-px
          bg-gradient-to-r
          from-transparent via-blue-500/50 to-transparent
        "
        />

        {/* Header */}
        <header className="mb-2 flex items-start gap-3 pr-24">
          {/* Connection indicator */}
          <div className="relative mt-1.5 flex h-3 w-3 shrink-0">
            {!connectionError && !isInitializing && (
              <span
                className="
                absolute inline-flex h-full w-full
                animate-ping rounded-full
                bg-emerald-400 opacity-75
              "
              />
            )}

            <span
              className={`
              relative inline-flex h-3 w-3 rounded-full

              ${
                connectionError
                  ? "bg-rose-500"
                  : isInitializing
                    ? "animate-pulse bg-amber-400"
                    : "bg-emerald-500"
              }
            `}
            />
          </div>

          {/* Assistant title */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                className={`bg-gradient-to-r
                from-white via-slate-200 to-slate-400
                bg-clip-text ${viewMode === "expanded" ? "text-lg" : "text-md"} font-bold
                tracking-tight text-transparent
                `}
              >
                Kuber's AI Assistant
              </h2>

              <span
                className="
                rounded-md border border-blue-500/20
                bg-blue-500/10 px-1.5 py-0.5
                font-mono text-xs font-medium text-blue-400
              "
              >
                Google ADK
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              {isInitializing
                ? "Connecting to the agent..."
                : connectionError
                  ? "The agent is currently unavailable."
                  : "Ask about Kuber's experience, skills, & projects."}
            </p>
          </div>
        </header>

        {/* Window controls */}
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setViewMode((currentMode) =>
                currentMode === "floating" ? "expanded" : "floating",
              )
            }
            aria-label={
              viewMode === "floating"
                ? "Expand assistant"
                : "Move assistant to compact view"
            }
            title={viewMode === "floating" ? "Expand" : "Compact view"}
            className="
            hidden cursor-pointer h-9 w-9 items-center justify-center
            rounded-full border border-white/5 bg-white/5
            text-white/50 transition-all duration-200
            hover:border-blue-500/20
            hover:bg-white/10 hover:text-white
            focus:outline-none focus:ring-2
            focus:ring-blue-500/30
            sm:flex
          "
          >
            {viewMode === "floating" ? (
              <Maximize2 size={17} />
            ) : (
              <Minimize2 size={17} />
            )}
          </button>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close portfolio assistant"
            title="Close"
            className="
            flex cursor-pointer h-9 w-9 items-center justify-center
            rounded-full border border-white/5 bg-white/5
            text-white/50 transition-all duration-200
            hover:border-rose-500/20
            hover:bg-rose-500/10 hover:text-rose-300
            focus:outline-none focus:ring-2
            focus:ring-rose-500/30
          "
          >
            <X size={18} />
          </button>
        </div>

        {/* Connection error */}
        {connectionError && (
          <div
            role="alert"
            className="
            mb-3 rounded-xl border border-rose-500/20
            bg-rose-500/10 px-3 py-2.5
            text-xs text-rose-200
          "
          >
            <p className="font-semibold">Could not connect to the ADK agent</p>

            <p className="mt-1 break-words leading-relaxed text-rose-300/80">
              {connectionError}
            </p>
          </div>
        )}

        {/* Message area */}
        <div
          ref={scrollContainerRef}
          className="
          min-h-0 flex-1 overflow-y-auto
          rounded-2xl border border-white/20
          bg-slate-950/60 p-4
          scroll-smooth
        "
        >
          <div className="flex min-h-full flex-col">
            {/* Messages */}
            <div className="flex flex-col gap-3.5">
              {messages.map((message) => {
                if (message.role === "assistant" && !message.text.trim()) {
                  return null;
                }

                return <ChatBubble key={message.id} message={message} />;
              })}
              {/* Typing indicator */}
              {isResponding &&
                messages.at(-1)?.role === "assistant" &&
                !messages.at(-1)?.text && <ChatBubble typing />}
            </div>

            {/* Suggested prompts */}
            {!isResponding &&
              !isInitializing &&
              !connectionError &&
              messages.at(-1)?.role === "assistant" &&
              Boolean(messages.at(-1)?.text.trim()) && (
                <div className="mt-auto pt-6">
                  <div className="mb-2.5 flex items-center justify-between">
                    <p
                      className="
                      text-[11px] font-semibold uppercase
                      tracking-[0.14em] text-slate-400
                    "
                    >
                      Try asking
                    </p>

                    <button
                      type="button"
                      onClick={selectRandomPrompts}
                      aria-label="Show different suggestions"
                      title="Show different suggestions"
                      className="
                      flex cursor-pointer items-center gap-1.5
                      rounded-lg px-2 py-1
                      text-[11px] text-slate-500
                      transition-colors
                      hover:bg-white/5 hover:text-blue-400
                    "
                    >
                      <RefreshCw size={12} />
                      Refresh
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        disabled={!isReady || isResponding}
                        onClick={() => {
                          setInput(prompt);
                        }}
                        className="
                        group cursor-pointer flex w-full items-center justify-between
                        gap-3 rounded-xl
                        border border-white/5 bg-white/[0.035]
                        px-3 py-2.5 text-left
                        text-xs leading-relaxed text-slate-400
                        transition-all duration-200
                        hover:translate-x-0.5
                        hover:border-blue-500/20
                        hover:bg-blue-500/[0.07]
                        hover:text-slate-200
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                      >
                        <span>{prompt}</span>

                        <span
                          className="
                          shrink-0 text-sm text-slate-600
                          transition-all duration-200
                          group-hover:translate-x-0.5
                          group-hover:text-blue-400
                        "
                        >
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Message form */}
        <form
          onSubmit={handleSubmit}
          className="group mt-2 relative overflow-hidden rounded-2xl p-[1.5px] transition-all duration-500 focus-within:scale-[1.01] focus-within:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
        >
          {/* Infinite Rotating AI Glow Layer */}
          <div className="absolute inset-[-200%] animate-spin [animation-duration:6s] bg-[conic-gradient(from_0deg,transparent_10%,#06b6d4_30%,#6366f1_50%,#d946ef_70%,transparent_90%)] opacity-40 group-focus-within:opacity-100 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

          {/* Inner Input Box Container */}
          <div className="relative flex items-end justify-between gap-2 rounded-[15px] bg-slate-950/90 py-1.5 pl-4 pr-2 backdrop-blur-3xl">
            {/* AI Icon Visual Anchor */}
            <div className="text-cyan-400 group-focus-within:animate-pulse mb-[10px] shrink-0">
              <svg
                xmlns="http://w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.096.813ZM18.281 9l-.531 3.313L14.438 13l3.312.531L18.28 17l.53-3.313L22.126 13l-3.313-.531L18.28 9Zm-11.5-6-.25 1.563L5 5l1.531.25L6.78 6.813 7.03 5.25 8.594 5l-1.563-.25L6.78 3Z"
                />
              </svg>
            </div>

            {/* Textarea Input Field */}
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={
                isInitializing
                  ? "Connecting to the agent..."
                  : connectionError
                    ? "The agent is unavailable"
                    : "Ask about Kuber..."
              }
              rows={1}
              maxLength={1000}
              disabled={!isReady || isResponding}
              aria-label="Message for Kuber's portfolio assistant"
              className="max-h-28 min-h-[38px] w-full resize-none bg-transparent px-2 py-2 text-sm leading-relaxed text-slate-100 placeholder-slate-500 outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />

            {/* Premium Action Button */}
            <button
              type="submit"
              aria-label="Send message"
              title="Send message"
              disabled={!input.trim() || !isReady || isResponding}
              className="flex cursor-pointer h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg transition-all active:scale-95 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:brightness-100 mb-[2px]"
            >
              {isResponding ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <Send size={15} />
              )}
            </button>
          </div>
        </form>

        {/* Input footer */}
        <div
          className="
          mt-1 flex items-center justify-between
          px-1 text-[10px] text-slate-500
        "
        >
          <span>Enter to send · Shift + Enter for newline</span>

          <span>{input.length}/1000</span>
        </div>
        <div className="mt-2 flex items-center justify-between px-1">
          <span className="text-[10px] text-slate-500">
            AI-generated answers may be incomplete
          </span>
        </div>
      </section>
    </div>
  );
};

export default ChatPreviewModal;
