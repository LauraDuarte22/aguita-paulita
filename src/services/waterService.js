import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

import { db } from '../lib/firebase';

/* Obtener datos de un día */
export async function getWaterEntries(dateKey) {
  try {
    const ref = doc(db, 'water', dateKey);

    const snap = await getDoc(ref);

    if (snap.exists()) {
      return snap.data().entries || [];
    }

    return [];
  } catch (error) {
    return [];
  }
}

/* Guardar datos */
export async function saveWaterEntries(dateKey, entries) {
  try {
    const ref = doc(db, 'water', dateKey);

    await setDoc(ref, {
      entries,
      updatedAt: Date.now(),
    });
  } catch (error) {
  }
}