import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

import 'react-toastify/dist/ReactToastify.css'
import { useAuthValues } from './context/AuthContext'

function App() {
	const { currentUser } = useAuthValues()

	const ProtectedRoute = ({ children }) => {
		if (!currentUser) {
			return <Navigate to='/login' />
		}

		return children
	}

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/'>
						<Route
							index
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route path='login' element={<Login />} />
						<Route path='register' element={<Register />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</>
	)
}

export default App
