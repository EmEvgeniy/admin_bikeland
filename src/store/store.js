import burgerReducer from "./slices/burgerSlice";
import navReducer from "./slices/navSlice";
import photoReducer from "./slices/photoSlice";
import exitReducer from "./slices/exitSlice";
import dateReducer from "./slices/dateSlice";
import dealersReducer from "./slices/dealersSlice";
import cardReducer from "./slices/cardSlice";
import { AuthApi } from "./middleWares/AuthApi";
import { DealersApi } from "./middleWares/DealersApi";
import { GoodsApi } from "./middleWares/GoodsApi";
import { StatisticApi } from "./middleWares/StatisticApi";
import { ResourcesApi } from "./middleWares/resourcesApi";
import { GetUserDataApi } from "./middleWares/GetUserDataApi";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
	burger: burgerReducer,
	nav: navReducer,
	exit: exitReducer,
	photo: photoReducer,
	dealer: dealersReducer,
	card: cardReducer,
	date: dateReducer,
	[AuthApi.reducerPath]: AuthApi.reducer,
	[ResourcesApi.reducerPath]: ResourcesApi.reducer,
	[GetUserDataApi.reducerPath]: GetUserDataApi.reducer,
	[GoodsApi.reducerPath]: GoodsApi.reducer,
	[StatisticApi.reducerPath]: StatisticApi.reducer,
	[DealersApi.reducerPath]: DealersApi.reducer,
});

const persistConfig = {
	key: "root",
	storage,
	blacklist: [
		"burger",
		"AuthApi",
		"ResourcesApi",
		"GoodsApi",
		"exit",
		"GetUserDataApi",
		"photo",
		"date",
		"StatisticApi",
		"DealersApi",
		"dealers",
		"card",
	],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([
			AuthApi.middleware,
			GoodsApi.middleware,
			GetUserDataApi.middleware,
			ResourcesApi.middleware,
			StatisticApi.middleware,
			DealersApi.middleware,
		]),
});

export const persistor = persistStore(store);
export default store;
