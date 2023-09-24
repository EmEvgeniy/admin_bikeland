import classes from "./card.module.css";
import { BiPencil, BiSolidArchiveIn } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
	changeCardStatus,
	getCardValue,
} from "../../../store/slices/cardSlice";

const Card = ({ data, index }) => {
	const dispatch = useDispatch();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ delay: `0.${index}`, duration: 0.3 }}
			className={classes.Card}>
			<div className={classes.img}>
				{data.photos.length ? (
					<img src={data.photos[0].photo_url} alt='imagess' />
				) : null}
			</div>
			<div className={classes.content}>
				<p className={classes.title}>{data.title}</p>
				<div className={classes.mid}>
					<p className={classes.price}>{data.uzb_price} sum</p>
					<p className={classes.quantity}>{data.quantity}</p>
				</div>
				<p className={classes.cite}>Bikeland.uz</p>
				<div className={classes.btns}>
					<div
						className={classes.edit}
						onClick={() =>
							dispatch(getCardValue(data)) & dispatch(changeCardStatus(true))
						}>
						<span>Редактировать</span>
						<BiPencil />
					</div>
					<span className={classes.archive}>
						<BiSolidArchiveIn />
					</span>
				</div>
			</div>
		</motion.div>
	);
};

export default Card;
