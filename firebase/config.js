import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAX-or_GTxAoG49LAAAOGFQseFFwmpTB7g",
    authDomain: "doctor-3a004.firebaseapp.com",
    projectId: "doctor-3a004",
    storageBucket: "doctor-3a004.appspot.com",
    messagingSenderId: "235494485957",
    appId: "1:235494485957:web:3ce2f3db1cbb6a50db65ac",
    measurementId: "G-94EGQ4QCV8"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };