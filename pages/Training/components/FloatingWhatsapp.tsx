import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsapp: React.FC = () => {
  return (
    <a 
      href="#" 
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute right-full mr-3 bg-white text-slate-900 text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
        Chat with us
      </span>
    </a>
  );
};

export default FloatingWhatsapp;