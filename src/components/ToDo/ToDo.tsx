import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { ToDoProps } from "./ToDoTypes";
import ToDoItem from "./ToDoItem";
import "./ToDo.css";

const ToDo = ({ items }: ToDoProps) => {
	const [toDos, setToDos] = useState<string[]>([...new Set(items)]);
	const [isValid, setIsValid] = useState<boolean>(true);
	const inputRef = useRef<HTMLInputElement>(null);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (inputRef.current?.value.trim().length === 0) {
			setIsValid(false);
			inputRef.current!.placeholder = "Field cannot be empty!";
			return;
		} else if (toDos.includes(inputRef.current!.value)) {
			setIsValid(false);
			inputRef.current!.value = "";
			inputRef.current!.placeholder = "You already have that item!";
			return;
		}

		let newToDos = [...toDos];
		newToDos.unshift(inputRef.current!.value);
		setToDos(newToDos);

		inputRef.current!.value = "";
		inputRef.current!.placeholder = "Enter text here...!";
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.currentTarget.value.trim().length > 0 ? setIsValid(true) : null;
	};

	const onDelete = (text: string) => {
		setToDos([...toDos].filter((toDo) => toDo !== text));
	};

	return (
		<div className="todo__container">
			<div className="todo__card">
				<form onSubmit={(e) => onSubmit(e)} className={`todo__form ${!isValid && "invalid"}`}>
					<input
						className="todo__input"
						type="text"
						onChange={onChange}
						ref={inputRef}
						placeholder="Enter text here..."
					/>
					<button type="submit" className="todo__form__button">
						Add Item
					</button>
				</form>
			</div>

			<div className="todo__card">
				<ul className="todo__list">
					{toDos.length > 0 ? (
						toDos.map((toDo) => (
							<ToDoItem key={toDo} text={toDo} onDelete={(text) => onDelete(text)} />
						))
					) : (
						<h1>No Items </h1>
					)}
				</ul>
			</div>
		</div>
	);
};

export default ToDo;
