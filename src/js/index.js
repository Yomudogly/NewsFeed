//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";

//import your own components
import { App } from "./app";

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/service-worker.js")
			.then(registration => {
				console.log("SW registered: ", registration.active.state);
			})
			.catch(registrationError => {
				console.log("SW registration failed: ", registrationError);
			});
	});
}

//render your react application
ReactDOM.render(<App />, document.querySelector("#app"));
