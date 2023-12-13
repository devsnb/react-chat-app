import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useChatValues } from '../context/ChatContext'
import Message from './Message'

const Messages = () => {
	const [messages, setMessages] = useState([])
	const { data } = useChatValues()

	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
			doc.exists() && setMessages(doc.data().messages)
		})

		return () => {
			unsub()
		}
	}, [data.chatId])

	return (
		<div className='messages'>
			{messages.map(message => (
				<Message message={message} key={message.id} />
			))}
		</div>
	)
}

export default Messages
