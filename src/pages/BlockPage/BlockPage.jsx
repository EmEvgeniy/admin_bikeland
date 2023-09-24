import { ContactsLink, LogoComp, PaymentComp, SocialLinks } from "../../components";
import classes from "./blockPage.module.css";

const BlockPage = () => {
	return (
		<div className={classes.BlockPage}>
			<SocialLinks />
			<div className={classes.mid}>
				<PaymentComp />
				<LogoComp />
			</div>
			<ContactsLink/>
		</div>
	);
};

export default BlockPage;
