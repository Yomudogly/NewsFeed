import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import logo from "../static/logo.png";

export const App = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("https://yankeekicks.com/wp-json/wp/v2/posts?_embed&per_page=35")
			.then(response => {
				//console.log(resp.ok); // will be true if the response is successfull
				//console.log(resp.status); // the status code = 200 or code = 400 etc.
				//console.log(resp.text()); // will try return the exact result as string
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(list => {
				setPosts(
					list.map(item => ({
						url: item.link,
						img: item._embedded["wp:featuredmedia"]["0"].source_url
					}))
				);
				// console.log(list);
			})
			.catch(error => {
				//error handling
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	return (
		<div className="container mt-2">
			<div className="row">
				<div className="col-4">
					<img src={logo} height="60" />
				</div>
				<div className="col-8">
					<p className="font-weight-lighter textNav ml-3">
						▽ Click on the photos below to explore, discover, and
						share with friends the latest sneakers featured on our
						daily feed ▽
					</p>
				</div>
			</div>
			<hr className="mb-3 mt-0" />
			<LazyLoad>
				<div className="card-columns">
					{posts.map((post, index) => (
						<div
							key={index}
							style={{ display: "inline-block" }}
							className="card">
							<a href={post.url}>
								<img
									src={post.img}
									className="card-img-top"
									alt="..."
									// height="300"
								/>
							</a>
						</div>
					))}
				</div>
			</LazyLoad>
			<hr className="mb-1 mt-2" />
			<nav className="navbar navbar-light">
				<span className="navbar-text">
					<a href="https://yankeekicks.com/">
						© All rights reserved || Yankeekicks
					</a>
				</span>
			</nav>
		</div>
	);
};
