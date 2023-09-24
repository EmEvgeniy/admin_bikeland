import { useState } from "react";
import { changeDealerStatus } from "../../../store/slices/dealersSlice";
import PrimeButton from "../../UI/PrimeButton/PrimeButton";
import classes from "./dealersPopup.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const DealersPopup = () => {
	const status = useSelector((state) => state.dealer.status);
	const value = useSelector((state) => state.dealer.value);
	const dispatch = useDispatch();
	const [city, setCity] = useState(value?.city);
	const [address, setAddress] = useState(value?.address);
	const [landmark, setLandmark] = useState(value?.landmark);
	const [phone_number, setPhone_number] = useState(value?.phone_number);
	const [location, setLocation] = useState(value?.location);
	const handleSubmit = async () => {
		const data = {
			city: city,
			address: address,
			landmark: landmark,
			phone_number: phone_number,
			location: location,
		};
		if (city && address && landmark && phone_number && location) {
			await axios
				.put(`https://api.it-test.uz/v1/dealers/${value?.id}`, data)
				.then((res) =>
					res.status === 200 ? dispatch(changeDealerStatus(false)) : null
				);
		}
	};
	return (
		<div
			className={
				status
					? `${classes.PhotoPopUp} ${classes.active}`
					: `${classes.PhotoPopUp}`
			}>
			<div
				className={
					status ? `${classes.inner} ${classes.active}` : `${classes.inner}`
				}>
				<p>Редактировать шоурум</p>
				<div className={classes.form}>
					<span>Город:</span>
					<input
						type='text'
						placeholder=''
						defaultValue={value?.city}
						onChange={(e) => setCity(e.target.value)}
					/>
					<span>Адрес:</span>
					<input
						type='text'
						placeholder=''
						defaultValue={value?.address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<span>Ориентир:</span>
					<input
						type='text'
						placeholder=''
						defaultValue={value?.landmark}
						onChange={(e) => setLandmark(e.target.value)}
					/>
					<span>Телефон:</span>
					<input
						type='text'
						placeholder=''
						defaultValue={value?.phone_number}
						onChange={(e) => setPhone_number(e.target.value)}
					/>
					<span>Ссылка на Яндекс карты:</span>
					<input
						type='text'
						placeholder=''
						defaultValue={value?.location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</div>
				<div className={classes.btns}>
					<PrimeButton title={"Сохранить"} fn={handleSubmit} />
					<span
						className={classes.change}
						onClick={() => dispatch(changeDealerStatus(false))}>
						Отменить
					</span>
				</div>
			</div>
		</div>
	);
};

export default DealersPopup;
