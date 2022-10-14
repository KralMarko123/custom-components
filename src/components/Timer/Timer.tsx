import { useState, useEffect } from "react";
import { TimerProps } from "./TimerTypes";

const Timer = ({ start, increment }: TimerProps) => {
	const [timeLeft, setTimeLeft] = useState<number>(0);

	useEffect(() => {
		const generateTimer = () => {
			setTimeLeft(start);
		};
		generateTimer();
	}, [start, increment]);

	useEffect(() => {
		if (timeLeft === 0) return;

		const interval = setInterval(() => {
			increment ? setTimeLeft((prev) => prev - increment) : setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [timeLeft]);

	return <div className="timer__container">{Math.floor(timeLeft)}</div>;
};

export default Timer;
