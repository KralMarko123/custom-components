import { useState, useRef } from "react";
import { TableProps } from "./TableTypes";
import "./Table.css";

const Table = ({ data, striped }: TableProps) => {
	const [entries, setEntries] = useState(data.entries);
	const headerRef = useRef<HTMLTableCellElement>(null);

	const areHeadersEmpty = () => {
		return data.headers.length === 0;
	};

	const areEntriesEmpty = () => {
		return entries.length === 0;
	};

	const sortAscending = (index: number) => {
		headerRef.current?.classList.remove("desc");
		headerRef.current?.classList.add("asc");
		setEntries([
			...entries.sort((a, b) => {
				if (b[index] < a[index]) return 1;
				return 0;
			}),
		]);
	};

	const sortDescending = (index: number) => {
		headerRef.current?.classList.remove("asc");
		headerRef.current?.classList.add("desc");
		setEntries([
			...entries.sort((a, b) => {
				if (b[index] > a[index]) return 1;
				return 0;
			}),
		]);
	};

	const handleHeaderClick = (index: number) => {
		if (headerRef.current?.classList.contains("asc")) {
			sortDescending(index);
		} else if (headerRef.current?.classList.contains("desc")) {
			sortAscending(index);
		} else sortAscending(index);
	};

	return (
		<div className="table__container">
			<table className="table">
				<thead className="table__header">
					<tr className="table__row">
						{!areHeadersEmpty() ? (
							data.headers.map((h, index) => (
								<th
									key={h}
									className="table__header__cell"
									onClick={() => handleHeaderClick(index)}
									ref={headerRef}
								>
									{h}
								</th>
							))
						) : (
							<th className="empty__header">No Headers Present.</th>
						)}
					</tr>
				</thead>
				<tbody className="table__body">
					{!areEntriesEmpty() ? (
						entries.map((e, index) => (
							<tr className={`table__row ${index % 2 !== 0 && striped && "striped"}`} key={index}>
								{e.map((a) => (
									<td className="table__cell" key={a}>
										{a.toString()}
									</td>
								))}
							</tr>
						))
					) : (
						<tr className="table__row empty__body">
							<td className="table__cell">No Entries Present.</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
