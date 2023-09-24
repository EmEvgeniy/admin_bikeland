import { Outlet } from "react-router-dom";
import {
	AnimationPage,
	Container,
	Header,
	AsideMenu,
	PhotoPopup,
	DatePopup,
} from "../../components";
import ExitPopUp from "../../components/modals/exitPopUp/ExitPopUp";
import classes from "./mainPage.module.css";
import DealersPopup from "../../components/modals/dealersPopup/DealersPopup";

const MainPage = () => {
	return (
		<AnimationPage>
			<div className={classes.MainPage}>
				<Container>
					<div className={classes.inner}>
						<AsideMenu />
						<div className={classes.content}>
							<Header />
							<div className={classes.content_inner}>
								<Outlet />
							</div>
							<ExitPopUp />
							<PhotoPopup />
							<DatePopup />
							<DealersPopup />
						</div>
					</div>
				</Container>
			</div>
		</AnimationPage>
	);
};

export default MainPage;
