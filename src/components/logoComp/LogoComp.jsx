import { useEffect, useState } from "react";
import classes from "./logoComp.module.css";
import logo from "../../assets/logo2.webp";
import PrimeButton from "../UI/PrimeButton/PrimeButton";
import axios from "axios";

const LogoComp = () => {
	const [data, setData] = useState({});
	const [photo, setPhoto] = useState(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		async function getData() {
			try {
				await axios
					.get("https://api.it-test.uz/v1/resources")
					.then((res) =>
						setData(res.data.filter((el) => el.data_type === "logo")[0])
					);
			} catch (error) {
				console.error(error);
			}
		}
		getData();
	}, []);
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
	const handleClearSelection = () => {
		// Сбрасываем выбранное фото
		setPhoto(null);
	};

	const handleSubmit = async () => {
		const dataForm = new FormData();
		dataForm.append("data_type", data?.data_type);
		dataForm.append("text", "lo2");
		dataForm.append("title", data?.title);
		dataForm.append("photo", photo);

		if (photo && dataForm) {
			await axios
				.put(`https://api.it-test.uz/v1/resources/${data?.id}`, dataForm)
				.then((res) => console.log(res.data));
		}
	};
	return (
		<div className={classes.LogoComp}>
			<div className={classes.photo_wrap}>
				{!photo ? (
					<img src={data?.photo_url} alt='logo' />
				) : (
					<img src={URL.createObjectURL(photo)} alt='preview' />
				)}
			</div>
			<span className={classes.text}>
				Размер логотипа не меньше 470х100 и не больше 940х200. Формат логотипа:
				svg, png
			</span>
			{!active ? (
				<PrimeButton title={"Загрузить"} fn={handleSelectFile} />
			) : (
				<div className={classes.btns}>
					<span className={classes.save} onClick={handleSubmit}>
						Сохранить
					</span>
					<span className={classes.reset} onClick={() => setActive(false)}>
						Отменить
					</span>
				</div>
			)}
		</div>
	);
};

export default LogoComp;
