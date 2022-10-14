import { useState, useEffect } from "react";
import { TimerProps } from "./TimerTypes";
import "./Timer.css";

const Timer = ({ start, decrement }: TimerProps) => {
	const [timeLeft, setTimeLeft] = useState<number>(start);
	const [decrementBy, setDecrementBy] = useState<number>(1);

	useEffect(() => {
		if (timeLeft === 0) return;
		const interval = setInterval(
			() => setTimeLeft((prev) => prev - decrementBy),
			decrementBy * 1000
		);

		return () => {
			clearInterval(interval);
		};
	}, [timeLeft, decrementBy]);

	useEffect(() => {
		const setTimer = () => {
			setTimeLeft(start);
			if (decrement && decrement > 0) {
				setDecrementBy(decrement);
			} else setDecrementBy(1);
		};
		setTimer();
	}, [start, decrement]);

	return (
		<div className="timer">
			<div className="timer__controls">
				<span className="timer__time">{Math.floor(timeLeft)}</span>
				<button className="timer__reset" onClick={() => setTimeLeft(start)}>
					Reset Timer
				</button>
			</div>
			<p className="timer__info">
				{timeLeft > 0 ? `Decrementing by: ${decrementBy}s` : "Finished"}
			</p>
		</div>
	);
};

export default Timer;
