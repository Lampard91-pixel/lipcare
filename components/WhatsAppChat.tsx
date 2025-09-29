"use client";

import { motion } from "framer-motion";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      d="M19.11 4.91C17.15 2.95 14.68 1.92 12.04 1.92C6.48 1.92 2 6.4 2 11.96c0 1.79.46 3.48 1.28 4.99L2 22l5.17-1.35c1.44.78 3.06 1.21 4.78 1.21h.01c5.56 0 10.04-4.48 10.04-10.04c0-2.64-1.03-5.11-2.86-6.95zm-7.07 14.28c-1.55 0-3.03-.48-4.27-1.31l-.3-.18l-3.18.83l.85-3.1L4.7 17.5c-.88-1.28-1.4-2.8-1.4-4.42c0-4.6 3.73-8.33 8.33-8.33c2.28 0 4.4.88 5.98 2.46c1.58 1.58 2.46 3.7 2.46 5.98c0 4.6-3.73 8.33-8.33 8.33zm4.55-6.29c-.28-.14-1.64-.81-1.9-.9c-.26-.1-.45-.14-.64.14c-.19.28-.72.9-.88 1.08c-.16.18-.32.21-.59.07c-.27-.14-1.14-.42-2.17-1.34c-.81-.72-1.35-1.61-1.51-1.88c-.16-.27-.02-.42.12-.56c.13-.12.28-.32.42-.48c.14-.16.19-.28.28-.47c.1-.18.05-.35-.02-.49c-.07-.14-.64-1.55-.88-2.12c-.23-.57-.47-.49-.64-.5c-.17-.01-.36-.01-.55-.01c-.19 0-.5.07-.76.35c-.26.28-1 .98-1 2.4c0 1.42 1.02 2.78 1.17 2.96c.14.18 2 3.15 4.86 4.26c.68.27 1.22.43 1.64.56c.69.2 1.32.17 1.82.1c.56-.07 1.64-.67 1.87-1.32c.23-.65.23-1.2.16-1.32c-.07-.12-.26-.2-.53-.34z"
    />
  </svg>
);

export default function WhatsAppChat() {
  // Replace with your WhatsApp number
  const phoneNumber = "2340000000000";
  const message = "Hello! I have a question about Lipcrush products.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8" />
    </motion.a>
  );
}