// models/product.model.js
import { db } from '../config/firebase.js';
import { collection, getDocs, getDoc, addDoc, deleteDoc, doc } from 'firebase/firestore';

const COLLECTION = 'products';
const productCollectionRef = collection(db, COLLECTION);

const mapDoc = (docSnap) => ({ id: docSnap.id, ...docSnap.data() });

const getAll = async () => {
  try {
    const snapshot = await getDocs(productCollectionRef);
    return snapshot.docs.map(mapDoc);
  } catch (e) {
    const error = new Error('Fallo en la comunicación con la base de datos (500).');
    error.status = 500;
    throw error;
  }
};

const getById = async (id) => {
  if (!id) {
    const err = new Error('ID requerido (400).');
    err.status = 400;
    throw err;
  }
  try {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return mapDoc(docSnap);
  } catch (e) {
    const error = new Error('Fallo en la comunicación con la base de datos (500).');
    error.status = 500;
    throw error;
  }
};

const add = async (data) => {
  try {
    const ref = await addDoc(productCollectionRef, data);
    return { id: ref.id, ...data };
  } catch (e) {
    const error = new Error('Fallo en la comunicación con la base de datos (500).');
    error.status = 500;
    throw error;
  }
};

const deleteById = async (id) => {
  if (!id) {
    const err = new Error('ID requerido (400).');
    err.status = 400;
    throw err;
  }
  try {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return false;
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    const error = new Error('Fallo en la comunicación con la base de datos (500).');
    error.status = 500;
    throw error;
  }
};

export default { getAll, getById, add, deleteById };
