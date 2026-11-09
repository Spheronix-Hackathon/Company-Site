import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';

interface AdminQueriesProps {
  token: string;
}

interface ContactQuery {
  _id: string;
  name: string;
  email: string;
  domain: string;
  scale: string;
  message: string;
  date: string;
}

const AdminQueries: React.FC<AdminQueriesProps> = ({ token }) => {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://company-site-1eac.onrender.com/api'}` + '/contact', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch contact queries');
        setQueries(await res.json());
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQueries();
  }, [token]);

  return (
    <div className="w-full text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Contact Queries ({queries.length})</h2>
        <p className="text-slate-400 font-medium">Messages sent through the website contact form.</p>
      </div>

      {error && <div role="alert" className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-8">{error}</div>}

      {isLoading ? (
        <div className="p-8 text-center text-slate-400">Loading...</div>
      ) : !error && queries.length === 0 ? (
        <div className="p-8 text-center text-slate-400">No contact queries yet.</div>
      ) : (
        <div className="space-y-4">
          {queries.map(query => (
            <article key={query._id} className="glass rounded-2xl border-white/5 p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-bold text-lg">{query.name}</h3>
                  <a href={`mailto:${query.email}`} className="text-sm text-sky-400 hover:text-sky-300 inline-flex items-center gap-2 break-all"><Mail size={14} /> {query.email}</a>
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{new Date(query.date).toLocaleString()}</div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-white/5 border border-white/10 text-fuchsia-400">{query.domain}</span>
                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-white/5 border border-white/10 text-violet-400">{query.scale}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{query.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminQueries;
