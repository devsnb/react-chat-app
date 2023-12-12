import upload from '../assets/bear.png'

const Register = () => {
	return (
		<div className='form-container'>
			<div className='form-wrapper'>
				<span className='logo'>React Chat</span>
				<span className='title'>Register</span>
				<form>
					<input type='text' placeholder='your name' />
					<input type='email' placeholder='email' />
					<input type='password' placeholder='password' />
					<input style={{ display: 'none' }} type='file' id='file' />
					<label htmlFor='file'>
						<img src={upload} alt='' />
						<span>Add an avatar</span>
					</label>
					<button type='submit'>Sign Up</button>
				</form>
				<p>Already have an account? Login</p>
			</div>
		</div>
	)
}

export default Register
