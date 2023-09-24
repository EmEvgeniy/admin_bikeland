import { useEffect, useRef, useState } from "react";
import classes from "./filterComp.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { RxCalendar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { changeDateStatus } from "../../../store/slices/dateSlice";

const list = [
	"Последние 7 дней",
	"Последние 30 дней",
	"Произвольная дата (выбрать)",
];

const FilterComp = () => {
	const [active, setActive] = useState(false);
	const [title, setTitle] = useState("Последние 7 дней");
	const filterRed = useRef(null);
	const dispatch = useDispatch();

	const handleClickOutside = (e) => {
		if (filterRed.current && !filterRed.current.contains(e.target)) {
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
				ref={filterRed}
				onClick={() => setActive(true)}>
				<span
					className={
						active
							? `${classes.icon_wrap} ${classes.active}`
							: `${classes.icon_wrap}`
					}>
					<RxCalendar className={classes.icon} />
				</span>
				<div className={classes.title_wrap}>
					<p>Фильтр периода</p>
					<p>{title}</p>
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
						onClick={() =>
							el !== "Произвольная дата (выбрать)"
								? setTitle(el)
								: dispatch(changeDateStatus(true))
						}
						key={index}>
						{el}
					</p>
				))}
			</div>
		</div>
	);
};

export default FilterComp;
