import { useEffect, useState } from "react";
import {
	Card,
	CardEditComp,
	FilterProductCount,
	GoodsFilter,
} from "../../components";
import classes from "./goodsPage.module.css";
import axios from "axios";
import img from "../../assets/image3.png";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import AppCard from "../../components/UI/appCard/AppCard";



const GoodsPage = () => {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [newsPerPage] = useState(3);
	const lastNewsIndex = currentPage * newsPerPage;
	const firstNewsIndex = lastNewsIndex - newsPerPage;
	const status = useSelector((state) => state.card.status);
	const handleChangePage = (event, newPage) => {
		setCurrentPage(newPage);
	};

	useEffect(() => {
		const getData = async () => {
			await axios
				.get("https://api.it-test.uz/v1/products")
				.then((res) => setData(res.data));
		};
		getData();
	}, []);
	return (
		<div className={classes.GoodsPage}>
			{!status ? (
				<div className={classes.inner}>
					<div className={classes.GoodsPage_header}>
						<GoodsFilter />
						<FilterProductCount />
					</div>
					<div className={classes.content}>
						{data.slice(firstNewsIndex, lastNewsIndex).map((el, index) => (
							<Card data={el} key={index} index={index} />
						))}
					</div>
					<div className={classes.bottom}>
						<span className={classes.archive}>Архив</span>
						<Pagination
							count={Math.ceil(data.length / newsPerPage)}
							sx={{ my: "30px" }}
							page={currentPage}
							color='error'
							onChange={handleChangePage}
						/>
					</div>
				</div>
			) : (
				<CardEditComp />
			)}
		</div>
	);
};

export default GoodsPage;
