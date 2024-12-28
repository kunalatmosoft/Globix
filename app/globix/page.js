"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app } from "../firebase";
import { addNote, getNotes, deleteNote, updateNote } from "../firestore";
import { LogOut, PlusCircle, Edit2, Trash2, User, Mail, Book, Save } from 'lucide-react';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Home() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchNotes(user.uid);
      } else {
        setUser(null);
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchNotes = async (uid) => {
    const fetchedNotes = await getNotes(uid);
    setNotes(fetchedNotes);
  };

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        fetchNotes(user.uid);
        console.log("User signed in:", user);
      })
      .catch((error) => {
        console.error("Error during sign in:", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  };

  const handleAddNote = async () => {
    try {
      if (isEditing) {
        await updateNote(currentNoteId, { title, content });
        setNotes(
          notes.map((note) =>
            note.id === currentNoteId ? { ...note, title, content } : note
          )
        );
        setIsEditing(false);
        setCurrentNoteId(null);
      } else {
        const noteId = await addNote(user.uid, title, content);
        setNotes([...notes, { id: noteId, title, content }]);
      }
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding or updating note:", error);
    }
  };

  const handleEditNote = (note) => {
    setIsEditing(true);
    setCurrentNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-800">Globix</span>
            </div>
            {user && (
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  {user.photoURL ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.photoURL}
                      alt="User profile"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSignOut}
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {user ? (
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6 flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      {user.photoURL ? (
                        <img
                          className="h-24 w-24 rounded-full"
                          src={user.photoURL}
                          alt="User profile"
                        />
                      ) : (
                        <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="h-12 w-12 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">{user.displayName}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.displayName}</dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="mt-6 bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {isEditing ? "Edit Note" : "Create Note"}
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>{isEditing ? "Update your note details." : "Add a new note to your collection."}</p>
                    </div>
                    <form className="mt-5 sm:flex sm:items-center">
                      <div className="w-full sm:max-w-xs">
                        <label htmlFor="title" className="sr-only">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3 w-full">
                        <label htmlFor="content" className="sr-only">
                          Content
                        </label>
                        <textarea
                          rows={4}
                          name="content"
                          id="content"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Content"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddNote}
                        className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {isEditing ? <Save className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                        {isEditing ? "Update Note" : "Add Note"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      <Book className="mr-2 h-5 w-5" />
                      Your Notes
                    </h3>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {notes.map((note) => (
                      <li key={note.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-indigo-600">{note.title}</h4>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditNote(note)}
                              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">{note.content}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <div className="mt-8 space-y-6">
              <button
                onClick={handleSignIn}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in with Google
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

