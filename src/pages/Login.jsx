import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthValues } from '../context/AuthContext'

const Login = () => {
	const emailRef = useRef(null)
	const passwordRef = useRef(null)

	const navigate = useNavigate()
	const { login } = useAuthValues()

	const handleSubmit = async e => {
		e.preventDefault()

		const email = emailRef.current.value
		const password = passwordRef.current.value

		const status = await login(email, password)
		if (status.success) {
			navigate('/')
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
