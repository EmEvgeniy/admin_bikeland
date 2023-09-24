import { useEffect, useState } from "react";
import classes from "./contactsLink.module.css";
import axios from "axios";
import { BsFillTelephoneFill, BsTelegram } from "react-icons/bs";
import { BiSolidSave, BiSolidPencil } from "react-icons/bi";
import { AiOutlineMail, AiOutlineCloseSquare } from "react-icons/ai";

const ContactsLink = () => {
	const [data, setData] = useState([]);
	const [title, setTitle] = useState({});
	const [links, setLinks] = useState("");
	const [active2, setActive2] = useState(false);
	async function getData() {
		try {
			await axios
				.get("https://api.it-test.uz/v1/resources")
				.then((res) => setData(res.data));
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	const handleSubmit = async () => {
		const data = new FormData();
		data.append("data_type", title?.data_type);
		data.append("title", title?.title);
		data.append("text", links);

		if (data) {
			await axios
				.put(`https://api.it-test.uz/v1/resources/${title.id}`, data)
				.then(() => getData());
		}
	};

	return (
		<div className={classes.SocialLinks}>
			<p className={classes.title}>Контактные данные</p>
			<div className={classes.inner}>
				{data
					.filter((el) => el.data_type == "contacts")
					.map((el, index) => (
						<div className={classes.SocialLinks_item} key={index}>
							<span className={classes.icon}>
								<img src={el.photo_url} alt='sas' />
							</span>
							<p className={classes.title}>{el.title}</p>
							<span className={classes.link}>ссылка:</span>
							<div className={classes.btns}>
								<input
									disabled={el.id == title.id ? false : true}
									type='text'
									defaultValue={el.text}
									onChange={(e) => setLinks(e.target.value)}
								/>
								<BiSolidPencil
									onClick={() =>
										setActive2(true) &
										setTitle({
											id: el.id,
											data_type: el.data_type,
											text: el.text,
										})
									}
								/>
							</div>

							<div
								className={
									active2 && el.id == title.id
										? `${classes.btns2} ${classes.active}`
										: `${classes.btns2}`
								}>
								<BiSolidSave onClick={handleSubmit} />
								<AiOutlineCloseSquare
									onClick={() => setActive2(false) & setTitle({})}
								/>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default ContactsLink;
