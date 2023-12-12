import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyApumkzrNQLx17Yvvy6cjYjc9u-HeIj3B8',
	authDomain: 'react-chat-a8123.firebaseapp.com',
	projectId: 'react-chat-a8123',
	storageBucket: 'react-chat-a8123.appspot.com',
	messagingSenderId: '662001749262',
	appId: '1:662001749262:web:e43c65e3f8a0701b6bdb5f'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
