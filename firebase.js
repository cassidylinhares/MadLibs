// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDbA6wxB0-hlkbMOm4neOJRvD0ySqCGwfk",
	authDomain: "madlibs-ce75f.firebaseapp.com",
	databaseURL: "https://madlibs-ce75f-default-rtdb.firebaseio.com",
	projectId: "madlibs-ce75f",
	storageBucket: "madlibs-ce75f.appspot.com",
	messagingSenderId: "109763229446",
	appId: "1:109763229446:web:6b74ac06c984ff73b15087"
};

// Initialize Firebase
let app;
if(firebase.getApps().length === 0){
		app = firebase.initializeApp(firebaseConfig);
} else {
		app = firebase.getApp();
}

const auth = getAuth(app);
export { auth }

// FIRESTORE //
export const db = getFirestore();

// get story titles
export async function getTitles() {
	let titles = [];

	const docs = await getDocs(collection(db, "availableStories"));
	docs.forEach(doc => {
		titles.push(doc.get('title'));
	});

	return titles;
}

// get story
export const getStory = async (storyTitle) => {
	let story = {title: null, story: null, blanks: []};

	const q = query(collection(db, "availableStories"), where("title", "==", storyTitle));
	const docs = await getDocs(q);
	
	docs.forEach(doc => {
		story.title = doc.get('title');
		story.story = doc.get('story');
		story.blanks = doc.get('blanks');
	});

	return story;
}

// save story