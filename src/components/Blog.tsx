"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GlowingEffect } from "./ui/glowing-effect";


const ARTICLES = [
  {
    title: "Designing RecoverMate: AI Agents for WhatsApp Workflows",
    excerpt: "A deep dive into building an end-to-end AI system that automates invoice recovery for SMBs using Twilio and Gemini AI.",
    category: "System Design",
    readTime: "6 min read",
    color: "from-blue-500 to-cyan-500",
    content: `
      <p>Building an AI system for invoice recovery requires a robust architecture that can handle real-time communication, state management, and accurate intent recognition. In this article, I'll walk you through the design and implementation of RecoverMate, an AI agent built to automate payment collections via WhatsApp.</p>
      
      <h3>The Challenge</h3>
      <p>Small and Medium Businesses (SMBs) often struggle with cash flow due to delayed payments. Manual follow-ups are time-consuming and often ineffective. The goal was to create an automated system that could engage customers in a natural, conversational manner to recover outstanding invoices.</p>

      <h3>Architecture Overview</h3>
      <p>The system is built on a microservices architecture using Node.js and improved with Python for AI processing. Key components include:</p>
      <ul>
        <li><strong>WhatsApp Business API (via Twilio):</strong> For sending and receiving messages.</li>
        <li><strong>Gemini AI:</strong> The core intelligence engine for understanding user intent and generating context-aware responses.</li>
        <li><strong>Vector Database (Pinecone):</strong> To store and retrieve relevant context from payment history and previous interactions.</li>
      </ul>

      <h3>Handling Workflow State</h3>
      <p>One of the biggest challenges was managing the conversation state. We implemented a finite state machine (FSM) to track where each user was in the recovery process—whether they had promised to pay, disputed the invoice, or requested more time.</p>

      <h3>Results</h3>
      <p>RecoverMate successfully automated over 70% of initial follow-ups, reducing the manual workload for finance teams significantly while maintaining a respectful and professional tone with customers.</p>
    `
  },
  {
    title: "Using RAG for Intelligent Dispute Handling",
    excerpt: "How I leveraged Retrieval-Augmented Generation (RAG) with Pinecone to handle complex invoice disputes accurately and efficiently.",
    category: "AI Engineering",
    readTime: "8 min read",
    color: "from-purple-500 to-pink-500",
    content: `
      <p>Invoice disputes are complex. They often involve specific contract terms, previous agreements, or delivery issues. Standard LLMs often hallucinate or provide generic advice when faced with these specific scenarios. This is where Retrieval-Augmented Generation (RAG) shines.</p>

      <h3>Why RAG?</h3>
      <p>By using RAG, we can retrieve the specific invoice details, email history, and contract terms relevant to the customer's query before generating a response. This ensures accuracy and relevance.</p>

      <h3>Implementation Details</h3>
      <p>We used Pinecone as our vector database. Every invoice and communication log is embedded and stored. When a user raises a dispute, the system:</p>
      <ol>
        <li>Embeds the user's query.</li>
        <li>Queries Pinecone for the most relevant documents (e.g., the specific invoice, delivery proof).</li>
        <li>Feeds these documents as context to the LLM.</li>
        <li>Generates a factual response based <i>only</i> on the retrieved context.</li>
      </ol>

      <h3>Impact</h3>
      <p>This approach reduced dispute resolution time by 50% and significantly increased customer trust in the automated system.</p>
    `
  },
  {
    title: "Lessons from Building AI Systems in MERN",
    excerpt: "Architectural trade-offs and challenges faced while integrating heavy AI models into a MERN stack application.",
    category: "Architecture",
    readTime: "5 min read",
    color: "from-orange-500 to-red-500",
    content: `
      <p>The MERN stack (MongoDB, Express, React, Node.js) is a favorite for web development, but integrating heavy AI workflows introduces new challenges. Here are the key lessons I learned while building AI-native applications with MERN.</p>

      <h3>1. Async Processing is Non-Negotiable</h3>
      <p>AI model inference can be slow. Blocking the main Node.js event loop is a recipe for disaster. We offloaded all AI processing to a separate message queue (RabbitMQ) and worker service.</p>

      <h3>2. Streaming Responses</h3>
      <p>To improve UX, we implemented streaming responses for all AI interactions. This makes the application feel much faster, as the user sees the response being typed out in real-time, similar to ChatGPT.</p>

      <h3>3. State Management</h3>
      <p>With AI agents, the frontend state can get complex quickly. We used React Query and Context API to manage the conversation history and optimistic updates effectively.</p>

      <h3>Conclusion</h3>
      <p>While Python is often the go-to for AI, the JavaScript ecosystem is rapidly evolving. With the right architectural patterns, MERN is a powerful choice for building production-ready AI applications.</p>
    `
  },
];

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<typeof ARTICLES[0] | null>(null);

  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 px-4 md:px-12 overflow-hidden" id="blog">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-white mb-16 text-center tracking-tight"
        >
          Insights
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {ARTICLES.map((article, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedArticle(article)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative block h-full cursor-pointer rounded-[1.25rem] border-[0.75px] border-white/5 p-2 md:rounded-[1.5rem] md:p-3"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="relative h-full bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-white/5 transition-colors flex flex-col">
                {/* Header Gradient */}
                <div className={`h-2 bg-linear-to-r ${article.color}`} />

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-6 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center text-blue-400 font-bold text-sm group-hover:translate-x-2 transition-transform">
                    Read Article <span className="ml-2">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] overflow-y-auto"
          >
            {/* Close Button - Sticky or Fixed */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="fixed top-6 right-6 md:top-10 md:right-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110] backdrop-blur-md border border-white/5"
              aria-label="Close article"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="max-w-4xl mx-auto px-6 py-20 md:py-32 relative">
              {/* Header Gradient Line */}
              <div className={`fixed top-0 left-0 w-full h-1 bg-linear-to-r ${selectedArticle.color} z-[105]`} />

              {/* Content */}
              <div className="flex flex-wrap gap-4 items-center mb-8 text-sm">
                <span className="px-4 py-1.5 rounded-full bg-white/10 text-white font-medium border border-white/5">
                  {selectedArticle.category}
                </span>
                <span className="text-gray-400 font-mono">
                  {selectedArticle.readTime}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 leading-tight tracking-tight">
                {selectedArticle.title}
              </h1>

              <div
                className="prose prose-invert prose-lg md:prose-xl max-w-none text-gray-300 space-y-8"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              {/* Footer / Back to top feel */}
              <div className="mt-20 pt-10 border-t border-white/10 text-center">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  ← Back to Insights
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
