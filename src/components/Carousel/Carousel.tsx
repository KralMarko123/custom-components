import { useState, useEffect } from "react";
import { CarouselProps } from "./CarouselTypes";
import "./Carousel.css";

const Carousel = ({ imageURLS }: CarouselProps) => {
	const [images, setImages] = useState<any[]>([]);
	const [shownImageIndex, setShownImageIndex] = useState(0);

	const showPreviousImage = () => {
		let currImages = [...images];
		currImages.forEach((img) => {
			img.pos += 100;
		});
		setImages(currImages);
		setShownImageIndex((prev) => prev - 1);
	};

	const showNextImage = () => {
		let currImages = [...images];
		currImages.forEach((img) => {
			img.pos -= 100;
		});
		setImages(currImages);
		setShownImageIndex((prev) => prev + 1);
	};

	useEffect(() => {
		const generateImages = () => {
			let imageArray: any[] = [];
			imageURLS?.forEach((img, i) =>
				imageArray.push({
					src: img,
					pos: i * 100,
				})
			);
			setImages(imageArray);
		};
		generateImages();
	}, [imageURLS]);

	return (
		<div
			className="carousel"
			tabIndex={0}
			onKeyDown={(e) => {
				switch (e.key) {
					case "ArrowLeft":
					case "Backspace":
					case "Space":
						shownImageIndex > 0 ? showPreviousImage() : null;
						break;
					case "ArrowRight":
					case "Enter":
						shownImageIndex < images.length - 1 ? showNextImage() : null;
						break;
					default:
						break;
				}
			}}
		>
			{shownImageIndex > 0 && (
				<span className="carousel__arrow previous" onClick={() => showPreviousImage()}>
					&lt;
				</span>
			)}

			{images.length > 0 ? (
				images.map((image) => (
					<img
						key={image.src}
						alt="carousel__image"
						src={image.src}
						className="carousel__image"
						style={{ left: `${image.pos}%` }}
					/>
				))
			) : (
				<h1>No Images Found</h1>
			)}

			{shownImageIndex < images.length - 1 && (
				<span className="carousel__arrow next" onClick={() => showNextImage()}>
					&gt;
				</span>
			)}
		</div>
	);
};

export default Carousel;
