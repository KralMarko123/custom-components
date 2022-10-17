import { useState, useEffect, KeyboardEvent } from "react";
import { TimerProps } from "./TimerTypes";
import "./Timer.css";

const Timer = ({ hours, minutes, seconds, shouldStart }: TimerProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [digits, setDigits] = useState([0, 0, 0, 0, 0, 0]);
	const [timeLeft, setTimeLeft] = useState(0);
	const [isStarted, setIsStarted] = useState(false);
	const [highlightAt, setHighlightAt] = useState(6);

	const calculateDigitsFromTimeLeft = () => {
		let hours = Math.floor(timeLeft / 3600);
		let minutes = Math.floor((timeLeft - hours * 3600) / 60);
		let seconds = timeLeft - hours * 3600 - minutes * 60;
		let newDigits = [...digits];

		newDigits[0] = Math.floor(hours / 10);
		newDigits[1] = Math.floor(hours % 10);
		newDigits[2] = Math.floor(minutes / 10);
		newDigits[3] = Math.floor(minutes % 10);
		newDigits[4] = Math.floor(seconds / 10);
		newDigits[5] = Math.floor(seconds % 10);

		setDigits(newDigits);
		timeLeft === 0 ? setIsStarted(false) : null;
	};

	const getTimeFromDigits = () => {
		return (
			(digits[0] * 10 + digits[1]) * 3600 +
			(digits[2] * 10 + digits[3]) * 60 +
			(digits[4] * 10 + digits[5])
		);
	};

	const getNumberEntered = (text: string) => {
		let digit;
		if (parseInt(text)) {
			digit = parseInt(text);
		} else if (text === "0") {
			digit = 0;
		} else digit = NaN;
		return digit;
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		if (isOpen) {
			const digitEntered = getNumberEntered(e.key);
			if (!isNaN(digitEntered)) {
				let newDigits = [...digits];
				for (let i = 0; i <= 4; i++) {
					newDigits[i] = newDigits[i + 1];
				}
				newDigits[5] = digitEntered;
				setDigits(newDigits);

				setHighlightAt((prev) => (prev - 1 <= 0 ? 0 : prev - 1));
			}

			switch (e.key) {
				case "Enter":
					toggleTimer();
					setIsOpen(false);
					break;
				case "Backspace":
				case "Delete":
					let newDigits = [...digits];
					for (let i = 0; i <= 5; i++) {
						if (newDigits[i] === 0) continue;
						newDigits[i] = 0;
						break;
					}
					setDigits(newDigits);
					setHighlightAt((prev) => (prev + 1 >= 6 ? 6 : prev + 1));
					break;
				default:
					break;
			}
		} else {
			switch (e.key) {
				case "Enter":
				case "Space":
					openTimer();
					break;
				case "Backspace":
				case "Delete":
					resetTimer();
					break;
				default:
					break;
			}
		}
	};

	const openTimer = () => {
		setIsOpen(true);
		setIsStarted(false);
	};

	const toggleTimer = () => {
		setTimeLeft(getTimeFromDigits());

		if (isStarted) {
			setIsStarted(false);
			return;
		}

		if (getTimeFromDigits() > 0) {
			setIsStarted(true);
		}

		setHighlightAt(6);
	};

	const resetTimer = () => {
		setIsStarted(false);
		setTimeLeft(0);
		setDigits([0, 0, 0, 0, 0, 0]);
		setHighlightAt(6);
	};

	useEffect(() => {
		if (!isStarted) return;

		calculateDigitsFromTimeLeft();
		const interval = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [timeLeft, isStarted]);

	return (
		<div className={`timer ${isOpen ? "open" : ""}`}>
			<div
				className="timer__time"
				onClick={() => openTimer()}
				onFocus={() => setIsOpen(true)}
				onBlur={() => {
					setIsOpen(false);
					setHighlightAt(6);
				}}
				tabIndex={0}
				onKeyDown={(e) => handleKeyPress(e)}
			>
				{digits.map((d, i) => {
					return (
						<span key={i} className={`timer__digit ${highlightAt <= i ? "highlight" : ""}`}>
							{d}
							{i === 1 && <span className="timer__suffix">h</span>}
							{i === 3 && <span className="timer__suffix">m</span>}
							{i === 5 && <span className="timer__suffix">s</span>}
						</span>
					);
				})}
			</div>

			<div className="timer__controls">
				<button
					className={`${!isStarted ? "timer__start" : "timer__stop"}`}
					onClick={() => toggleTimer()}
				>
					{!isStarted ? "Start" : "Stop"}
				</button>
				<button className="timer__reset" onClick={() => resetTimer()}>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Timer;
