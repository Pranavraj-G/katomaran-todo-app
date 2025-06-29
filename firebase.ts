// firebase.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
    getAuth,
    getReactNativePersistence,
    initializeAuth,
} from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth =
  getApps().length === 0
    ? initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(AsyncStorage),
      })
    : getAuth(firebaseApp);

export { auth };

