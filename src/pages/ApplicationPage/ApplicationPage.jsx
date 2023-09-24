import { useEffect, useState } from "react";
import AppCard from "../../components/UI/appCard/AppCard";
import AppFilter from "../../components/UI/appFilter/AppFilter";
import AppFilteration from "../../components/UI/appFilteration/AppFilteration";
import classes from "./applicationPage.module.css";
import { Pagination } from "@mui/material";
import axios from "axios";
const data = [
	{ title: "Ducati Panigale Superleggera V4" },
	{ title: "Ducati Panigale Superleggera V4" },
	{ title: "Ducati Panigale Superleggera V4" },
	{ title: "Ducati Panigale Superleggera V4" },
	{ title: "Ducati Panigale Superleggera V4" },
	{ title: "Ducati Panigale Superleggera V4" },
	{ title: "Ducati Panigale Superleggera V4" },
	{ title: "Ducati Panigale Superleggera V4" },
	{ title: "Ducati Panigale Superleggera V4" },
	{ title: "Ducati Panigale Superleggera V4" },
	{ title: "Ducati Panigale Superleggera V4" },
	{ title: "Ducati Panigale Superleggera V4" },
];
const ApplicationPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [newsPerPage] = useState(3);
	const lastNewsIndex = currentPage * newsPerPage;
	const firstNewsIndex = lastNewsIndex - newsPerPage;
	const handleChangePage = (event, newPage) => {
		setCurrentPage(newPage);
	};
	const [data, setData] = useState([]);
	async function getOrders() {
		await axios
			.get("https://api.it-test.uz/v1/orders?page=1&page_size=100")
			.then((res) => setData(res.data));
	}
	console.log(data);
	useEffect(() => {
		getOrders();
	}, []);
	return (
		<div className={classes.ApplicationPage}>
			<div className={classes.header}>
				<AppFilter />
				<AppFilteration />
			</div>
			<div className={classes.content}>
				{data.slice(firstNewsIndex, lastNewsIndex).map((el, index) => (
					<AppCard data={el} key={index} />
				))}
			</div>
			<div className={classes.bottom}>
				<Pagination
					count={Math.ceil(data.length / newsPerPage)}
					sx={{ my: "30px" }}
					page={currentPage}
					color='error'
					onChange={handleChangePage}
				/>
			</div>
		</div>
	);
};

export default ApplicationPage;
