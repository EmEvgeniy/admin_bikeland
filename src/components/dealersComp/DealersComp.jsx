import classes from "./dealersComp.module.css";
import ReactIframe from "react-iframe";
import { BiSolidPencil } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetLocationsQuery } from "../../store/middleWares/DealersApi";
import { useEffect, useState } from "react";
import PrimeButton from "../UI/PrimeButton/PrimeButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
	addDealersItem,
	changeDealerStatus,
} from "../../store/slices/dealersSlice";
// https://yandex.com/map-widget/v1/?um=constructor%3Ae8ed7732575d940a509019b05ae15d5f0129823e2b1c8952e26df0a58344a60a&amp;source=constructor
const DealersComp = () => {
	const [data, setData] = useState([]);
	const [active, setActive] = useState(false);
	const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");
	const dispatch = useDispatch();
	async function getData() {
		try {
			await axios
				.get("https://api.it-test.uz/v1/dealers")
				.then((res) => setData(res.data));
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	const handleSubmit = async () => {
		const data = {
			city: title,
			address: "",
			landmark: "",
			phone_number: "",
			location: url,
			created_at: "string",
		};

		if (data && title && url) {
			await axios
				.post(`https://api.it-test.uz/v1/dealers`, data)
				.then(() => getData());
		}
	};
	const handleDelete = async (id) => {
		if (id) {
			await axios
				.delete(`https://api.it-test.uz/v1/dealers/${id}`)
				.then(() => getData());
		}
	};

	return (
		<>
			{data.length ? (
				<div className={classes.DealersComp}>
					<p className={classes.title}>Дилеры</p>
					<div className={classes.inner}>
						{active ? (
							<div className={classes.create_wrap}>
								<div className={classes.loc}>
									{url ? (
										<ReactIframe
											url={url}
											width='100%'
											height='200'
											title='Tashkent'
											loading='lazy'
											frameBorder={0}
										/>
									) : (
										<p>
											Здесь отобразится ваша геолокация, которую вы вписали в
											графе ссылки
										</p>
									)}
								</div>
								<div className={classes.form}>
									<input
										type='text'
										placeholder='Ссылка локации'
										onChange={(e) => setUrl(e.target.value)}
									/>
									<input
										type='text'
										placeholder='Наименование'
										onChange={(e) => setTitle(e.target.value)}
									/>
									<div className={classes.btns}>
										<PrimeButton title={"Готово"} fn={handleSubmit} />
										<span
											className={classes.close}
											onClick={() => setActive(false)}>
											Отменить
										</span>
									</div>
								</div>
							</div>
						) : (
							<div className={classes.list}>
								{data.map((el, index) => (
									<div className={classes.list_item} key={index}>
										<ReactIframe
											url={el.location}
											width='100%'
											height='200'
											title='Tashkent'
											loading='lazy'
											frameBorder={0}
										/>
										<p className={classes.title}>{el.city}</p>
										<div className={classes.btns}>
											<p
												className={classes.edit}
												onClick={() =>
													dispatch(changeDealerStatus(true)) &
													dispatch(addDealersItem(el))
												}>
												<span>Редактировать</span>
												<BiSolidPencil />
											</p>
											<span className={classes.delete}>
												<BsTrashFill onClick={() => handleDelete(el.id)} />
											</span>
										</div>
									</div>
								))}
							</div>
						)}
						<span className={classes.addd}>
							<AiOutlinePlus onClick={() => setActive(true)} />
						</span>
					</div>
				</div>
			) : null}
		</>
	);
};

export default DealersComp;
