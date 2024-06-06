import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import db from "./firebase-config"; // Import your Firestore configuration

const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error(e);
  }
};

const getDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

const getAllDocuments = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });
  return documents;
};

const updateDocument = async (collectionName, id, newData) => {
  const docRef = doc(db, collectionName, id);

  try {
    await updateDoc(docRef, newData);
    console.log("Document updated successfully");
  } catch (e) {
    console.error("Error updating document: ", e);
    throw new Error(e);
  }
};

const deleteDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);

  try {
    if (docRef) {
      await deleteDoc(docRef);
      console.log("Document deleted successfully");
    }
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw new Error(e);
  }
};

export {
  addDocument,
  getDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
};