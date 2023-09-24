import classes from "./appCard.module.css";
import PrimeButton from "../../UI/PrimeButton/PrimeButton";

const AppCard = ({ data }) => {
	return (
		<div className={classes.AppCard}>
			<p>Номер заказа: #{data.id}</p>
			<input
				type='text'
				defaultValue={data.name}
				className={classes.input}
				placeholder='Имя клиента'
			/>
			<div className={classes.top}>
				<input
					type='text'
					defaultValue={data.phone_number}
					className={classes.input}
					placeholder=''
				/>
				<input
					type='text'
					defaultValue={data.region}
					className={classes.input}
					placeholder='Город'
				/>
			</div>
			<input
				type='text'
				defaultValue={"Посоветовали друзья, Instagram"}
				className={classes.input}
				placeholder='Источник'
			/>
			<div className={classes.top}>
				<input
					type='text'
					defaultValue={data.total_price}
					className={classes.input}
					placeholder='цена'
				/>
				<input
					type='text'
					defaultValue={data.quantity}
					className={classes.input}
					placeholder='Кол-во'
				/>
			</div>
			<div className={classes.top}>
				<input
					type='text'
					defaultValue={"Ducati"}
					className={classes.input}
					placeholder='марка'
				/>
				<input
					type='text'
					defaultValue={"Bikeland.uz"}
					className={classes.input}
					placeholder='источник'
				/>
			</div>
			<a className={classes.url} href={data.chat_url || "#"}>Начать чат</a>
		</div>
	);
};

export default AppCard;
