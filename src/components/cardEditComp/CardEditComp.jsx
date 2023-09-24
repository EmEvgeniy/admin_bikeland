import { useDispatch, useSelector } from "react-redux";
import classes from "./cardEditComp.module.css";
import PrimeButton from "../UI/PrimeButton/PrimeButton";
import { BiSolidArchiveIn } from "react-icons/bi";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { changeCardStatus, getCardValue } from "../../store/slices/cardSlice";
import { BsFillTrashFill } from "react-icons/bs";

const CardEditComp = () => {
	const value = useSelector((state) => state.card.value);
	const [data, setData] = useState({});
	const [data2, setData2] = useState([]);
	const [data3, setData3] = useState([]);
	const [photo, setPhoto] = useState(null);
	const [active, setActive] = useState(false);
	const [active2, setActive2] = useState(false);
	const [ind, setInd] = useState(null);
	const [id, setId] = useState(null);
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [clirence, setClirence] = useState("");
	const [fuel_consumption, setFuel_consumption] = useState("");
	const [fuel_tank_volume, setFuel_tank_volume] = useState("");
	const [engine, setEngine] = useState("");
	const [max_power, setMax_power] = useState("");
	const [max_speed, setMax_speed] = useState("");
	const [gear, setGear] = useState("");
	const [main_gear, setMain_gear] = useState("");
	const [back_brake, setBack_brake] = useState("");
	const [back_tires, setBack_tires] = useState("");
	const [front_tires, setFront_tires] = useState("");
	const [front_brake, setFront_brake] = useState("");
	const [weight, setWeight] = useState("");
	const [video_link, setVideo_link] = useState("");
	const [show_on_main_page, setShow_on_main_page] = useState(false);
	const [show_on_see_also, setShow_on_see_also] = useState(false);
	const [brand_id, setBrand_id] = useState(
		data3?.filter((el) => el.id === data?.brand_id)[0]?.id
	);
	const [sizes, setSizes] = useState("");
	const [ignition_system, setIgnition_system] = useState("");
	const [gearbox, setGearbox] = useState("");
	console.log(active);
	useEffect(() => {
		setCategoryId(
			toString(data2.filter((el) => el.id === value.category_id)[0]?.id)
		);
		setBrand_id(
			toString(data3.filter((el) => el.id === value.brand_id)[0]?.id)
		);
	}, []);
	async function getProduct() {
		await axios
			.get(`https://api.it-test.uz/v1/products/${value.id}`)
			.then((res) => setData(res.data));
	}
	async function getCategories() {
		await axios
			.get(`https://api.it-test.uz/v1/categories`)
			.then((res) => setData2(res.data));
	}
	async function getBrands() {
		await axios
			.get(`https://api.it-test.uz/v1/brands`)
			.then((res) => setData3(res.data));
	}
	useEffect(() => {
		getCategories();
		getBrands();
		getProduct();
	}, []);

	const handlePhotoSubmit2 = async () => {
		const formData = {
			title: title || data.title,
			description: description || data.description,
			video_link: video_link || data.video_link,
			status_id: 1,
			weight: weight || data.weight,
			clearance: clirence || data.clearance,
			fuel_tank_volume: fuel_tank_volume || data.fuel_tank_volume,
			fuel_consumption: fuel_consumption || data.fuel_consumption,
			engine: engine || data.engine,
			max_power: max_power || data.max_power,
			max_speed: max_speed || data.max_speed,
			gearbox: gear || data.gear,
			ignition_system: ignition_system || data.ignition_system,
			main_gear: main_gear || data.main_gear,
			front_brake: front_brake || data.front_brake,
			back_brake: back_brake || data.back_brake,
			front_tires: front_tires || data.front_tires,
			back_tires: back_tires || data.back_tires,
			show_on_main_page: show_on_main_page || data.show_on_main_page,
			show_on_see_also: show_on_see_also || data.show_on_see_also,
			brand_id: Number(brand_id) || data.brand_id,
			sizes: sizes || data.sizes,
			category_id: Number(categoryId) || data.category_id,
			gearbox: gearbox || data.gearbox,
		};
		if (categoryId && brand_id && data) {
			await axios
				.put(`https://api.it-test.uz/v1/products/${value?.id}`, formData)
				.then((res) =>
					res.status == 200
						? getProduct() && dispatch(changeCardStatus(false))
						: setActive(true)
				);
		} else {
			setActive(true);
		}
	};

	const handleSelectFile = () => {
		// Открываем диалог выбора файла
		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*"; // Ограничиваем тип файлов только изображениями

		fileInput.onchange = (event) => {
			const selectedFile = event.target.files[0];
			if (selectedFile) {
				setPhoto(selectedFile);
			}
		};
		fileInput.click();
		setActive(true);
	};
	const handlePhotoSubmit = async () => {
		const formData = new FormData();
		formData.append("photos", photo);
		if (photo) {
			await axios
				.post(`https://api.it-test.uz/v1/product/photos/${value.id}`, formData)
				.then((res) =>
					res.status == 200 ? getProduct() & setPhoto(null) : null
				);
		}
	};
	const handleDelete = async () => {
		if (ind) {
			await axios
				.delete(`https://api.it-test.uz/v1/product/photos${ind}`)
				.then((res) =>
					res.status == 200 ? getProduct() & setPhoto(null) : null
				);
		}
	};
	return (
		<div className={classes.CardEditComp}>
			<div className={classes.photos}>
				<div className={classes.photos_list}>
					{data?.photos?.map((el, index) => (
						<div
							key={index}
							className={
								active2 && el.id === ind
									? `${classes.photos_item} ${classes.active}`
									: `${classes.photos_item}`
							}
							onMouseOver={() => setActive2(true) & setInd(el.id)}
							onMouseLeave={() => setActive2(false)}>
							<img src={el.photo_url} alt='product' />
							<BsFillTrashFill
								className={
									active2 && el.id === ind
										? `${classes.icon2} ${classes.active}`
										: `${classes.icon2}`
								}
								onClick={() => setInd(el.id) & handleDelete()}
							/>
						</div>
					))}
					{photo && <img src={URL.createObjectURL(photo)} alt='preview' />}
				</div>
				<div className={classes.btns}>
					<PrimeButton title={"загрузить"} fn={handleSelectFile} />
					<span className={classes.back} onClick={() => handlePhotoSubmit()}>
						Сохранить
					</span>
				</div>
			</div>
			<div className={classes.form}>
				<input
					type='text'
					defaultValue={value.title}
					className={classes.input}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<div
					className={
						active
							? `${classes.category} ${classes.active}`
							: `${classes.category}`
					}>
					<select
						defaultValue={categoryId}
						className={
							active
								? `${classes.select} ${classes.active}`
								: `${classes.select}`
						}
						onChange={(e) => setCategoryId(e.target.value)}>
						{data2?.map((el, index) => (
							<option value={Number(el.id)} key={index}>
								{el.name}
							</option>
						))}
					</select>
					<select
						defaultValue={brand_id}
						className={
							active
								? `${classes.select} ${classes.active}`
								: `${classes.select}`
						}
						onChange={(e) => setBrand_id(e.target.value)}>
						{data3?.map((el, index) => (
							<option value={el.id} key={index}>
								{el.name}
							</option>
						))}
					</select>
					<input
						type='text'
						defaultValue={data.uzb_price}
						className={classes.input}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</div>
				<textarea
					className={classes.input}
					defaultValue={data?.description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<div className={classes.conf}>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.weight}
						placeholder='Вес'
						onChange={(e) => setWeight(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.clearance}
						placeholder='Клиренс'
						onChange={(e) => setClirence(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.fuel_consumption}
						placeholder='Объем топливного бака'
						onChange={(e) => setFuel_consumption(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.fuel_tank_volume}
						placeholder='Расход топлива'
						onChange={(e) => setFuel_tank_volume(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.engine}
						placeholder='Двигатель'
						onChange={(e) => setEngine(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.max_power}
						placeholder='Максимальная мощность'
						onChange={(e) => setMax_power(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.max_speed}
						placeholder='Максимальная скорость'
						onChange={(e) => setMax_speed(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.gear}
						placeholder='Коробка передач'
						onChange={(e) => setGear(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.main_gear}
						placeholder='Главная передача'
						onChange={(e) => setMain_gear(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.gearbox}
						placeholder='Коробка передач'
						onChange={(e) => setGearbox(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.front_brake}
						placeholder='Тормоз передний'
						onChange={(e) => setFront_brake(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data?.min_quantity || 0}
						placeholder='кол-во'
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.sizes}
						placeholder='ДхШхВ'
						onChange={(e) => setSizes(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.back_brake}
						placeholder='Тормоз задний'
						onChange={(e) => setBack_brake(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.front_tires}
						placeholder='Шины передние'
						onChange={(e) => setFront_tires(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.ignition_system}
						placeholder='Система зажигания'
						onChange={(e) => setIgnition_system(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.back_tires}
						placeholder='Шины задние'
						onChange={(e) => setBack_tires(e.target.value)}
					/>
					<input
						type='text'
						className={classes.input}
						defaultValue={data.weight}
						placeholder='Вес'
						onChange={(e) => setWeight(e.target.value)}
					/>
				</div>
				<input
					type='text'
					className={classes.input}
					defaultValue={data.video_link}
					placeholder='Видео'
					onChange={(e) => setVideo_link(e.target.value)}
				/>
				<div className={classes.pages}>
					<div className={classes.item}>
						<span>Показать товар на “главной”</span>
						<input
							type='checkbox'
							defaultChecked={value?.show_on_main_page ? true : false}
							onClick={() => setShow_on_main_page(!show_on_main_page)}
						/>
					</div>
					<div className={classes.item}>
						<span>Показать товар на “смотрите так же”</span>
						<input
							type='checkbox'
							defaultChecked={value?.setShow_on_see_also ? true : false}
							onClick={() => setShow_on_see_also(!show_on_see_also)}
						/>
					</div>
				</div>
				<div className={classes.btns}>
					<PrimeButton title={"Сохранить"} fn={handlePhotoSubmit2} />
					<span
						className={classes.back}
						onClick={() => dispatch(changeCardStatus(false))}>
						Назад
					</span>
					<span className={classes.icon}>
						<BiSolidArchiveIn />
					</span>
				</div>
			</div>
		</div>
	);
};

export default CardEditComp;
