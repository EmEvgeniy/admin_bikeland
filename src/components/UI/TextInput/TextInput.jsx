import classes from "./textInput.module.css";

const TextInput = ({ placeholder, fn, active, type }) => {
	return (
		<input
			type={type}
			autoComplete='false'
			placeholder={placeholder}
			onChange={(e) => fn(e.target.value)}
			className={
				active
					? `${classes.TextInput} ${classes.active}`
					: `${classes.TextInput}`
			}
		/>
	);
};
export default TextInput;
