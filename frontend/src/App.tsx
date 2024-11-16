import { Provider } from "react-redux";
import "./App.css";
import MultipleChoice from "./components/MultipleChoice";
import UrlInput from "./components/UrlInput";
import { store } from "./store";

function App() {
	return (
		<Provider store={store}>
			<div className="w-2/3 m-auto space-y-8">
				<UrlInput />
				<MultipleChoice />
			</div>
		</Provider>
	);
}

export default App;
