"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What ingredients do you use in your products?",
    answer: "We pride ourselves on using high-quality, natural, and ethically-sourced ingredients. Our key ingredients include Shea Butter, Jojoba Oil, and Vitamin E. All our products are cruelty-free and formulated without parabens or sulfates."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within Nigeria. We are working on expanding our shipping to other countries in the near future. Stay tuned for updates!"
  },
  {
    question: "What is your return policy?",
    answer: "Due to the nature of our products, we do not accept returns for hygiene reasons. However, if your product arrives damaged, please contact us within 48 hours of delivery with a photo of the damage, and we will be happy to assist you."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has shipped, you will receive an email with a tracking number and a link to track your package. You can also log into your account on our website to view your order status."
  }
];

const FaqItem = ({ faq, isOpen, onClick }: { faq: typeof faqs[0], isOpen: boolean, onClick: () => void }) => (
  <div className="border-b border-gray-200 py-4">
    <button onClick={onClick} className="w-full flex justify-between items-center text-left text-lg font-medium text-cyan-900">
      <span>{faq.question}</span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
        <ChevronDown size={20} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden text-gray-600"
        >
          {faq.answer}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-900" style={{ fontFamily: 'var(--font-playfair)' }}>
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We d love to hear from you! Whether you have a question, feedback, or just want to say hello.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-md border"
          >
            <h2 className="text-xl font-semibold text-cyan-900 mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-900 focus:border-cyan-900" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-900 focus:border-cyan-900" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-900 focus:border-cyan-900"></textarea>
              </div>
              <button type="submit" className="w-full py-2.5 px-4 bg-cyan-900 text-white font-semibold rounded-lg hover:bg-cyan-800 transition">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center"><Mail size={20} /></div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-900">Email</h3>
                <a href="mailto:adetura2017@gmail.com" className="text-gray-600 hover:text-cyan-800 transition-colors">adetura2017@gmail.com</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center"><Phone size={20} /></div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-900">Phone</h3>
                <p className="text-gray-600">
                  <a href="https://wa.me/23480555973027" target="_blank" rel="noopener noreferrer" className="block hover:text-cyan-800 transition-colors">080555973027</a>
                  <a href="https://wa.me/2349137017238" target="_blank" rel="noopener noreferrer" className="block hover:text-cyan-800 transition-colors">09137017238</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-cyan-900 mb-10" style={{ fontFamily: 'var(--font-playfair)' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} isOpen={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
