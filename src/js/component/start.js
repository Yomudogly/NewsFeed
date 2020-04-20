import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Start = () => {
	// useEffect(() => {
	// 	const values = queryString.parse(location.search);
	// 	console.log(values.id);
	// 	console.log(values.size);
	// }, []);
	// Need to check if parameter with hash matches hash in DB and store it in browser!!!

	const [deferredPrompt, setDeferredPrompt] = useState();
	const [hidden, setHidden] = useState(true);

	useEffect(() => {
		window.addEventListener("beforeinstallprompt", event => {
			event.preventDefault();
			setDeferredPrompt(event);
			setHidden(false);
		});
	}, []);

	const installHandler = () => {
		// hide our user interface that shows our A2HS button
		setHidden(true);
		// Show the prompt
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then(choiceResult => {
			if (choiceResult.outcome === "accepted") {
				console.log("User accepted the A2HS prompt");
			} else {
				console.log("User dismissed the A2HS prompt");
			}
			setDeferredPrompt(null);
		});
	};

	return (
		<div className="container">
			<div className="jumbotron mt-4 pb-4">
				<h1 className="display-4">Hey buddy!</h1>
				<p className="lead">
					You are about to start take pictures of your sneakers. Make
					sure that all 6 photos are match with frames.
				</p>
				<hr className="my-4" />
				<p>Some greatings nad bla-bla-bla!!!</p>
				<p className="lead">
					<Link
						to={{
							pathname: "/one",
							search: location.search
						}}>
						<button className="btn btn-dark btn-lg mr-2">
							Proceed to Camera
						</button>
					</Link>
					<button
						onClick={installHandler}
						className="btn btn-danger btn-lg ml-2"
						hidden={hidden}>
						Install App
					</button>
				</p>
			</div>
		</div>
	);
};
