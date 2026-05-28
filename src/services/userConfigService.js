// src/services/userConfigService.js

import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

import { db } from '../lib/firebase';

const userRef = doc(
  db,
  'users',
  'default'
);

/* ───────────────── GET CONFIG ───────────────── */

export async function getUserConfig() {
  try {
 
    const snap =
      await getDoc(userRef);

  

    if (!snap.exists()) {
    

      return null;
    }

    const data = snap.data();

   

    return data;
  } catch (error) {
  

    return null;
  }
}

/* ───────────────── SAVE CONFIG ───────────────── */

export async function saveUserConfig(
  config
) {
  try {
 

    await setDoc(
      userRef,
      {
        ...config,
        updatedAt: Date.now(),
      },
      {
        merge: true,
      }
    );

  
  } catch (error) {
   
  }
}