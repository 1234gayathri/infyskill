'use client';

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';

type ChatRole = 'user' | 'model';

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const fallbackReply = 'I am thinking about that. Please try again in a moment.';

export default function ChatbotWidget() {
  const initialMessages = useMemo<ChatMessage[]>(
    () => [
      {
        id: 'welcome',
        role: 'model',
        content: 'Hi there! I am your InfySkill assistant powered by Gemini. Ask me anything about courses, career guidance, or tools.',
      },
    ],
    []
  );

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const toggleWidget = () => {
    setIsOpen(prev => !prev);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = [...messages, userMessage].map(item => ({ role: item.role, content: item.content }));
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (response.status === 401) {
        setMessages(prev => [
          ...prev,
          {
            id: `auth-${Date.now()}`,
            role: 'model',
            content: 'Please login to continue the conversation.',
          },
        ]);
        return;
      }

      const data = await response.json();
      const replyText = typeof data?.reply === 'string' && data.reply.trim().length > 0 ? data.reply.trim() : fallbackReply;

      setMessages(prev => [
        ...prev,
        {
          id: `model-${Date.now()}`,
          role: 'model',
          content: replyText,
        },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'model',
          content: fallbackReply,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const form = event.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <>
      <button
        type="button"
        className={`chatbot-toggle ${isOpen ? 'chatbot-toggle-open' : ''}`}
        onClick={toggleWidget}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        <div className="robot-face">
          <div className="robot-head">
            <div className="robot-antenna"></div>
            <div className="robot-eyes">
              <div className="robot-eye left"></div>
              <div className="robot-eye right"></div>
            </div>
            <div className="robot-mouth"></div>
          </div>
        </div>
      </button>

      <div className={`chatbot-panel ${isOpen ? 'chatbot-panel-open' : ''}`} role="dialog" aria-modal="false">
        <div className="chatbot-header">
          <div>
            <p className="chatbot-title">InfySkill Assistant</p>
            <p className="chatbot-subtitle">Ask anything about your learning journey</p>
          </div>
          <button type="button" className="chatbot-close" onClick={toggleWidget} aria-label="Close chatbot">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map(message => (
            <div key={message.id} className={`chatbot-message ${message.role === 'user' ? 'chatbot-message-user' : 'chatbot-message-bot'}`}>
              <p>{message.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-message chatbot-message-bot">
              <p>Gemini is typing...</p>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form className="chatbot-input" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={event => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={3}
            disabled={isLoading}
          />
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </>
  );
}
