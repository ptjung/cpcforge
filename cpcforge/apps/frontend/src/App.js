import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import {
	HomePage,
	PlatformCreatePage,
	PlatformListPage,
	PlatformViewPage,
	ProblemCreatePage,
	ProblemViewPage,
	SignInPage,
	SignUpPage
} from "./pages";
import "./App.css";

function App() {

	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<HomePage />} />
				<Route path="/list" element={<PlatformListPage />} />
				<Route path="/create" element={<PlatformCreatePage />} />
				<Route path="/platform/:handle/*" element={
					<Routes>
						<Route exact path="/" element={<PlatformViewPage />} />
						<Route path="/create" element={<ProblemCreatePage />} />
						<Route path="/problem/:probHandle/*" element={<ProblemViewPage />} />
					</Routes>	
				} />
				<Route path="/login" element={<SignInPage />} />
				<Route path="/signup" element={<SignUpPage />} />
			</Routes>
		</Router>
	);
};

export default App;