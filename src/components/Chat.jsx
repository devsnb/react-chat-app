import Messages from './Messages'
import Input from './Input'
import { useChatValues } from '../context/ChatContext'

const Chat = () => {
	const { data } = useChatValues()

	return (
		<div className='chat'>
			<div className='chat-info'>
				<span>{data.user?.displayName}</span>
			</div>
			<Messages />
			<Input />
		</div>
	)
}

export default Chat
