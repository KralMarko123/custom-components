import { useState, useEffect, useRef } from "react";
import { SelectProps, SelectOption } from "./SelectTypes";
import "./Select.css";

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const clearOptions = () => {
		multiple ? onChange([]) : onChange(undefined);
		setIsOpen(false);
	};

	const selectOption = (option: SelectOption) => {
		if (multiple) {
			if (value.includes(option)) {
				onChange(value.filter((o) => o !== option));
			} else {
				onChange([...value, option]);
			}
		} else {
			option !== value ? onChange(option) : null;
		}
	};

	const isOptionSelected = (option: SelectOption) => {
		return multiple ? value.includes(option) : option === value;
	};

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.target !== containerRef.current) return;

			switch (e.code) {
				case "Enter":
				case "Space":
					setIsOpen((prev) => !prev);
					isOpen ? selectOption(options[highlightedIndex]) : null;
					break;

				case "ArrowUp":
				case "ArrowDown": {
					if (!isOpen) {
						setIsOpen(true);
						break;
					}

					const newIndex = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
					newIndex >= 0 && newIndex < options.length ? setHighlightedIndex(newIndex) : null;
					break;
				}

				case "Escape":
					setIsOpen(false);
					break;

				default:
					break;
			}
		};

		containerRef.current?.addEventListener("keydown", handler);

		return () => {
			containerRef.current?.removeEventListener("keydown", handler);
		};
	}, [isOpen, highlightedIndex, options]);

	return (
		<div
			onClick={() => setIsOpen((prev) => !prev)}
			onBlur={() => setIsOpen(false)}
			tabIndex={0}
			className="select__container"
			ref={containerRef}
		>
			<span className={`select__value ${multiple && "multiple"}`}>
				{multiple
					? value.map((v) => (
							<button
								key={v.value}
								onClick={(e) => {
									e.stopPropagation();
									selectOption(v);
								}}
								className="select__badge"
							>
								{v.label}
								<span className="select__badge__remove">&times;</span>
							</button>
					  ))
					: value?.label}
			</span>

			<div className="select__utility">
				<button
					className="select__clear"
					onClick={(e) => {
						e.stopPropagation();
						clearOptions();
					}}
				>
					&times;
				</button>
				<div className="select__separator"></div>
				<div className={`select__arrow ${isOpen && "open"}`}></div>
			</div>

			<ul className={`select__options ${isOpen && "show"}`}>
				{options.map((option, index) => (
					<li
						key={option.value}
						className={`select__option ${isOptionSelected(option) && "selected"} ${index ===
							highlightedIndex && "highlighted"}`}
						onClick={(e) => {
							e.stopPropagation();
							selectOption(option);
							setIsOpen(false);
						}}
						onMouseEnter={() => setHighlightedIndex(index)}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Select;
