import styled from './ModalUser.module.scss'

export const ModalUser = ({ user, setOpenModal, setCurrentUserModal }) => {
	const closeModal = () => {
		setOpenModal(false)
		setCurrentUserModal({})
	}

	return (
		<div className={styled.modal}>
			<div className={styled.container}>
				<ul className={styled.list}>
					<li className={styled.item}>
						<b>ФИО: </b>
						{user.firstName} {user.lastName}
					</li>
					<li className={styled.item}>
						<b>Возраст: </b>
						{user.age} лет
					</li>
					<li className={styled.item}>
						<b>Адрес: </b>
						{user.address.city}, {user.address.address}
					</li>
					<li className={styled.item}>
						<b>Рост: </b>
						{user.height} см.
					</li>
					<li className={styled.item}>
						<b>Вес: </b>
						{user.weight} кг.
					</li>
					<li className={styled.item}>
						<b>Номер телефона: </b>
						{user.phone}
					</li>
					<li className={styled.item}>
						<b>Email: </b>
						{user.email}
					</li>
				</ul>
				<div className={styled.btn_container}>
					<button className={styled.btn} onClick={() => closeModal()}>
						Закрыть
					</button>
				</div>
			</div>
		</div>
	)
}
