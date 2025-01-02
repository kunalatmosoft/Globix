"use client"
import { notFound } from 'next/navigation';
import { collection, query, where, getDocs, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase'; // Auth import

async function getUser(username) {
  if (!username) return null;

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
}

async function getNotes(userId) {
  if (!userId) return [];

  const notesRef = collection(db, 'notes');
  const q = query(notesRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export default function ProfilePage() {
  const params = useParams();
  const [authUser, loadingAuth] = useAuthState(auth); // Hook to handle auth state
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndNotes = async () => {
      const user = await getUser(params.username);
      if (!user) {
        notFound();
        return;
      }
      setUser(user);
      const userNotes = await getNotes(user.id);
      setNotes(userNotes);
      setLoading(false);
    };

    fetchUserAndNotes();
  }, [params.username]);

  const addNote = async () => {
    if (!authUser || !newNote.trim()) return;

    const notesRef = collection(db, 'notes');
    const docRef = await addDoc(notesRef, {
      userId: user.id,
      content: newNote,
      createdAt: new Date().toISOString(),
    });
    setNotes([...notes, { id: docRef.id, content: newNote }]);
    setNewNote('');
  };

  const updateNote = async (noteId, newContent) => {
    if (!authUser) return;

    const noteRef = doc(db, 'notes', noteId);
    await updateDoc(noteRef, { content: newContent });
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, content: newContent } : note)));
    setEditingNote(null);
  };

  const deleteNote = async (noteId) => {
    if (!authUser) return;

    const noteRef = doc(db, 'notes', noteId);
    await deleteDoc(noteRef);
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  if (loading || loadingAuth) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="md:flex-shrink-0 relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg border-4 border-white">
          <img
            src={user.photoURL || 'https://marketplace.canva.com/EAFXS8-cvyQ/1/0/400w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-SsX0UeCGP8g.jpg'}
            alt={`${user.username}'s profile`}
            className="object-cover"
          />
        </div>

        <div className="mt-6 md:mt-0 md:ml-8 flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
          <p className="text-gray-600 text-lg mt-2">{user.email}</p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700">Your Notes</h2>
            <ul className="mt-4 space-y-4">
              {notes.map((note) => (
                <li key={note.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                  {editingNote === note.id ? (
                    <input
                      type="text"
                      value={note.content}
                      onChange={(e) => updateNote(note.id, e.target.value)}
                      className="flex-1 p-2 border rounded"
                      disabled={!authUser}
                    />
                  ) : (
                    <span>{note.content}</span>
                  )}
                  {authUser && (
                    <div className="flex space-x-2">
                      <button onClick={() => setEditingNote(note.id)} className="text-blue-500">Edit</button>
                      <button onClick={() => deleteNote(note.id)} className="text-red-500">Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {authUser && (
              <div className="mt-4 flex">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a new note..."
                  className="flex-1 p-2 border rounded"
                />
                <button onClick={addNote} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Add</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
