import { useEffect, useState } from "react";
import classes from "./socialLinks.module.css";
import axios from "axios";
import {
	FaFacebookF,
	FaInstagram,
	FaTelegramPlane,
	FaYoutube,
} from "react-icons/fa";
import { BiSolidPencil, BiSolidSave } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";

const SocialLinks = () => {
	const [data, setData] = useState([]);
	const [title, setTitle] = useState({});
	const [links, setLinks] = useState("");
	const [active2, setActive2] = useState(false);
	useEffect(() => {
		async function getData() {
			try {
				await axios
					.get("https://api.it-test.uz/v1/resources")
					.then((res) => setData(res.data));
			} catch (error) {
				console.error(error);
			}
		}
		getData();
	}, []);

	const handleSubmit = async () => {
		const data = new FormData();
		data.append("data_type", title?.data_type);
		data.append("title", title?.title);
		data.append("text", links);

		if (data) {
			await axios.put(`https://api.it-test.uz/v1/resources/${title.id}`, data);
		}
	};

	return (
		<div className={classes.SocialLinks}>
			<p className={classes.title}>Социальные сети</p>
			<div className={classes.list}>
				{data.length
					? data
							.filter((el) => el.data_type == "socila_links")
							.map((el, index) => (
								<div className={classes.SocialLinks_item} key={index}>
									<div className={classes.SocialLinks_item_photo}>
										{el.photo_url ? <img src={el.photo_url} /> : null}
									</div>
									<p className={classes.title}>{el.data_type}</p>
									<span className={classes.link}>ссылка:</span>
									<div className={classes.btns}>
										<input
											disabled={el.id == title.id ? false : true}
											type='text'
											defaultValue={el.text}
											onChange={(e) => setLinks(e.target.value)}
										/>
										<BiSolidPencil
											onClick={() => setActive2(true) & setTitle(el)}
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
							))
					: null}
			</div>
		</div>
	);
};

export default SocialLinks;
