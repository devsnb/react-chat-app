import { useRef } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Login = () => {
	const emailRef = useRef(null)
	const passwordRef = useRef(null)

	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()

		const email = emailRef.current.value
		const password = passwordRef.current.value

		try {
			await signInWithEmailAndPassword(auth, email, password)
			toast.success('Successfully logged in')
			navigate('/')
		} catch (error) {
			toast.error('Failed to login. check your credentials and try again')
		}
	}

	return (
		<div className='form-container'>
			<div className='form-wrapper'>
				<span className='logo'>React Chat</span>
				<span className='title'>Login</span>
				<form onSubmit={handleSubmit}>
					<input type='email' placeholder='email' ref={emailRef} />
					<input type='password' placeholder='password' ref={passwordRef} />
					<button type='submit'>Sign In</button>
				</form>
				<p>
					Don't have an account? <Link to='/register'>Register</Link>
				</p>
			</div>
		</div>
	)
}

export default Login
