import { collection, addDoc, getDocs, deleteDoc, doc , updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const notesCollection = collection(db, "notes");

export const addNote = async (userId, title, content) => {
  try {
    const docRef = await addDoc(notesCollection, {
      userId,
      title,
      content,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const getNotes = async (userId) => {
  try {
    const querySnapshot = await getDocs(notesCollection);
    const notes = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((note) => note.userId === userId);
    return notes;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    await deleteDoc(doc(db, "notes", noteId));
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
export const updateNote = async (noteId, updatedData) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, updatedData);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};