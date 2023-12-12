import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuthValues } from '../context/AuthContext'

const Navbar = () => {
	const { currentUser } = useAuthValues()

	return (
		<div className='navbar'>
			<span className='logo'>React Chat</span>
			<div className='user'>
				<img src={currentUser.photoURL} alt='profile photo' />
				<span>{currentUser.displayName}</span>
				<button onClick={() => signOut(auth)}>Logout</button>
			</div>
		</div>
	)
}

export default Navbar
