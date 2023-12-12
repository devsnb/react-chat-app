import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { auth, storage, db } from '../firebase'
import upload from '../assets/bear.png'

const Register = () => {
	const [loading, setLoading] = useState()
	const nameRef = useRef(null)
	const emailRef = useRef(null)
	const passwordRef = useRef(null)
	const fileRef = useRef()

	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()

		const displayName = nameRef.current.value
		const email = emailRef.current.value
		const password = passwordRef.current.value
		const file = fileRef.current.files[0]

		try {
			//Create user
			const res = await createUserWithEmailAndPassword(auth, email, password)

			//Create a unique image name
			const date = new Date().getTime()
			const storageRef = ref(storage, `${displayName + date}`)

			await uploadBytesResumable(storageRef, file).then(() => {
				getDownloadURL(storageRef).then(async downloadURL => {
					try {
						//Update profile
						await updateProfile(res.user, {
							displayName,
							photoURL: downloadURL
						})

						//create user on firestore
						await setDoc(doc(db, 'users', res.user.uid), {
							uid: res.user.uid,
							displayName,
							email,
							photoURL: downloadURL
						})

						//create empty user chats on firestore
						await setDoc(doc(db, 'userChats', res.user.uid), {})
						toast.success('Registration successful!')
						navigate('/')
					} catch (err) {
						setLoading(false)
						toast.error('failed to upload avatar.')
						console.log(err)
					}
				})
			})
		} catch (error) {
			toast.error('failed to register user. please try again.')
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
