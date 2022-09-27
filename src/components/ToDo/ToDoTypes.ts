export type ToDoItemProps = {
	text: string;
	onDelete: (value: string) => void;
};

export type ToDoProps = {
	items: string[];
};
