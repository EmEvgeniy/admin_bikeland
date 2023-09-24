import classes from "./asideMenu.module.css";
import logo from "../../../assets/logo2.webp";
import {
	BsGraphUpArrow,
	BsGlobe,
	BsFillBoxSeamFill,
	BsFillPersonLinesFill,
} from "react-icons/bs";
import { IoIosListBox } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNavItem } from "../../../store/slices/navSlice";
import { useEffect } from "react";
import { changeBurgerStatus } from "../../../store/slices/burgerSlice";

const navItems = [
	{
		title: "Статистика по показам",
		link: "view_statistics",
		icon: <BsGraphUpArrow />,
	},
	{
		title: "Статистика по заказам",
		link: "order_statistics",
		icon: <BsGraphUpArrow />,
	},
	{ title: "Блоки", link: "blocks", icon: <BsGlobe /> },
	{ title: "Страницы", link: "pages", icon: <IoDocumentText /> },
	{ title: "Товары", link: "goods", icon: <BsFillBoxSeamFill /> },
	{ title: "Заявки/Звонки", link: "application", icon: <IoIosListBox /> },
	{ title: "Сотрудники", link: "", icon: <BsFillPersonLinesFill /> },
	{ title: "Счета", link: "", icon: <LiaClipboardListSolid /> },
];

const AsideMenu = () => {
	const item = useSelector((state) => state.nav.value);
	const status = useSelector((state) => state.burger.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const link = navItems.filter((el) => el.title == item);

		navigate(link[0].link);
	}, []);
	const handleClick = (el) => {
		dispatch(setNavItem(el));
	};
	return (
		<aside
			className={
				status
					? `${classes.AsideMenu} ${classes.active}`
					: `${classes.AsideMenu}`
			}>
			<div className={classes.logo}>
				<img src={logo} alt='logo' />
			</div>
			<div className={classes.nav}>
				{navItems.map((el, index) => (
					<Link
						key={index}
						className={
							item === el.title
								? `${classes.nav_item} ${classes.active}`
								: `${classes.nav_item}`
						}
						to={el.link}
						onClick={() =>
							handleClick(el.title) & dispatch(changeBurgerStatus(false))
						}>
						<span>{el.icon}</span>
						<span>{el.title}</span>
					</Link>
				))}
			</div>
		</aside>
	);
};

export default AsideMenu;
