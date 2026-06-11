import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am the Jarurat Care Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_AI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192', // Typical Groq model
          messages: [
            {
              role: 'system',
              content: `You are a warm, helpful assistant for Jarurat Care Foundation, a healthcare NGO in India.
Help users with: patient registration, volunteer sign-up, available services, 
health FAQs, and government health schemes. Be concise (max 3 sentences).
Always recommend consulting a real doctor for medical advice.`
            },
            ...newMessages
          ]
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setMessages([...newMessages, { role: 'assistant', content: data.choices[0].message.content }]);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', content: "I'm having trouble connecting. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickReplies = [
    "How do I register?",
    "How can I volunteer?",
    "What services do you offer?",
    "Contact a doctor"
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-secondary text-white shadow-medium flex items-center justify-center hover:scale-105 transition-transform ${isOpen ? 'hidden' : 'block'}`}
      >
        <div className="pulse-ring absolute inset-0 rounded-full border-secondary border-2"></div>
        <MessageCircle size={28} className="relative z-10" />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] h-[520px] bg-white rounded-[30px] shadow-medium flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-primary text-white px-5 py-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold flex items-center gap-2">🤖 Jarurat Care Assistant</h3>
              <p className="text-xs text-white/80">Online · Replies instantly</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-bgLight space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-secondary text-white rounded-[20px] rounded-br-sm' 
                    : 'bg-white text-textPrimary rounded-[20px] rounded-bl-sm shadow-soft'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {/* Quick Replies (show if only 1 message) */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(reply)}
                    className="border border-secondary text-secondary rounded-full px-3 py-1 text-xs hover:bg-secondary hover:text-white transition-colors bg-white"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-[20px] rounded-bl-sm shadow-soft flex gap-1 items-center">
                  <div className="w-2 h-2 bg-textMuted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-textMuted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-textMuted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border bg-white p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-bgLight border border-border rounded-full px-4 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center disabled:opacity-50 hover:bg-secondary/90 transition-colors"
              >
                <Send size={16} className="ml-1" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
