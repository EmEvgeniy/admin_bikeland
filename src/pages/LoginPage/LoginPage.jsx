import classes from "./loginPage.module.css";
import logo from "../../assets/logo.webp";
import { useState } from "react";
import {
	PrimeButton,
	TextInput,
	Container,
	AnimationPage,
} from "../../components";
import { useGetAccessTokenMutation } from "../../store/middleWares/AuthApi";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [active, setActive] = useState(false);
	const [loginMutation] = useGetAccessTokenMutation();
	const navigate = useNavigate();

	const handleAccess = async () => {
		const data = new FormData();
		data.append("username", email);
		data.append("password", pass);
		if (data) {
			await loginMutation(data)
				.then((res) => sessionStorage.setItem("token", res?.data?.access_token))
				.then(() =>
					sessionStorage.getItem("token")
						? navigate("/dashboard")
						: setActive(true)
				)
				.catch(() => setActive(true));
		}
	};

	return (
		<AnimationPage>
			<div className={classes.LoginPage}>
				<Container>
					<div className={classes.inner}>
						<div className={classes.logo}>
							<img src={logo} alt='logo' />
						</div>
						<TextInput
							type={"text"}
							fn={setEmail}
							placeholder={"Ваш e-mail"}
							active={active}
						/>
						<TextInput
							type={"password"}
							fn={setPass}
							placeholder={"Ваш пароль"}
							active={active}
						/>
						<PrimeButton title={"Войти"} fn={handleAccess} />
					</div>
				</Container>
			</div>
		</AnimationPage>
	);
};

export default LoginPage;
