import { useNavigate } from "react-router-dom";
import { AnimationPage, Container, PrimeButton } from "../../components";
import classes from "./errorPage.module.css";

const ErrorPage = () => {
	const navigate = useNavigate();
	const handleBack = () => {
		navigate(-1);
	};
	return (
		<AnimationPage>
			<div className={classes.ErrorPage}>
				<Container>
					<div className={classes.inner}>
						<p>Возникла ошибка!!!</p>
						<PrimeButton title={"Вернуться назад"} fn={handleBack} />
					</div>
				</Container>
			</div>
		</AnimationPage>
	);
};

export default ErrorPage;
