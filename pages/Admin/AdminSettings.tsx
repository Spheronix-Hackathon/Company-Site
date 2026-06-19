import React, { useState } from 'react';
import { UserSession } from '../../types';
import { Mail, Lock, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface AdminSettingsProps {
  session: UserSession;
  setSession: React.Dispatch<React.SetStateAction<UserSession | null>>;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ session, setSession }) => {

  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://company-site-1eac.onrender.com/api'}` + '/auth/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`
        },
        body: JSON.stringify({ 
          email: newEmail || undefined, 
          password: password || undefined 
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setStatus('success');
      setMessage('Profile updated successfully!');
      setNewEmail('');
      setPassword('');
      
      const newSession = {
        ...session,
        userName: data.userName,
        token: data.token,
      };
      setSession(newSession);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(newSession));
    } catch (err: unknown) {
      setStatus('error');
      if (err instanceof Error) setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass p-8 rounded-[2.5rem] border-white/5">
      <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
      
      {status === 'success' && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 flex items-center gap-3">
          <CheckCircle size={20} /> {message}
        </div>
      )}
      
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
          <AlertCircle size={20} /> {message}
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Update Email Address</label>
          <div className="relative group/input">
            <Mail className="absolute left-4 top-4 text-slate-600 group-focus-within/input:text-violet-400 transition-colors" size={18} />
            <input 
              type="email" 
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-600"
              placeholder="New email address (leave blank to keep current)"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Update Password</label>
          <div className="relative group/input">
            <Lock className="absolute left-4 top-4 text-slate-600 group-focus-within/input:text-violet-400 transition-colors" size={18} />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-600"
              placeholder="New password (leave blank to keep current)"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading || (!newEmail && !password)}
          className={`w-full bg-violet-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-violet-500 transition-all ${isLoading || (!newEmail && !password) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? <Loader className="animate-spin" size={20} /> : <CheckCircle size={20} />}
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
