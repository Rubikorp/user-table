import { useState } from 'react'
import styled from './UserTable.module.scss'
export const UserTable = ({ users, onSort, sortConfig }) => {
	const [columnWidths, setColumnWidths] = useState({
		name: 150,
		age: 100,
		gender: 100,
		address: 200,
	})

	const getSortIcon = column => {
		if (!sortConfig || sortConfig.key !== column) return null
		return sortConfig.direction === 'ascending' ? '↑' : '↓'
	}

	/*
			// Обработчик события нажатия кнопки мыши на изменение ширины столбца.
      // Запоминаем координаты клика и текущую ширину столбца.
      // Добавляем обработчик событий для движения мыши (mousemove) и подъема мыши (mouseup).
      // В обработчике движения мыши вычисляем новую ширину столбца и устанавливаем ее в состояние columnsWidths.
      // В обработчике подъема мыши удаляем прослушиватели событий из объекта документа.
      // Это позволит изменять ширину столбцов автоматически при изменении ширины
	*/
	const handleSort = column => {
		let direction = 'ascending'
		if (
			sortConfig &&
			sortConfig.key === column &&
			sortConfig.direction === 'ascending'
		) {
			direction = 'descending'
		} else if (
			sortConfig &&
			sortConfig.key === column &&
			sortConfig.direction === 'descending'
		) {
			direction = null
		}
		onSort(column, direction)
	}

	const handleMouseDown = (e, column) => {
		const startX = e.clientX
		const startWidth = columnWidths[column]

		const handleMouseMove = e => {
			const newWidth = Math.max(50, startWidth + e.clientX - startX)
			setColumnWidths(prevWidths => ({
				...prevWidths,
				[column]: newWidth,
			}))
		}

		/*
			// Добавляем прослушиватели событий для перемещения мыши и подъема мыши для изменения ширины столбца
      // Когда кнопка мыши отпущена, удаляем прослушиватели событий из объекта документа.
      // Обновляем состояние columnsWidths, добавляя новое значение ширины.
      // Это вызовет повторную визуализацию таблицы с применением новой ширины столбцов.
		*/
		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	return (
		<table className={styled.userTable}>
			<thead>
				<tr>
					<th
						style={{ width: columnWidths.name }}
						onClick={() => handleSort('name')}
					>
						ФИО {getSortIcon('name')}
						<div
							className={styled.resizer}
							onMouseDown={e => handleMouseDown(e, 'name')}
						/>
					</th>
					<th
						style={{ width: columnWidths.age }}
						onClick={() => handleSort('age')}
					>
						Возраст {getSortIcon('age')}
						<div
							className={styled.resizer}
							onMouseDown={e => handleMouseDown(e, 'age')}
						/>
					</th>
					<th
						style={{ width: columnWidths.gender }}
						onClick={() => handleSort('gender')}
					>
						Пол {getSortIcon('gender')}
						<div
							className={styled.resizer}
							onMouseDown={e => handleMouseDown(e, 'gender')}
						/>
					</th>
					<th
						style={{ width: columnWidths.address }}
						onClick={() => handleSort('address')}
					>
						Адрес {getSortIcon('address')}
						<div
							className={styled.resizer}
							onMouseDown={e => handleMouseDown(e, 'address')}
						/>
					</th>
				</tr>
			</thead>
			<tbody>
				{users.map(user => (
					<tr key={user.id}>
						<td>{`${user.firstName} ${user.lastName}`}</td>
						<td>{user.age}</td>
						<td>{user.gender}</td>
						<td>{`${user.address.city}, ${user.address.address}`}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
