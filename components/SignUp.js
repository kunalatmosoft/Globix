'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/app/firebase';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username,
        email,
        createdAt: new Date().toISOString(),
      });
      // Reload the user to ensure the displayName is updated
      await userCredential.user.reload();
    } catch (err) {
      setError('Failed to sign up');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
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
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
        Sign Up
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

