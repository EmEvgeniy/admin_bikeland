import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerValue() {
	const [value, setValue] = React.useState(dayjs(new Date()));
	const [value2, setValue2] = React.useState(dayjs(new Date()));

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer components={["DatePicker", "DatePicker"]}>
				<DatePicker
					label='От'
					value={value2}
					onChange={(newValue) => setValue2(newValue)}
				/>
				<DatePicker
					label='До'
					value={value}
					onChange={(newValue) => setValue(newValue)}
				/>
			</DemoContainer>
		</LocalizationProvider>
	);
}
