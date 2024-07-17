import { useState, useEffect, useMemo } from 'react'
import { compareFunctions } from './features/featuresSorted'
import { fetchUsers, filterNameUsers } from './services/api'
import { UserTable } from './components/UserTable'
import { SearchBar } from './components/SearchBar'
import './App.css'

const App = () => {
	const [users, setUsers] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [loading, setLoading] = useState(true)
	const [sortConfig, setSortConfig] = useState(null)
	const [checkUsers, setCheckUsers] = useState(false)

	const loadUsers = () => {
		setLoading(true)
		fetchUsers().then(data => {
			setUsers(data)
			setLoading(false)
			setCheckUsers(true)
		})
	}

	useEffect(() => {
		loadUsers()
	}, [])

	useEffect(() => {
		if (searchQuery) {
			console.log(checkUsers)
			setLoading(true)
			filterNameUsers(searchQuery).then(filteredUsers => {
				if (filteredUsers.length > 0) {
					console.log(filteredUsers)
					setUsers(filteredUsers)
					setLoading(false)
					setCheckUsers(true)
				} else {
					setCheckUsers(false)
					setLoading(false)
				}
			})
		}
	}, [searchQuery])

	const handleSearch = query => {
		setSearchQuery(query)
	}

	// Сортировка по возрастанию или убыванию
	const handleSort = (key, direction) => {
		setSortConfig({ key, direction })
		if (direction === null) {
			setSortConfig(null)
		}
	}

	const sortedUsers = useMemo(() => {
		if (!sortConfig) return users

		const sorted = [...users].sort((a, b) => {
			const compare = compareFunctions[sortConfig.key](a, b)
			return sortConfig.direction === 'ascending' ? compare : -compare
		})

		return sorted
	}, [users, sortConfig])

	return (
		<div className='app'>
			<SearchBar onSearch={handleSearch} loadUsers={loadUsers} />
			{loading ? (
				<p>Загрузка...</p>
			) : checkUsers ? (
				<UserTable
					users={sortedUsers}
					onSort={handleSort}
					sortConfig={sortConfig}
				/>
			) : (
				<p>Пользователи не найдены</p>
			)}
		</div>
	)
}

export default App
