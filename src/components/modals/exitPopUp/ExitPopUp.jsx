import { useDispatch, useSelector } from "react-redux";
import classes from "./exitPopUp.module.css";
import { useNavigate } from "react-router-dom";
import { setExitSlice } from "../../../store/slices/exitSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import PrimeButton from "../../UI/PrimeButton/PrimeButton";

const ExitPopUp = () => {
	const status = useSelector((state) => state.exit.value);
	const [user, setUser] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	async function getUser() {
	// 		try {
	// 			await axios
	// 				.get("https://api.it-test.uz/v1/users/me", {
	// 					headers: {
	// 						Authorization: `Bearer ${sessionStorage.getItem("token")}`,
	// 					},
	// 				})
	// 				.then((res) => setUser(res.data));
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	}
	// 	getUser();
	// }, []);

	const handleClick = () => {
		sessionStorage.setItem("token", "");
		navigate("/");
		dispatch(setExitSlice(false));
	};

	return (
		<div
			className={
				status
					? `${classes.ExitPopUp} ${classes.active}`
					: `${classes.ExitPopUp}`
			}>
			<div
				className={
					status ? `${classes.inner} ${classes.active}` : `${classes.inner}`
				}>
				<AiOutlineCloseCircle
					className={classes.close}
					onClick={() => dispatch(setExitSlice(false))}
				/>
				<div className={classes.logo}>
					{user?.photo ? <img src={user?.photo} /> : null}
				</div>
				<p>
					{user?.full_name ? user?.full_name : "Sss"} вы хотите покинуть админ
					панель?
				</p>
				<PrimeButton title={"Выход"} fn={handleClick} />
			</div>
		</div>
	);
};

export default ExitPopUp;
