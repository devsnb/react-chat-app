import Video from '../assets/videocam.png'
import AddUser from '../assets/add-user.png'
import Options from '../assets/options.png'
import Messages from './Messages'
import Input from './Input'

const Chat = () => {
	return (
		<div className='chat'>
			<div className='chat-info'>
				<span>Jane</span>
				<div className='chat-icons'>
					<img src={Video} alt='video' />
					<img src={AddUser} alt='add user' />
					<img src={Options} alt='options' />
				</div>
			</div>
			<Messages />
			<Input />
		</div>
	)
}

export default Chat
