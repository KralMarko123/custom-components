import { useState, useRef, FormEvent } from "react";
import "./ToDo.css";

const ToDo = ({ toDoList: [] }) => {
	const [enteredValue, setEnteredValue] = useState<string>("");
	const [isValid, setIsValid] = useState<boolean>(true);
	const inputRef = useRef<HTMLInputElement>(null);

	const formSubmitHandler = (event: FormEvent) => {
		event.preventDefault();

		if (enteredValue.trim().length === 0) {
			setIsValid(false);
			inputRef.current!.placeholder = "Field can't be empty!";
			return;
		}

		setEnteredValue("");
		inputRef.current!.value = "";
		inputRef.current!.placeholder = "Enter text here...!";
	};

	const inputChangeHandler = (event: any) => {
		if (event.target.value.trim().length > 0) {
			setIsValid(true);
		}

		setEnteredValue(event.target.value);
	};

	return (
		<div className="todo__container">
			<div className="todo__card">
				<form
					onSubmit={(e) => formSubmitHandler(e)}
					className={`todo__form ${!isValid && "invalid"}`}
				>
					<input
						className="todo__input"
						type="text"
						onChange={inputChangeHandler}
						ref={inputRef}
						placeholder="Enter text here..."
					/>
					<button type="submit" className="todo__form__button">
						Add To Do
					</button>
				</form>
			</div>

			<div className="todo__card"></div>
		</div>
	);
};

export default ToDo;
