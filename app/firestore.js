import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";

const foldersCollection = collection(db, "folders");
const notesCollection = collection(db, "notes");

export const addFolder = async (userId, name) => {
  try {
    const docRef = await addDoc(foldersCollection, {
      userId,
      name,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding folder: ", error);
    throw error;
  }
};

export const getFolders = async (userId) => {
  try {
    const q = query(foldersCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching folders: ", error);
    throw error;
  }
};

export const deleteFolder = async (folderId) => {
  try {
    await deleteDoc(doc(db, "folders", folderId));
    // Delete all notes in the folder
    const notesQuery = query(notesCollection, where("folderId", "==", folderId));
    const notesSnapshot = await getDocs(notesQuery);
    notesSnapshot.docs.forEach(async (noteDoc) => {
      await deleteDoc(doc(db, "notes", noteDoc.id));
    });
  } catch (error) {
    console.error("Error deleting folder: ", error);
    throw error;
  }
};

export const addNote = async (userId, folderId, title, content) => {
  try {
    const docRef = await addDoc(notesCollection, {
      userId,
      folderId,
      title,
      content,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding note: ", error);
    throw error;
  }
};

export const getNotes = async (userId, folderId) => {
  try {
    const q = query(notesCollection, where("userId", "==", userId), where("folderId", "==", folderId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching notes: ", error);
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    await deleteDoc(doc(db, "notes", noteId));
  } catch (error) {
    console.error("Error deleting note: ", error);
    throw error;
  }
};

export const updateNote = async (noteId, updatedData) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, updatedData);
  } catch (error) {
    console.error("Error updating note: ", error);
    throw error;
  }
};
