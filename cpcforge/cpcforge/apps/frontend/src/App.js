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
import "./App.css";

function App() {

	return (
		<Router>
			<Routes>
				<Route exact path="/" element={
					<>
						<Navbar />
						<HomeModule />
					</>
				} />
				<Route path="/list" element={
					<>
						<Navbar />
						<PlatformList />
					</>
				} />
				<Route path="/create" element={
					<>
						<Navbar />
						<PlatformCreate />
					</>
				} />
				<Route path="/login" element={<LogInModule />} />
				<Route path="/signup" element={<SignUpModule />} />
			</Routes>
		</Router>
	);
};

render (<App />, document.getElementById("app"));
export default App;