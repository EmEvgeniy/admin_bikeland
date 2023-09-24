import { useState } from "react";
import classes from "./photoPopUp.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changePhotoStatus } from "../../../store/slices/photoSlice";

const PhotoPopUp = () => {
	const status = useSelector((state) => state.photo.value);
	const dispatch = useDispatch();
	const [photo, setPhoto] = useState(null);

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
				<AiOutlineCloseCircle
					className={classes.close}
					onClick={() => dispatch(changePhotoStatus(false))}
				/>
				{photo ? (
					<img src={URL.createObjectURL(photo)} alt='chs' />
				) : (
					<div className={classes.input} onClick={handleSelectFile}>
						<AiOutlinePlus />
						<p>Нажмите сюда, чтобы выбрать фотографию из компьютера</p>
					</div>
				)}
				<div className={classes.btns}>
					<span className={classes.upload}>Загрузить</span>
					{photo && (
						<>
							<span className={classes.change} onClick={handleSelectFile}>
								Выбрать другой
							</span>
							<span className={classes.clear} onClick={handleClearSelection}>
								Очистить
							</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PhotoPopUp;
