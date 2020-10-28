import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAj4Hquc9N9Qnm7130lmN0hJ6Rtq01tPqk',
  authDomain: 'weathapp-d2d63.firebaseapp.com',
  databaseURL: 'https://weathapp-d2d63.firebaseio.com',
  projectId: 'weathapp-d2d63',
  storageBucket: 'weathapp-d2d63.appspot.com',
  messagingSenderId: '338387881277',
  appId: '1:338387881277:web:3f6843297e22740e294954',
};

export const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
