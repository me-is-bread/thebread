import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { Env } from "https://cdn.skypack.dev/@humanwhocodes/env?min";

var env = new Env();

var firebaseConfig = {
    apiKey: env.get('FIREBASE_APIKEY'),
    authDomain: env.get('FIREBASE_AUTHDOMAIN'),
    projectId: env.get('FIREBASE_PROJECT_ID'),
    storageBucket: env.get('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: env.get('FIREBASE_MESSAGING_SENDER_ID'),
    appId: env.get('FIREBASE_APP_ID'),
    measurementId: env.get('FIREBASE_MEASUREMENT_ID')
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firestore = getFirestore(app);
const storage = getStorage();

var src = document.getElementById("fameGallery");

var profession = document.getElementById('profession');

const queryRef = query(collection(firestore, "Images"), where("wallOfFame", "==", true));

window.onload = async function () {

    if (navigator.userAgent.indexOf("Win") != -1) {
        const querySnapshot = await getDocs(queryRef);
        querySnapshot.forEach((doc) => {
            getDownloadURL(ref(storage, doc.data().imgId + ".jpg"))
            .then((url) => {
                var img = document.createElement("img");
                img.src = url;
                img.oncontextmenu = function () {
                    return false;
                };
                src.appendChild(img);
            });
        });
    }
    else if (navigator.userAgent.indexOf("Android") != -1) {
        profession.innerHTML = "Photographer / Designer / Editor";
    }
}
