/*
 * Этот файл содержит функции сравнения для сортировки пользователей по различным свойствам.
 * Каждая функция получает два пользовательских объекта (a и b) и возвращает отрицательное число, если a меньше b,
 * положительное число, если a больше b, или 0, если они равны.
 * Функция использует метод localeCompare для сравнения строк без учета регистра.
 */

const compareFunctions = {
	name: (a, b) => {
		const nameA = `${a.firstName} ${a.lastName}`.toLowerCase()
		const nameB = `${b.firstName} ${b.lastName}`.toLowerCase()
		return nameA.localeCompare(nameB)
	},
	age: (a, b) => a.age - b.age,
	gender: (a, b) => a.gender.localeCompare(b.gender),
	address: (a, b) => {
		const addressA = `${a.address.city}, ${a.address.address}`.toLowerCase()
		const addressB = `${b.address.city}, ${b.address.address}`.toLowerCase()
		return addressA.localeCompare(addressB)
	},
}

export { compareFunctions }
