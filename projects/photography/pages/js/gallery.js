import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyAPM4zDlVxtzRseFHSg0DF4eOTw_uhuZig",
    authDomain: "shivam-rudra-db.firebaseapp.com",
    projectId: "shivam-rudra-db",
    storageBucket: "shivam-rudra-db.appspot.com",
    messagingSenderId: "43809569874",
    appId: "1:43809569874:web:764074b3a439f0a08f738b",
    measurementId: "G-2FR7VFGGT8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firestore = getFirestore(app);
const storage = getStorage();

var src = document.getElementById("gallery");

const queryRef = query(collection(firestore, "Images"));

window.onload = async function () { 
    const querySnapshot = await getDocs(queryRef);
    querySnapshot.forEach((doc) => {
        getDownloadURL(ref(storage, doc.data().imgId + ".jpg"))
        .then((url) => {
            var img = document.createElement("img");
            img.src = url
            img.oncontextmenu = function () {
                return false;
            };
            src.appendChild(img);
        });
    });
}