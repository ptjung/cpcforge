import React from "react";
import { render } from "react-dom";
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import {
	Navbar,
	HomeModule,
	PlatformList,
	PlatformCreate,
	LogInModule,
	SignUpModule
} from "./components";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<HomeModule />} />
				<Route path="/list" element={<PlatformList />} />
				<Route path="/create" element={<PlatformCreate />} />
				<Route path="/login" element={<LogInModule />} />
				<Route path="/signup" element={<SignUpModule />} />
			</Routes>
		</Router>
	);
};

render (<App />, document.getElementById("app"));
export default App;