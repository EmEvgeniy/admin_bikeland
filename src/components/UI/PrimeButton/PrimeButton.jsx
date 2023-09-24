import classes from "./primeButton.module.css";

const PrimeButton = ({ title, fn }) => {
	return (
		<span className={classes.PrimeButton} onClick={fn}>
			{title}
		</span>
	);
};
export default PrimeButton;
