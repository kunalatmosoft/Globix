'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase';

export default function SignOut() {
  const handleSignOut = () => {
    signOut(auth).catch((error) => console.error('Error signing out:', error));
  };

  return (
    <button onClick={handleSignOut} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
      Sign Out
    </button>
  );
}

