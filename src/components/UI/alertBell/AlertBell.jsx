import { Link } from "react-router-dom";
import classes from "./alertBell.module.css";
import { FaRegBell } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import axios from "axios";

const AlertBell = () => {
	// const [num, setNum] = useState(null);

	// useEffect(() => {
	// 	const getNum = async () => {
	// 		try {
	// 			await axios
	// 				.get(`https://api.it-test.uz/v1/users/me/`, {
	// 					headers: {
	// 						Authorization: `Bearer ${sessionStorage.getItem("token")}`,
	// 					},
	// 				})
	// 				.then((res) => setNum(res.data));
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};
	// 	getNum();
	// }, []);

	return (
		<div className={classes.AlertBell}>
			<Link to={""}>
				<FaRegBell />
			</Link>
			<span className={classes.num}>1</span>
		</div>
	);
};

export default AlertBell;
