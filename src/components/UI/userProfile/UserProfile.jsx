import { useEffect, useRef, useState } from "react";
import classes from "./userProfile.module.css";
import { useDispatch } from "react-redux";
import { BiExit } from "react-icons/bi";
import { setExitSlice } from "../../../store/slices/exitSlice";
import { changePhotoStatus } from "../../../store/slices/photoSlice";

const UserProfile = () => {
	const [photo, setPhoto] = useState(null);
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();
	const rootRef = useRef(null);

	const handleClickOutside = (e) => {
		if (rootRef.current && !rootRef.current.contains(e.target)) {
			setActive(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);
	useEffect(() => {
		setPhoto(null);
	}, []);
	return (
		<div className={classes.UserProfile}>
			<div
				className={classes.photo_profile}
				ref={rootRef}
				onClick={() => setActive(true)}>
				{photo ? (
					<img src={photo} alt='user_photo' />
				) : (
					<span className={classes.fake_photo}>A</span>
				)}
			</div>
			<div
				className={
					active ? `${classes.menu} ${classes.active}` : `${classes.menu}`
				}>
				<p onClick={() => dispatch(changePhotoStatus(true))}>
					Поменять фотографию
				</p>
				<span
					className={classes.exit}
					onClick={() => dispatch(setExitSlice(true))}>
					Выйти <BiExit />
				</span>
			</div>
		</div>
	);
};

export default UserProfile;
