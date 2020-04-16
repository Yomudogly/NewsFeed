import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Start = () => {
	// useEffect(() => {
	// 	const values = queryString.parse(location.search);
	// 	console.log(values.id);
	// 	console.log(values.size);
	// });
	// Need to check if parameter with hash matches hash in DB and store it in browser!!!

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
						<button className="btn btn-dark btn-lg">
							Proceed to Camera
						</button>
					</Link>
				</p>
			</div>
		</div>
	);
};
