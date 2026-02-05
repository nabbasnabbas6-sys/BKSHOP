import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

export async function getProducts() {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function getProductById(id) {
  if (!id) return null;
  const snap = await getDoc(doc(db, 'products', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}
