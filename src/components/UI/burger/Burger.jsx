import { useDispatch, useSelector } from "react-redux";
import classes from "./burger.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { changeBurgerStatus } from "../../../store/slices/burgerSlice";

const Burger = () => {
	const status = useSelector((state) => state.burger.value);
	const dispatch = useDispatch();
	return (
		<div className={classes.Burger} onClick={() => dispatch(changeBurgerStatus(!status))}>
			{!status ? <GiHamburgerMenu /> : <AiOutlineClose />}
		</div>
	);
};

export default Burger;
