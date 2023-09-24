import { DealersComp, DiliveryComp } from "../../components";
import classes from "./locationPage.module.css";

const LocationPage = () => {
	return (
		<div className={classes.LocationPage}>
			<DealersComp />
			<DiliveryComp />
		</div>
	);
};

export default LocationPage;
