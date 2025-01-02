'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Failed to sign in');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Sign In
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

