const BASE_URL = 'https://dummyjson.com'

const fetchUsers = async () => {
	try {
		const response = await fetch(`${BASE_URL}/users`)
		if (!response.ok) {
			throw new Error('Ошибка при загрузке пользователей')
		}
		const data = await response.json()
		return data.users
	} catch (error) {
		throw new Error('Ошибка при загрузке пользователей')
	}
}

const filterNameUsers = async query => {
	try {
		const response = await fetch(
			`${BASE_URL}/users/filter?key=firstName&value=${query}`
		)
		if (!response.ok) {
			throw new Error('Пользователь не найден')
		}
		const data = await response.json()
		return data.users
	} catch (error) {
		throw new Error('Пользователь не найден')
	}
}

export { fetchUsers, filterNameUsers }
