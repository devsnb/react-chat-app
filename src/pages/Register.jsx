import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import upload from '../assets/bear.png'
import { useAuthValues } from '../context/AuthContext'

const Register = () => {
	const nameRef = useRef(null)
	const emailRef = useRef(null)
	const passwordRef = useRef(null)
	const fileRef = useRef()

	const navigate = useNavigate()
	const { registerUser } = useAuthValues()

	const handleSubmit = async e => {
		e.preventDefault()

		const displayName = nameRef.current.value
		const email = emailRef.current.value
		const password = passwordRef.current.value
		const file = fileRef.current.files[0]

		const status = await registerUser(email, password, displayName, file)

		if (status.success) {
			navigate('/')
		}
	}

	return (
		<div className='form-container'>
			<div className='form-wrapper'>
				<span className='logo'>React Chat</span>
				<span className='title'>Register</span>
				<form onSubmit={handleSubmit}>
					<input type='text' placeholder='your name' ref={nameRef} />
					<input type='email' placeholder='email' ref={emailRef} />
					<input type='password' placeholder='password' ref={passwordRef} />
					<input
						style={{ display: 'none' }}
						type='file'
						id='file'
						ref={fileRef}
					/>
					<label htmlFor='file'>
						<img src={upload} alt='' />
						<span>Add an avatar</span>
					</label>
					<button type='submit'>Sign Up</button>
				</form>
				<p>
					Already have an account? <Link to='/login'>Login</Link>
				</p>
			</div>
		</div>
	)
}

export default Register
