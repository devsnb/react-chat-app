import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	updateProfile,
	signOut
} from 'firebase/auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const AuthContext = createContext(null)

export const useAuthValues = () => {
	const { currentUser, registerUser, login, logout } = useContext(AuthContext)

	return { currentUser, registerUser, login, logout }
}

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, user => {
			if (user) {
				setCurrentUser(user)
			}
		})

		return () => {
			unsub()
		}
	}, [])

	const registerUser = async (email, password, displayName, file) => {
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password)

			const date = new Date().getTime()
			const storageRef = ref(storage, `${displayName + date}`)

			await uploadBytesResumable(storageRef, file).then(() => {
				getDownloadURL(storageRef).then(async downloadURL => {
					try {
						await updateProfile(res.user, {
							displayName,
							photoURL: downloadURL
						})

						await setDoc(doc(db, 'users', res.user.uid), {
							uid: res.user.uid,
							displayName,
							email,
							photoURL: downloadURL
						})

						await setDoc(doc(db, 'userChats', res.user.uid), {})
						toast.success('Registration successful!')
						return { success: true }
					} catch (err) {
						toast.error('failed to upload avatar.')
						console.error(err)
						return { success: false }
					}
				})
			})
		} catch (error) {
			toast.error('failed to register user. please try again.')
			return { success: false }
		}
	}

	const login = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
			toast.success('Successfully logged in')
			return { success: true }
		} catch (error) {
			toast.error('Failed to login. check your credentials and try again')
			return { success: false }
		}
	}

	const logout = async () => {
		try {
			await signOut(auth)
			return { success: true }
		} catch (error) {
			return { success: false }
		}
	}

	return (
		<AuthContext.Provider value={{ currentUser, registerUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
