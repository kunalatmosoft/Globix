'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import SignOut from '@/components/SignOut';

export default function Navigation() {
  const [user, loading] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (user && user.displayName) {
      setUsername(user.displayName);
    }
  }, [user]);

  if (loading) {
    return <nav className="bg-white shadow-md"><div className="container mx-auto px-4 py-3">Loading...</div></nav>;
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Social Profiles
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {username && (
                <Link href={`/profile/${username}`} className="flex items-center text-gray-600 hover:text-gray-900">
                  <img
                    src={user.photoURL || 'https://marketplace.canva.com/EAFXS8-cvyQ/1/0/400w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-SsX0UeCGP8g.jpg'}
                    alt={username}
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
                  />
                  <span>{username}</span>
                </Link>
              )}
              <SignOut />
            </>
          ) : (
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Sign In / Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

