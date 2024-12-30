/* "use client";
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
import { addFolder, getFolders, deleteFolder, addNote, getNotes, deleteNote, updateNote } from "../firestore";
import { LogOut, PlusCircle, Edit2, Trash2, User, Mail, Book, Save, Folder } from 'lucide-react';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Home() {
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folderName, setFolderName] = useState("");
  const [currentFolder, setCurrentFolder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchFolders(user.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchFolders = async (uid) => {
    const fetchedFolders = await getFolders(uid);
    setFolders(fetchedFolders);
  };

  const fetchNotes = async (uid, folderId) => {
    const fetchedNotes = await getNotes(uid, folderId);
    setNotes(fetchedNotes);
  };

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        fetchFolders(user.uid);
      })
      .catch((error) => {
        console.error("Error during sign in:", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setFolders([]);
        setNotes([]);
        setCurrentFolder(null);
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  };

  const handleAddFolder = async () => {
    try {
      const folderId = await addFolder(user.uid, folderName);
      setFolders([...folders, { id: folderId, name: folderName }]);
      setFolderName("");
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      await deleteFolder(folderId);
      setFolders(folders.filter((folder) => folder.id !== folderId));
      if (currentFolder === folderId) {
        setCurrentFolder(null);
        setNotes([]);
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleSelectFolder = (folderId) => {
    setCurrentFolder(folderId);
    fetchNotes(user.uid, folderId);
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
        const noteId = await addNote(user.uid, currentFolder, title, content);
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
              <span className="text-2xl font-bold text-gray-800">Globix Notes</span>
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
              <div className="md:w-1/4 mb-6 md:mb-0">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      <Folder className="mr-2 h-5 w-5" />
                      Folders
                    </h3>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      {folders.map((folder) => (
                        <div key={folder.id} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 flex items-center">
                            <button
                              onClick={() => handleSelectFolder(folder.id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              {folder.name}
                            </button>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-end">
                            <button
                              onClick={() => handleDeleteFolder(folder.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Folder</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Create a new folder to organize your notes.</p>
                    </div>
                    <form className="mt-5 sm:flex sm:items-center">
                      <div className="w-full sm:max-w-xs">
                        <label htmlFor="folderName" className="sr-only">
                          Folder Name
                        </label>
                        <input
                          type="text"
                          name="folderName"
                          id="folderName"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Folder Name"
                          value={folderName}
                          onChange={(e) => setFolderName(e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddFolder}
                        className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Folder
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="md:w-3/4">
                {currentFolder && (
                  <>
                    <div className="bg-white shadow sm:rounded-lg mb-6">
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {isEditing ? "Edit Note" : "Create Note"}
                        </h3>
                        <div className="mt-2 max-w-xl text-sm text-gray-500">
                          <p>{isEditing ? "Update your note details." : "Add a new note to your collection."}</p>
                        </div>
                        <form className="mt-5 space-y-4">
                          <div>
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
                          <div>
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
                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                          >
                            {isEditing ? <Save className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                            {isEditing ? "Update Note" : "Add Note"}
                          </button>
                        </form>
                      </div>
                    </div>
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
                  </>
                )}
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

 */

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
import { addFolder, getFolders, deleteFolder, addNote, getNotes, deleteNote, updateNote } from "../firestore";
import { LogOut, PlusCircle, Edit2, Trash2, Folder, Search, Menu, X, MessageCircle } from 'lucide-react';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Home() {
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folderName, setFolderName] = useState("");
  const [currentFolder, setCurrentFolder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchFolders(user.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchFolders = async (uid) => {
    const fetchedFolders = await getFolders(uid);
    setFolders(fetchedFolders);
  };

  const fetchNotes = async (uid, folderId) => {
    const fetchedNotes = await getNotes(uid, folderId);
    setNotes(fetchedNotes);
  };

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        fetchFolders(user.uid);
      })
      .catch((error) => {
        console.error("Error during sign in:", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setFolders([]);
        setNotes([]);
        setCurrentFolder(null);
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  };

  const handleAddFolder = async () => {
    if (!folderName.trim()) return;
    try {
      const folderId = await addFolder(user.uid, folderName);
      setFolders([...folders, { id: folderId, name: folderName }]);
      setFolderName("");
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    if (window.confirm("Are you sure you want to delete this folder? All notes inside will be deleted.")) {
      try {
        await deleteFolder(folderId);
        setFolders(folders.filter((folder) => folder.id !== folderId));
        if (currentFolder === folderId) {
          setCurrentFolder(null);
          setNotes([]);
        }
      } catch (error) {
        console.error("Error deleting folder:", error);
      }
    }
  };

  const handleSelectFolder = (folderId) => {
    setCurrentFolder(folderId);
    fetchNotes(user.uid, folderId);
    setIsSidebarOpen(false);
  };

  const handleAddNote = async () => {
    if (!title.trim() || !content.trim()) return;
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
        const noteId = await addNote(user.uid, currentFolder, title, content);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-in-out transform bg-white lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-semibold text-gray-800">Globix</span>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search folders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
              />
              <Search className="absolute top-2.5 right-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <nav className="mt-5">
            {filteredFolders.map((folder) => (
              <div key={folder.id} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                <button
                  onClick={() => handleSelectFolder(folder.id)}
                  className={`flex items-center w-full text-left text-gray-600 ${currentFolder === folder.id ? 'bg-blue-100 text-blue-600' : ''}`}
                >
                  <Folder className="w-5 h-5 mr-3" />
                  {folder.name}
                </button>
                <button
                  onClick={() => handleDeleteFolder(folder.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="text-gray-500 lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="ml-4 text-2xl font-semibold text-gray-800">
                {currentFolder ? folders.find(f => f.id === currentFolder)?.name : 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center">
              {user && (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">{user.displayName}</span>
                  {user.photoURL ? (
                    <img className="w-10 h-10 rounded-full" src={user.photoURL} alt="User avatar" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">
                        {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              {user ? (
                <>
                  {currentFolder ? (
                    <div className="space-y-6">
                      {/* Note creation/editing form */}
                      <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                          {isEditing ? 'Edit Note' : 'Create New Note'}
                        </h2>
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Note Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <textarea
                            placeholder="Note Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                          ></textarea>
                          <button
                            onClick={handleAddNote}
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          >
                            {isEditing ? 'Update Note' : 'Add Note'}
                          </button>
                        </div>
                      </div>

                      {/* Notes list */}
                      <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6">
                          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Notes</h2>
                          {notes.length === 0 ? (
                            <p className="text-gray-600">No notes in this folder yet.</p>
                          ) : (
                            <div className="space-y-4">
                              {notes.map((note) => (
                                <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
                                  <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
                                    <div className="space-x-2">
                                      <button
                                        onClick={() => handleEditNote(note)}
                                        className="text-blue-500 hover:text-blue-600"
                                      >
                                        <Edit2 className="w-5 h-5" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteNote(note.id)}
                                        className="text-red-500 hover:text-red-600"
                                      >
                                        <Trash2 className="w-5 h-5" />
                                      </button>
                                    </div>
                                  </div>
                                  <p className="text-gray-600">{note.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome to Your Dashboard</h2>
                      <p className="text-gray-600 mb-8">Select a folder or create a new one to get started.</p>
                      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Create New Folder</h3>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Folder Name"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={handleAddFolder}
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          >
                            <PlusCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Globix Notes</h2>
                  <p className="text-xl text-gray-600 mb-8">Sign in to start organizing your notes</p>
                  <button
                    onClick={handleSignIn}
                    className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg font-semibold"
                  >
                    Sign in with Google
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

