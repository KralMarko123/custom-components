import { useState, useEffect } from "react";
import { TimerProps } from "./TimerTypes";
import "./Timer.css";

const Timer = ({ hours, minutes, seconds }: TimerProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [timer, setTimer] = useState({
		hoursDigitOne: 0,
		hoursDigitTwo: 0,
		minutesDigitOne: 0,
		minutesDigitTwo: 0,
		secondsDigitOne: 0,
		secondsDigitTwo: 0,
	});

	const handleKeyPress = (e: any) => {
		e.preventDefault();

		if (isOpen) {
			if (parseInt(e.key)) {
				console.log("a number");
			}
		} else return;
	};
	return (
		<div
			className={`timer ${isOpen ? "open" : ""}`}
			onClick={() => setIsOpen(true)}
			onBlur={() => setIsOpen(false)}
			tabIndex={0}
			onKeyDown={(e) => handleKeyPress(e)}
		>
			<div className="timer__time">
				<span className="hours">{`${timer.hoursDigitOne}${timer.hoursDigitTwo}h`}</span>
				<span className="minutes">{`${timer.minutesDigitOne}${timer.minutesDigitTwo}m`}</span>
				<span className="seconds">{`${timer.secondsDigitOne}${timer.secondsDigitTwo}s`}</span>
			</div>
		</div>
	);
};

export default Timer;
