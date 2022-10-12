import { useState, useEffect, useRef } from "react";
import { CarouselObject, CarouselProps } from "./CarouselTypes";
import "./Carousel.css";

const Carousel = ({ imageURLS, sliderSpeed }: CarouselProps) => {
	const [images, setImages] = useState<CarouselObject>({
		prev: "",
		curr: "",
		next: "",
	});
	const [activeIndex, setActiveIndex] = useState(0);
	const [isSliding, setIsSliding] = useState(false);
	const prevImageRef = useRef<HTMLImageElement>(null);
	const currImageRef = useRef<HTMLImageElement>(null);
	const nextImageRef = useRef<HTMLImageElement>(null);

	const removeTransitions = () => {
		currImageRef.current!.style.transition = "none";
		prevImageRef.current!.style.transition = "none";
		nextImageRef.current!.style.transition = "none";
	};

	const repositionImages = () => {
		currImageRef.current!.style.left = "0";
		prevImageRef.current!.style.left = "-100%";
		nextImageRef.current!.style.left = "100%";
	};

	const addTransitions = () => {
		const transitionProp = `all ${sliderSpeed}s ease`;
		currImageRef.current!.style.transition = transitionProp;
		prevImageRef.current!.style.transition = transitionProp;
		nextImageRef.current!.style.transition = transitionProp;
	};

	const recalculateImages = (newActiveIndex: number) => {
		let prevImage, nextImage;
		newActiveIndex - 1 >= 0
			? (prevImage = imageURLS[newActiveIndex - 1])
			: (prevImage = imageURLS[imageURLS?.length - 1]);
		newActiveIndex + 1 <= imageURLS?.length - 1
			? (nextImage = imageURLS[newActiveIndex + 1])
			: (nextImage = imageURLS[0]);

		removeTransitions();
		setImages({
			prev: prevImage,
			curr: imageURLS[newActiveIndex],
			next: nextImage,
		});
		repositionImages();
		setActiveIndex(newActiveIndex);
		setTimeout(() => addTransitions(), 100);
		setTimeout(() => {
			setIsSliding(false);
		}, 150);
	};

	const showPreviousImage = () => {
		currImageRef.current!.style.left = "100%";
		prevImageRef.current!.style.left = "0";

		setTimeout(() => {
			if (activeIndex - 1 >= 0) {
				recalculateImages(activeIndex - 1);
			} else recalculateImages(imageURLS?.length - 1);
		}, sliderSpeed * 1000);
	};

	const showNextImage = () => {
		currImageRef.current!.style.left = "-100%";
		nextImageRef.current!.style.left = "0";

		setTimeout(() => {
			if (activeIndex + 1 <= imageURLS?.length - 1) {
				recalculateImages(activeIndex + 1);
			} else recalculateImages(0);
		}, sliderSpeed * 1000);
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
			addTransitions();
		};
		generateImages();
	}, [imageURLS]);

	return (
		<div
			className={`carousel ${imageURLS?.length === 0 ? "empty" : ""}`}
			tabIndex={0}
			onKeyDown={(e) => {
				switch (e.key) {
					case "ArrowLeft":
					case "Backspace":
					case "Space":
						if (!isSliding && imageURLS?.length > 0) {
							setIsSliding(true);
							showPreviousImage();
						}
						break;
					case "ArrowRight":
					case "Enter":
						if (!isSliding && imageURLS?.length > 0) {
							setIsSliding(true);
							showNextImage();
						}
						break;
					default:
						break;
				}
			}}
		>
			{!isSliding && (
				<span
					className="carousel__arrow previous"
					onClick={() => {
						setIsSliding(true);
						showPreviousImage();
					}}
				>
					&lt;
				</span>
			)}

			<>
				<img
					alt="carousel__image"
					src={images.prev}
					className="carousel__image"
					style={{ left: "-100%" }}
					ref={prevImageRef}
				/>
				<img
					alt="carousel__image"
					src={images.curr}
					className="carousel__image"
					style={{ left: "0" }}
					ref={currImageRef}
				/>
				<img
					alt="carousel__image"
					src={images.next}
					className="carousel__image"
					style={{ left: "100%" }}
					ref={nextImageRef}
				/>
			</>
			<h1>No Images Found</h1>

			{!isSliding && (
				<span
					className="carousel__arrow next"
					onClick={() => {
						setIsSliding(true);
						showNextImage();
					}}
				>
					&gt;
				</span>
			)}

			{!isSliding && imageURLS?.length >= 4 && (
				<div className="carousel__dots">
					{imageURLS?.map((img, i) => (
						<span
							key={i}
							className="carousel__dot"
							onClick={() => {
								setIsSliding(true);
								recalculateImages(i);
							}}
						></span>
					))}
				</div>
			)}
		</div>
	);
};

export default Carousel;
