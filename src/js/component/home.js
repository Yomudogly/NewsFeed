import React, { useState, useEffect } from "react";
import Camera from "react-html5-camera-photo";
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
		let image = new Image();
		image.src = dataUri;
		image.alt = "First View";
		image.name = "Hello world";
		console.log(image);
		axios
			.post("localhost:8000", {
				name: image.name,
				src: image.src,
				alt: image.alt
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
