import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

const PieChartComponent = ({ data, title, colors, dataKey }) => {
	const pieChartColors = colors || ["#00B074", "rgba(0, 176, 116, 0.15)"];
	const value = data[0] ? data[0]?.[dataKey] : 0; // Здесь предполагается, что значение передается в свойстве 'value'
	const remainingValue = 100 - value; // Вычисляем оставшееся значение до 100%

	const customLabel = ({ cx, cy, value }) => {

		return (
			<text
				x={cx}
				y={cy}
				textAnchor='middle'
				dominantBaseline='middle'
				fontWeight='bold'>
				{`${value.toFixed(0)}%`}
			</text>
		);
	};

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				textAlign: "center",
				whiteSpace: "nowrap",
				gap: "20px",
			}}>
			<p style={{ fontSize: "16px", fontWeight: 600 }}>{title}</p>
			<ResponsiveContainer width='100%' height='100%'>
				<PieChart>
					<Pie
						data={[
							{ name: "Кол-во", value },
							{ name: "Остаток", value: remainingValue },
						]}
						cx='50%'
						cy='50%'
						innerRadius={40}
						outerRadius={80}
						paddingAngle={5}
						label={true}>
						{pieChartColors.map((color, index) => (
							<Cell key={`cell-${index}`} fill={color} />
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default PieChartComponent;
