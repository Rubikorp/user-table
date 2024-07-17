import { useState } from 'react'
import styled from './SearchBar.module.scss'

export const SearchBar = ({ onSearch, loadUsers }) => {
	const [query, setQuery] = useState('')

	const handleInputChange = e => {
		setQuery(e.target.value)
	}

	const handleSearch = e => {
		e.preventDefault()
		let result = query.toLowerCase()
		result = result.charAt(0).toUpperCase() + result.slice(1)
		onSearch(result)
		setQuery('')
	}

	return (
		<form className={styled.searchBar} onSubmit={handleSearch}>
			<input
				type='text'
				value={query}
				onChange={handleInputChange}
				placeholder='Введите имя пользователя...'
			/>
			<button type='submit'>Поиск</button>
			<button onClick={loadUsers}>Сброс</button>
		</form>
	)
}
