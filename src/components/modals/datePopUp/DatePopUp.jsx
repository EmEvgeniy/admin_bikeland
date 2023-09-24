import { useDispatch, useSelector } from "react-redux";
import classes from "./datePopUp.module.css";
import CalendarDate from "./calendarDate/CalendarDate";
import { changeDateStatus } from "../../../store/slices/dateSlice";
import PrimeButton from "../../UI/PrimeButton/PrimeButton";

const DatePopUp = () => {
	const status = useSelector((state) => state.date.status);
	const dispatch = useDispatch();

	const handleClick = () => {
		// dispatch(getDataValue({from: }))
		dispatch(changeDateStatus(false));
	};
	return (
		<div
			className={
				status
					? `${classes.DatePopUp} ${classes.active}`
					: `${classes.DatePopUp}`
			}>
			<div
				className={
					status ? `${classes.inner} ${classes.active}` : `${classes.inner}`
				}>
				<CalendarDate />
				<PrimeButton title={"Выбрать"} fn={handleClick} />
			</div>
		</div>
	);
};

export default DatePopUp;
