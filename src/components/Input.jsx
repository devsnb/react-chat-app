import Image from '../assets/image.png'
import File from '../assets/attach-file.png'

const Input = () => {
	return (
		<div className='input'>
			<input type='text' placeholder='Type message...' />
			<div className='send'>
				<img src={File} alt='attach file' />
				<input type='file' style={{ display: 'none' }} id='file' />
				<label htmlFor='file'>
					<img src={Image} alt='upload image' />
				</label>
				<button>Send</button>
			</div>
		</div>
	)
}

export default Input
