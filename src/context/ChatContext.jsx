import { createContext, useContext, useReducer } from 'react'
import { useAuthValues } from './AuthContext'

const ChatContext = createContext(null)

export const useChatValues = () => {
	const { data, changeUser } = useContext(ChatContext)
	return { data, changeUser }
}

const INITIAL_STATE = {
	chatId: 'null',
	user: {}
}

export const ChatContextProvider = ({ children }) => {
	const { currentUser } = useAuthValues()

	const reducer = (state, action) => {
		switch (action.type) {
			case 'CHANGE_USER': {
				return {
					...state,
					user: action.payload,
					chatId:
						currentUser.uid > action.payload.uid
							? currentUser.uid + action.payload.uid
							: action.payload.uid + currentUser.uid
				}
			}

			default: {
				return state
			}
		}
	}

	const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

	const changeUser = user => {
		dispatch({ type: 'CHANGE_USER', payload: user })
	}

	return (
		<ChatContext.Provider value={{ data: state, changeUser }}>
			{children}
		</ChatContext.Provider>
	)
}
