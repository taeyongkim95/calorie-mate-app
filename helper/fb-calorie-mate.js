import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './fb-credentials';

export function initCalorieMateDb() {
  firebase.initializeApp(firebaseConfig);
}

export function storeFoodData(userId, {foodData}) {
  try {
    firebase.database().ref('users/' + userId).push(foodData);
  } catch (e) {
    alert(e);
  }
}