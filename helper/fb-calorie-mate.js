import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './fb-credentials';

export function initCalorieMateDb() {
  firebase.initializeApp(firebaseConfig);
}