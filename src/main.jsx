import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<RouterProvider router={router} />
		</PersistGate>
	</Provider>
);
