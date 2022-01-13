// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, onSnapshot, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"
import config from '../config.js';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.AUTHDOMAIN,
    projectId: config.PROJECTID,
    storageBucket: config.STORAGEBUCKET,
    messagingSenderId: config.MESSAGINGSENDERID,
    appId: config.APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const saveTask = (task, description) => {
    addDoc(collection(db, 'tasks'), {
        task,
        description,
        createdAt: new Date()
    });
}

export const getTasks = () => {
    return getDocs(collection(db, 'tasks'));
}

export const getTask = (id) => {
    return getDoc(doc(db, 'tasks', id));
}

export const onTasks = (cb) => {
    onSnapshot(collection(db, 'tasks'), cb);
}

export const updateTask = (id, data) => {
    updateDoc(doc(db, 'tasks', id), data);
}

export const deleteTask = (id) => {
    deleteDoc(doc(db, 'tasks', id));
}