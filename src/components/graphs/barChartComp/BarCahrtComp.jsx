import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import classes from "./barChartComp.module.css";

const BarChartComp = ({ data }) => {
	// Добавляем информацию о цвете для каждой записи в данных
	const processedData = data.map((entry, index) => ({
		...entry,
		fill: index % 2 === 0 ? "#C42F15" : "#FFA292",
	}));

	return (
		<div className={classes.BarChartComp}>
			<p>График</p>
			<ResponsiveContainer
				width='100%'
				height='100%'
				className='chart-container'>
				<BarChart
					data={processedData}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 30,
					}}>
					<CartesianGrid strokeDasharray='3 3' />
					{/* <XAxis dataKey='weekday' /> */}
					<YAxis />
					<Tooltip />
					<Bar dataKey={"amount_views"} fill='fill' barSize={10} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default BarChartComp;
