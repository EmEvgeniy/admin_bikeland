import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Area,
	AreaChart,
} from "recharts";
import classes from "./lineGraph.module.css";

const LineGraph = ({data}) => {
	return (
		<div className={classes.LineGraph}>
			<p>График</p>
			<ResponsiveContainer width='100%' height='100%'>
				<AreaChart
					data={data}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 30,
					}}>
					<defs>
						<linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0%' stopColor='#C42F15' stopOpacity={0.8} />
							<stop offset='100%' stopColor='#FFA292' stopOpacity={0.2} />
						</linearGradient>
					</defs>
					<CartesianGrid stroke='transperant' />
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />

					<Area
						type='monotone'
						dataKey='value'
						stroke='#C42F15'
						fill='url(#colorValue)' // Используйте градиент для заливки области под графиком
						strokeWidth={2}
						dot={false}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default LineGraph;
