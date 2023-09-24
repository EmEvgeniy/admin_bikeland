import { useEffect, useState } from "react";
import classes from "./diliveryComp.module.css";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";
import PrimeButton from "../UI/PrimeButton/PrimeButton";

const DiliveryComp = () => {
	const [data, setData] = useState([]);
	const [active, setActive] = useState(false);
	const [active2, setActive2] = useState(false);
	const [photo, setPhoto] = useState(null);
	const [id, setId] = useState(null);
	const [id2, setId2] = useState(null);
	const [id3, setId3] = useState(null);
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const handleChangeStatus = () => {
		setActive2(true);
	};
	const handleChangeStatus2 = () => {
		setActive2(false);
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

	async function getData() {
		try {
			await axios
				.get("https://api.it-test.uz/v1/resources")
				.then((res) => setData(res.data));
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getData();
	}, []);
	const handleSubmit = async () => {
		const dataForm = new FormData();
		dataForm.append("data_type", "dilivery");
		dataForm.append(
			"text",
			text || data.filter((el) => el.data_type === "dilivery")[1]?.text
		);
		dataForm.append(
			"title",
			title || data.filter((el) => el.data_type === "dilivery")[1]?.title
		);

		if (text || title) {
			await axios
				.put(`https://api.it-test.uz/v1/resources/${id3}`, dataForm)
				.then((res) => (res.status === 200 ? getData() : null));
		}
	};
	const handleSubmit2 = async () => {
		const dataForm = new FormData();
		dataForm.append("data_type", "dilivery_photo");
		dataForm.append("photo", photo);

		if (photo) {
			await axios
				.post(`https://api.it-test.uz/v1/resources`, dataForm)
				.then((res) => (res.status === 200 ? getData() : null));
		}
	};
	const handleDelete = async () => {
		if (id) {
			await axios
				.delete(`https://api.it-test.uz/v1/resources/${id}`)
				.then((res) => (res.status === 200 ? getData() : null));
		}
	};
	return (
		<div className={classes.DiliveryComp}>
			<div className={classes.info}>
				<p className={classes.title}>Доставка</p>
				<span className={classes.sub_title}>Заголовок:</span>
				<input
					type='text'
					placeholder=''
					defaultValue={
						data.filter((el) => el.data_type === "dilivery")[1]?.title
					}
					onChange={(e) => setTitle(e.target.value)}
					className={classes.input}
					onClick={() =>
						setId3(data.filter((el) => el.data_type === "dilivery")[1]?.id)
					}
				/>
				<span className={classes.sub_title}>Подзаголовок:</span>
				<textarea
					type='text'
					placeholder=''
					defaultValue={
						data.filter((el) => el.data_type === "dilivery")[1]?.text
					}
					onChange={(e) => setText(e.target.value)}
					onClick={() =>
						setId3(data.filter((el) => el.data_type === "dilivery")[1]?.id)
					}
				/>
				<div className={classes.btns}>
					<PrimeButton title={"Cохранить"} fn={handleSubmit} />
					<span className={classes.upload}>Отмена</span>
				</div>
			</div>
			<div className={classes.photos}>
				<p className={classes.title}>Доставка</p>
				<span className={classes.sub_title}>Фотографии:</span>
				{!active2 ? (
					<div className={classes.content}>
						{data
							.filter((el) => el.data_type === "dilivery_photo")
							.map((el, index) => (
								<div
									key={index}
									className={classes.photo}
									onMouseOver={() => setActive(true) & setId(el.id)}
									onMouseLeave={() => setActive(false) & setId(null)}>
									<img src={el.photo_url} alt='hhh' />
									<BsFillTrashFill
										className={
											active && el.id === id
												? `${classes.icon} ${classes.active}`
												: `${classes.icon}`
										}
										onClick={() => setId2(el.id) & handleDelete()}
									/>
								</div>
							))}
					</div>
				) : (
					<div className={classes.add_wrap}>
						<div className={classes.photo_wrap}>
							{!photo ? null : (
								<img src={URL.createObjectURL(photo)} alt='preview' />
							)}
						</div>
						<div className={classes.btns}>
							<span
								className={classes.select}
								onClick={() => handleSelectFile()}>
								Выбрать
							</span>
							<span className={classes.upload} onClick={() => handleSubmit2()}>
								Загрузить
							</span>
						</div>
					</div>
				)}
				{!active2 ? (
					<PrimeButton title={"Добавить"} fn={handleChangeStatus} />
				) : (
					<PrimeButton title={"отмена"} fn={handleChangeStatus2} />
				)}
			</div>
		</div>
	);
};

export default DiliveryComp;
