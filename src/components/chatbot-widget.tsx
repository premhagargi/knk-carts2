"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Loader2 } from 'lucide-react'
import { answerWebsiteContent } from '@/ai/flows/ai-chatbot-for-website-content'

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "I am the VCR AI Assistant. How can I help you explore our specialized motorsport design solutions today?" }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [websiteContent, setWebsiteContent] = useState("")

  useEffect(() => {
    // Capture some site content for context
    const content = document.body.innerText.substring(0, 5000)
    setWebsiteContent(content)
  }, [])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMsg = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setIsLoading(true)

    try {
      const response = await answerWebsiteContent({
        userQuestion: userMsg,
        websiteContent: websiteContent
      })
      
      setMessages(prev => [...prev, { role: 'ai', content: response.answer }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble processing your vision. Please try again or reach out to VCR directly." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] bg-black border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            <div className="p-6 bg-primary flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-white">VCR AI ASSISTANT</span>
              <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-white" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 text-[10px] uppercase tracking-widest font-bold leading-relaxed ${
                    msg.role === 'user' ? 'bg-primary text-white' : 'bg-white/5 text-white/80 border border-white/10'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="ASK ABOUT VCR DESIGN..."
                className="bg-transparent text-[10px] font-bold uppercase tracking-widest p-4 w-full outline-none border border-white/10 focus:border-primary transition-colors"
              />
              <button 
                onClick={handleSend}
                className="bg-primary p-4 hover:bg-white hover:text-black transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary flex items-center justify-center text-white shadow-xl hover:bg-white hover:text-black transition-all"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </div>
  )
}
