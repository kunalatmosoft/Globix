"use client";
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/app/firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log('User photoURL:', user.photoURL); // Log the photoURL
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log('User signed in:', user);
        console.log('User photoURL:', user.photoURL); // Log the photoURL
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error('Error during sign in:', errorCode, errorMessage, email, credential);
      });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error during sign out:', error);
    });
  };

  return (
    <nav className='p-4 bg-gray-800 text-white flex justify-between items-center'>
      <div className='text-2xl font-bold'>Globix</div>
      <div>
        {user ? (
          <div className='flex items-center'>
            {user.photoURL && (
              <img className="rounded-full w-10 h-10 mr-4" src={user.photoURL} alt="User Profile" />
            )}
            <div className='mr-4'>
              <p className='text-sm font-semibold'>{user.displayName}</p>
              <p className='text-xs text-gray-400'>{user.email}</p>
            </div>
            <button onClick={handleSignOut} className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>Sign out</button>
          </div>
        ) : (
          <button onClick={handleSignIn} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Sign in with Google</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;