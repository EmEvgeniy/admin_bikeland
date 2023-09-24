import { useEffect, useRef, useState } from "react";
import classes from "./appFilteration.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import { useDispatch } from "react-redux";

const list = [
	{ title: "Опубликованные", value: "" },
	{ title: "Не заполнены", value: "" },
	{ title: "В архиве", value: "" },
	{ title: "По новинкам", value: "" },
	{ title: "По популярности", value: "" },
	{ title: "По бренду", value: "" },
	{ title: "Наличие: есть", value: "" },
	{ title: "Наличие: нет", value: "" },
	{ title: "Наличие: нет", value: "" },
	{ title: "Цена: по возрастанию", value: "" },
	{ title: "Цена: по убыванию", value: "" },
];

const AppFilteration = () => {
	const [active, setActive] = useState(false);
	const [title, setTitle] = useState("По умолчанию");
	const filterRed3 = useRef(null);
	const dispatch = useDispatch();

	const handleClickOutside = (e) => {
		if (filterRed3.current && !filterRed3.current.contains(e.target)) {
			setActive(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div className={classes.FilterComp}>
			<div
				className={
					active
						? `${classes.FilterComp_wrap} ${classes.active}`
						: `${classes.FilterComp_wrap}`
				}
				ref={filterRed3}
				onClick={() => setActive(true)}>
				<span
					className={
						active
							? `${classes.icon_wrap} ${classes.active}`
							: `${classes.icon_wrap}`
					}>
					<FiFilter className={classes.icon} />
				</span>
				<div className={classes.title_wrap}>
					<p>Сортировка по</p>
					<p style={{ fontWeight: 400 }}>{title}</p>
				</div>
				<IoIosArrowDown
					className={
						active ? `${classes.icon2} ${classes.active}` : `${classes.icon2}`
					}
				/>
			</div>
			<div
				className={
					active ? `${classes.list} ${classes.active}` : `${classes.list}`
				}>
				{list.map((el, index) => (
					<p
						className={classes.list_item}
						onClick={() => setTitle(el.title)}
						key={index}>
						{el.title}
					</p>
				))}
			</div>
		</div>
	);
};

export default AppFilteration;
