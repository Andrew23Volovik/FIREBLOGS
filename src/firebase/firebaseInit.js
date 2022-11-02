import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCw5SjA8DbcARhANhfqukePLCOnfhL7M1o',
  authDomain: 'fireblogsyt-9b1b2.firebaseapp.com',
  projectId: 'fireblogsyt-9b1b2',
  storageBucket: 'fireblogsyt-9b1b2.appspot.com',
  messagingSenderId: '709001241003',
  appId: '1:709001241003:web:c1faf2f3e81bdb6c0432ee'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
