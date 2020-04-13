import React, { useState, useEffect } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import axios from "axios";

import ImagePreview from "./ImagePreview";

export const Home = () => {
	const [dataUri, setDataUri] = useState("");
	const [run, setRun] = useState(false);

	useEffect(
		() => {
			if (run) {
				handleTakePhotoAnimationDone();
				setRun(false);
			}
		},
		[run]
	);

	const handleTakePhotoAnimationDone = dataUri => {
		//console.log("takePhoto");
		setDataUri(dataUri);
	};

	const pictureSendHandler = () => {
		console.log("sending picture");
		// let image = new Image();
		// image.src = dataUri;
		// image.alt = "First View";
		// image.name = "Hello world";
		console.log(dataUri);
		axios
			.post("https://snkrsden-api.herokuapp.com/media", {
				alt: "some text",
				description: "another text",
				image: dataUri,
				pre_owned_id: 1,
				product_id: 1,
				sizes_shoes_val: 8,
				status: 0,
				thumbnail: "new string",
				user_id: 1
			})
			.then(resp => {
				console.log(resp);
			});

		console.log("picture was sent");
	};

	const isFullscreen = false;

	return (
		<div>
			{dataUri ? (
				<ImagePreview dataUri={dataUri} isFullscreen={isFullscreen} />
			) : (
				<Camera
					onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
					isFullscreen={isFullscreen}
					idealFacingMode={FACING_MODES.ENVIRONMENT}
					idealResolution={{ width: 1024, height: 768 }}
					imageCompression={0.95}
					isMaxResolution={true}
					imageType={IMAGE_TYPES.JPG}
				/>
			)}

			<button onClick={pictureSendHandler}>Send Picture</button>
			<button
				onClick={() => {
					setRun(true);
				}}>
				New Picture
			</button>
		</div>
	);
};
