import React from 'react';
import { ContactMessage } from '../../types';
import { Mail, Clock, User } from 'lucide-react';

interface ContactManagerProps {
  messages: ContactMessage[];
}

const ContactManager: React.FC<ContactManagerProps> = ({ messages }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-bold">Messages</h2>
           <p className="text-zinc-500 mt-1">Inquiries received from the contact form.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500">
                      <User className="w-5 h-5" />
                   </div>
                   <div>
                      <h3 className="font-bold text-zinc-900">{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className="text-sm text-zinc-500 hover:text-zinc-900 hover:underline flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {msg.email}
                      </a>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-wider">
                   <Clock className="w-3 h-3" />
                   {new Date(msg.created_at).toLocaleDateString()} • {new Date(msg.created_at).toLocaleTimeString()}
                </div>
             </div>
             <div className="bg-zinc-50 p-4 border border-zinc-100 text-zinc-700 text-sm leading-relaxed whitespace-pre-wrap">
               {msg.message}
             </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="p-16 text-center border border-zinc-200 bg-white">
             <Mail className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
             <h3 className="text-zinc-900 font-bold">No Messages Yet</h3>
             <p className="text-zinc-400 text-sm mt-1">When someone contacts you, it will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManager;