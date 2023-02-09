
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCOzl-mgusqSZvzyl3mCBOcrF5O_JK3Heo",
    authDomain: "tecnopuzzle-react.firebaseapp.com",
    projectId: "tecnopuzzle-react",
    storageBucket: "tecnopuzzle-react.appspot.com",
    messagingSenderId: "495457892384",
    appId: "1:495457892384:web:b3cff8fd95d951c5f9e445",
    measurementId: "G-K6BN14HCXG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const initFirebase = () => app
