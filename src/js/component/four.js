import React, { useState, useEffect } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import { Link } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

import "react-html5-camera-photo/build/css/index.css";
import "../../styles/index.scss";

import ImagePreview from "./imagePreview/imagePreview";

export const Four = () => {
	const [dataUri, setDataUri] = useState("");
	const [run, setRun] = useState(false);

	// useEffect(() => {
	// 	const values = queryString.parse(location.search);
	// 	console.log(values.id);
	// 	console.log(values.size);
	// });

	useEffect(() => {
		if (run) {
			handleTakePhotoAnimationDone();
			setRun(false);
		}
	}, [run]);

	const handleTakePhotoAnimationDone = dataUri => {
		//console.log("takePhoto");
		setDataUri(dataUri);
	};

	const pictureSendHandler = () => {
		const values = queryString.parse(location.search);

		axios
			.post("https://snkrsden-api.herokuapp.com/media", {
				alt: "Fourth photo",
				image: dataUri,
				product_id: values.product,
				sizes_shoes_val: values.size,
				user_id: values.id
			})
			.then(resp => {
				console.log(resp.statusText);
				// setRun(true);
			});
	};

	const isFullscreen = false;

	return (
		<div>
			{dataUri ? (
				<ImagePreview dataUri={dataUri} isFullscreen={isFullscreen} />
			) : (
				// <div className="mask2">
				<Camera
					onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
					isFullscreen={isFullscreen}
					idealFacingMode={FACING_MODES.ENVIRONMENT}
					idealResolution={{ width: 1024, height: 768 }}
					imageCompression={0.95}
					isMaxResolution={true}
					imageType={IMAGE_TYPES.JPG}
				/>
				// </div>
			)}
			<Link
				to={{
					pathname: "/five",
					search: location.search
				}}>
				<button onClick={pictureSendHandler}>Send Picture</button>
			</Link>

			<button
				onClick={() => {
					setRun(true);
				}}>
				Redo Picture
			</button>
		</div>
	);
};
