import { useNavigate } from 'react-router-dom'
import { useAuthValues } from '../context/AuthContext'
import { toast } from 'react-toastify'

const Navbar = () => {
	const navigate = useNavigate()
	const { currentUser } = useAuthValues()
	const { logout } = useAuthValues()

	const handleLogout = async () => {
		const status = await logout()
		if (status.success) {
			toast.success('logged out successfully')
			navigate('/login')
		}
	}

	return (
		<div className='navbar'>
			<span className='logo'>React Chat</span>
			<div className='user'>
				<img src={currentUser.photoURL} alt='profile photo' />
				<span>{currentUser.displayName}</span>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</div>
	)
}

export default Navbar
