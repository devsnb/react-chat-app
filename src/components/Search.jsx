const Search = () => {
	return (
		<div className='search'>
			<div className='search-form'>
				<input type='text' placeholder='Find a user' />
			</div>
			<div className='user-chat'>
				<img
					src='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					alt=''
				/>
				<div className='user-chat-info'>
					<span>Jane</span>
				</div>
			</div>
		</div>
	)
}

export default Search
