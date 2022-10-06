import { useState, useEffect, useRef } from "react";
import { CarouselProps } from "./CarouselTypes";
import "./Carousel.css";

const Carousel = ({ imageURLS }: CarouselProps) => {
	const [images, setImages] = useState<any>({});
	const [activeIndex, setActiveIndex] = useState(0);
	const prevImageRef = useRef<HTMLImageElement>(null);
	const currImageRef = useRef<HTMLImageElement>(null);
	const nextImageRef = useRef<HTMLImageElement>(null);

	const recalculateImages = (newActiveIndex: number) => {
		let prevImage, nextImage;
		newActiveIndex - 1 >= 0
			? (prevImage = imageURLS[newActiveIndex - 1])
			: (prevImage = imageURLS[imageURLS?.length - 1]);
		newActiveIndex + 1 <= imageURLS?.length - 1
			? (nextImage = imageURLS[newActiveIndex + 1])
			: (nextImage = imageURLS[0]);

		setImages({
			prev: prevImage,
			curr: imageURLS[newActiveIndex],
			next: nextImage,
		});
		setActiveIndex(newActiveIndex);
	};

	const showPreviousImage = () => {
		let newActiveIndex = activeIndex;
		currImageRef.current!.style.left = "100%";
		prevImageRef.current!.style.left = "0";

		setTimeout(() => {
			if (newActiveIndex - 1 >= 0) {
				recalculateImages(newActiveIndex - 1);
			} else recalculateImages(imageURLS?.length - 1);
		}, 250);
	};

	const showNextImage = () => {
		let newActiveIndex = activeIndex;
		currImageRef.current!.style.left = "-100%";
		nextImageRef.current!.style.left = "0";

		setTimeout(() => {
			if (newActiveIndex + 1 <= imageURLS?.length - 1) {
				recalculateImages(newActiveIndex + 1);
			} else recalculateImages(0);
		}, 250);
	};

	useEffect(() => {
		const generateImages = () => {
			if (imageURLS?.length >= 2) {
				setImages({
					prev: imageURLS[imageURLS?.length - 1],
					curr: imageURLS[0],
					next: imageURLS[1],
				});
			} else {
				setImages({
					prev: imageURLS[0],
					curr: imageURLS[0],
					next: imageURLS[0],
				});
			}
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
						showPreviousImage();
						break;
					case "ArrowRight":
					case "Enter":
						showNextImage();
						break;
					default:
						break;
				}
			}}
		>
			<span className="carousel__arrow previous" onClick={() => showPreviousImage()}>
				&lt;
			</span>

			{imageURLS?.length > 0 ? (
				<>
					<img
						key={images.prev}
						alt="carousel__image"
						src={images.prev}
						className="carousel__image"
						style={{ left: "-100%" }}
						ref={prevImageRef}
					/>
					<img
						key={images.curr}
						alt="carousel__image"
						src={images.curr}
						className="carousel__image"
						style={{ left: "0" }}
						ref={currImageRef}
					/>
					<img
						key={images.next}
						alt="carousel__image"
						src={images.next}
						className="carousel__image"
						style={{ left: "100%" }}
						ref={nextImageRef}
					/>
				</>
			) : (
				<h1>No Images Found</h1>
			)}

			<span className="carousel__arrow next" onClick={() => showNextImage()}>
				&gt;
			</span>
		</div>
	);
};

export default Carousel;
