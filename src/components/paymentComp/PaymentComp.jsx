import classes from "./paymentComp.module.css";
import payme from "../../assets/image5.png";
import apelsin from "../../assets/image3.png";
import click from "../../assets/image6.png";
import { BsTrashFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import PrimeButton from "../UI/PrimeButton/PrimeButton";
import axios from "axios";

const PaymentComp = () => {
	const [active, setActive] = useState(false);
	const [photo, setPhoto] = useState(null);
	const [list, setList] = useState([]);
	const [title, setTitle] = useState("");

	useEffect(() => {
		async function getData() {
			try {
				await axios
					.get("https://api.it-test.uz/v1/resources")
					.then((res) => setList(res.data));
			} catch (error) {
				console.error(error);
			}
		}
		getData();
	},[]);
	const handleDelete = async (id) => {
		if (id) {
			await axios.delete(`https://api.it-test.uz/v1/resources/${id}`);
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
	};

	const handleClearSelection = () => {
		// Сбрасываем выбранное фото
		setPhoto(null);
	};
	const handleSubmit = async () => {
		const data = new FormData();
		data.append("data_type", "payment");
		data.append("title", title);
		data.append("photo", photo);

		if (data && photo && title) {
			await axios.post(`https://api.it-test.uz/v1/resources`, data);
		}
	};

	return (
		<div className={classes.PaymentComp}>
			<p>Способы оплаты</p>
			<div className={classes.inner}>
				{!active ? (
					<div className={classes.list}>
						{list
							.filter((el) => el.data_type === "payment")
							.map((el, index) => (
								<div key={index} className={classes.list_item}>
									<img src={el.photo_url} alt='imgsda' />
									<div className={classes.list_item_btns}>
										<p className={classes.list_item_btns_title}>{el.title}</p>
										<span onClick={() => handleDelete(el.id)}>
											<BsTrashFill />
										</span>
									</div>
								</div>
							))}
					</div>
				) : (
					<div className={classes.add_wrap}>
						<div className={classes.photo_wrap}>
							{photo ? (
								<img src={URL.createObjectURL(photo)} alt='chs' />
							) : (
								<div className={classes.input} onClick={handleSelectFile}>
									<AiOutlinePlus />
									<p>Нажмите сюда, чтобы выбрать фотографию из компьютера</p>
								</div>
							)}
						</div>
						<div className={classes.add_wrap_btns}>
							<input
								type='text'
								className={classes.input_text}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<div className={classes.add_wrap_btns_btns}>
								<PrimeButton title={"Готово"} fn={handleSubmit} />
								<span
									className={classes.reset}
									onClick={() => setActive(false)}>
									Отменить
								</span>
							</div>
						</div>
					</div>
				)}
				<span className={classes.add} onClick={() => setActive(true)}>
					<AiOutlinePlus />
				</span>
			</div>
		</div>
	);
};

export default PaymentComp;
