import { BarChartComp, FilterComp, PieChartComponent } from "../../components";
import {
	useGetStatisticQuery,
	useGetTotalStatisticQuery,
} from "../../store/middleWares/StatisticApi";
import classes from "./viewStatisticsPage.module.css";

const ViewStatisticsPage = () => {
	const { data: stat = [] } = useGetStatisticQuery();
	const { data: total } = useGetTotalStatisticQuery();
	return (
		<div className={classes.ViewStatisticsPage}>
			<div className={classes.top}>
				<BarChartComp data={stat} />
				<FilterComp />
			</div>
			<div className={classes.bottom}>
				<PieChartComponent
					data={[total?.day1]}
					title='Показы за день'
					dataKey={"total_views_percentage"}
					colors={["#AE1B1C", "rgba(255, 91, 91, 0.15)"]}
				/>
				<PieChartComponent
					data={[total?.day7]}
					dataKey={"total_views_percentage"}
					title='Показы за 7 дней'
				/>
				<PieChartComponent
					data={[total?.day30]}
					dataKey={"total_views_percentage"}
					title='Показы за 30 дней'
					colors={["#2D9CDB", "rgba(45, 156, 219, 0.15)"]}
				/>
			</div>
		</div>
	);
};

export default ViewStatisticsPage;
