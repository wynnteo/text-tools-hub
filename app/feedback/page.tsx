// app/feedback/page.tsx
'use client';
import { useState } from 'react';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-4">Feedback & Contact</h2>
      
      {status === 'success' && (
        <div className="bg-green-100 p-4 rounded-lg mb-4 text-green-700">
          Thank you! Your feedback has been submitted.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-100 p-4 rounded-lg mb-4 text-red-700">
          Something went wrong. Please try again later.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded h-32"
            placeholder="Your feedback or feature request..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}