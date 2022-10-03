import { useState } from "react";
import { ToDoItemProps } from "./ToDoTypes";
import "./ToDoItem.css";

const ToDoItem = ({ text, onDelete }: ToDoItemProps) => {
	const [isChecked, setIsChecked] = useState(false);
	return (
		<li className="todo__item">
			<h3 className={`todo__title ${isChecked && "checked"}`}>{text}</h3>
			<div className="todo__controls">
				<span
					tabIndex={0}
					className={`todo__check ${isChecked && "checked"}`}
					onClick={() => setIsChecked((prev) => !prev)}
					onKeyDown={(e) => {
						e.key === "Enter" ? setIsChecked((prev) => !prev) : null;
					}}
				>
					&#x2713;
				</span>
				<span
					tabIndex={0}
					className="todo__remove"
					onClick={() => onDelete(text)}
					onKeyDown={(e) => {
						e.key === "Enter" ? onDelete(text) : null;
					}}
				>
					&times;
				</span>
			</div>
		</li>
	);
};

export default ToDoItem;
