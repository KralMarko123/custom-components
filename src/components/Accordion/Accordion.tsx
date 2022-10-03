import { useState, useEffect } from "react";
import { AccordionProps } from "./AccordionTypes";
import { KeyboardEvent } from "react";
import "./Accordion.css";

const Accordion = ({ items }: AccordionProps) => {
	const [highlightedItem, setHighlightedItem] = useState<number>(-1);
	const [accordionItems, setAccordionItems] = useState<any[]>([]);

	const handleAccordionToggle = (index: number) => {
		let items = [...accordionItems];
		items.forEach((el, i) => (i !== index ? (el.open = false) : null));
		items[index].open = !items[index].open;
		setAccordionItems([...items]);
	};

	const handleKeyPress = (e: KeyboardEvent<HTMLLIElement>, index: number) => {
		console.log(e.key, index);
		switch (e.key) {
			case "Enter":
			case "Space":
				handleAccordionToggle(highlightedItem);
				break;
			case "ArrowUp":
				if (highlightedItem > 0) {
					handleAccordionToggle(highlightedItem - 1);
					setHighlightedItem((prev) => prev - 1);
				}
				break;
			case "ArrowDown":
				if (highlightedItem < accordionItems.length - 1) {
					handleAccordionToggle(highlightedItem + 1);
					setHighlightedItem((prev) => prev + 1);
				}
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		const generateAccordionItems = () => {
			let initialItems: {}[] = [];
			items?.forEach((i) => {
				initialItems.push({ title: i.title, description: i.description, open: false });
			});
			setAccordionItems(initialItems);
		};
		generateAccordionItems();
	}, [items]);

	return (
		<ul className="accordion">
			{accordionItems.map((a, index) => (
				<li
					key={a.title}
					tabIndex={0}
					className={`accordion__item ${index === highlightedItem ? "highlighted" : null}`}
					onClick={() => handleAccordionToggle(index)}
					onMouseEnter={() => setHighlightedItem(index)}
					onMouseLeave={() => setHighlightedItem(-1)}
					onKeyDown={(e) => handleKeyPress(e, index)}
					onFocus={() => setHighlightedItem(index)}
				>
					<div className="accordion__top">
						<h3 className="accordion__title">{a.title}</h3>
						<span className="accordion__toggle"> {a.open ? "-" : "+"}</span>
					</div>
					<div className={`accordion__bottom ${a.open ? "open" : ""}`}>{a.description}</div>
				</li>
			))}
		</ul>
	);
};

export default Accordion;
