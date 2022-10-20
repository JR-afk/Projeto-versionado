import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1sJTsyV_J_KdPz_IVronlHLYp8oV2mdw",
    authDomain: "jr-banco.firebaseapp.com",
    projectId: "jr-banco",
    storageBucket: "jr-banco.appspot.com",
    messagingSenderId: "19062173787",
    appId: "1:19062173787:web:7623664a19e36be9a04f7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveTask = (nome, telefone, location) =>
    addDoc(collection(db, "denuncias"), {
        nome,
        telefone,
        location
    });


export const getTasks = () => getDocs(collection(db, "denuncias"));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'denuncias'), callback);


export const deleteTask = (id) => deleteDoc(doc(db, 'denuncias', id))

export const getTask = (id) => getDoc(doc(db, 'denuncias', id))

export const updateTask = (id, newFields) => updateDoc(doc(db, 'denuncias', id), newFields);



export const savenTask = (nome, telefone, latitude, longitude) =>
    addDoc(collection(db, "arquivadas"), {
        nome,
        telefone,
        latitude,
        longitude
    });

export const getnTasks = () => getDocs(collection(db, "arquivadas"));

export const onGetnTasks = (callback) => onSnapshot(collection(db, 'arquivadas'), callback);

export { onSnapshot, collection, db };

export const deletenTask = (id) => deleteDoc(doc(db, 'arquivadas', id))

export const getnTask = (id) => getDoc(doc(db, 'arquivadas', id))

export const updatenTask = (id, newFields) => updateDoc(doc(db, 'arquivadas', id), newFields);


export const nowsaveTask = (nome, telefone, latitude, longitude) =>
    addDoc(collection(db, "desarquivadas"), {
        nome,
        telefone,
        latitude,
        longitude
    });


export const nowgetTasks = () => getDocs(collection(db, "desarquivadas"));

export const nowonGetTasks = (callback) => onSnapshot(collection(db, 'desarquivadas'), callback);


export const nowdeleteTask = (id) => deleteDoc(doc(db, 'desarquivadas', id))

export const nowgetTask = (id) => getDoc(doc(db, 'desarquivadas', id))

export const nowupdateTask = (id, newFields) => updateDoc(doc(db, 'desarquivadas', id), newFields);