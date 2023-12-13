import { useEffect, useRef } from 'react'
import { useAuthValues } from '../context/AuthContext'
import { useChatValues } from '../context/ChatContext'

const Message = ({ message }) => {
	const { currentUser } = useAuthValues()
	const { data } = useChatValues()

	const ref = useRef(null)

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: 'smooth' })
	}, [message])

	return (
		<div
			className={`message ${message.senderId === currentUser.uid && 'owner'}`}
			ref={ref}
		>
			<div className='message-info'>
				<img
					src={
						message.senderId === currentUser.uid
							? currentUser.photoURL
							: data.user.photoURL
					}
					alt=''
				/>
			</div>
			<div className='message-content'>
				<p>{message.text}</p>
				{message.img && <img src={message.img} alt='' />}
				<span>
					{message.date.toDate().toLocaleTimeString([], {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit',
						hour: '2-digit',
						minute: '2-digit'
					})}
				</span>
			</div>
		</div>
	)
}

export default Message
