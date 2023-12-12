import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext(null)

export const useAuthValues = () => {
	const { currentUser } = useContext(AuthContext)

	return { currentUser }
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

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	)
}
