import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthValues } from '../context/AuthContext'
import { useChatValues } from '../context/ChatContext'

const Chats = () => {
	const [chats, setChats] = useState([])
	const { currentUser } = useAuthValues()
	const { changeUser } = useChatValues()

	useEffect(() => {
		let unsub = null

		const getChats = () => {
			unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
				setChats(doc.data())
			})
		}

		currentUser.uid && getChats()

		return () => {
			unsub()
		}
	}, [currentUser.uid])

	const handleSelect = user => {
		changeUser(user)
	}

	return (
		<div className='chats'>
			{Object.entries(chats)
				?.sort((a, b) => b[1].date - a[1].date)
				.map(chat => (
					<div
						className='user-chat'
						key={chat[0]}
						onClick={() => handleSelect(chat[1].userInfo)}
					>
						<img src={chat[1].userInfo.photoURL} alt='' />
						<div className='user-chat-info'>
							<span>{chat[1].userInfo.displayName}</span>
							<p>{chat[1].lastMessage?.text}</p>
						</div>
					</div>
				))}
		</div>
	)
}

export default Chats
