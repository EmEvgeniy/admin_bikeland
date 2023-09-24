import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import MainPage from "./pages/MainPage/MainPage";
import ViewStatisticsPage from "./pages/ViewsStatisticsPage/ViewStatisticsPage";
import OrderStatisticsPage from "./pages/OrderStatisticsPage/OrderStatisticsPage";
import BlockPage from "./pages/BlockPage/BlockPage";
import LocationPage from "./pages/LocationPage/LocationPage";
import GoodsPage from "./pages/GoodsPage/GoodsPage";
import ApplicationPage from "./pages/ApplicationPage/ApplicationPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard",
		element: <MainPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "view_statistics",
				element: <ViewStatisticsPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: "order_statistics",
				element: <OrderStatisticsPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: "blocks",
				element: <BlockPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: "pages",
				element: <LocationPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: "goods",
				element: <GoodsPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: "application",
				element: <ApplicationPage />,
				errorElement: <ErrorPage />,
			},
		],
	},
]);
