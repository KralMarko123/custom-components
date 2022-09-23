import { useState, useEffect } from "react";
import { TableProps } from "./TableTypes";
import "./Table.css";

const Table = ({ data, striped }: TableProps) => {
	const [headers, setHeaders] = useState<Array<any>>([]);
	const [entries, setEntries] = useState(data.entries);

	const areHeadersEmpty = () => {
		return headers.length === 0;
	};

	const areEntriesEmpty = () => {
		return entries.length === 0;
	};

	const sortAscending = (index: number) => {
		headers[index].sortOrder = "ascending";
		setEntries([
			...entries.sort((a, b) => {
				if (b[index] < a[index]) return 1;
				return 0;
			}),
		]);
	};

	const sortDescending = (index: number) => {
		headers[index].sortOrder = "descending";
		setEntries([
			...entries.sort((a, b) => {
				if (b[index] > a[index]) return 1;
				return 0;
			}),
		]);
	};

	const handleHeaderClick = (index: number) => {
		headers.forEach((h, i) => (index !== i ? (h.sortOrder = "") : null));

		if (headers[index].sortOrder === "ascending") {
			sortDescending(index);
		} else if (headers[index].sortOrder === "descending") {
			sortAscending(index);
		} else sortAscending(index);
	};

	useEffect(() => {
		const generateHeaders = () => {
			let headerArray: {}[] = [];
			data.headers.forEach((h) => {
				headerArray.push({ header: h, sortOrder: "" });
			});
			setHeaders(headerArray);
		};
		generateHeaders();
	}, []);

	return (
		<div className="table__container">
			<table className="table">
				<thead className="table__header">
					<tr className="table__row">
						{!areHeadersEmpty() ? (
							headers.map((h, index) => (
								<th
									key={index}
									className={`table__header__cell ${h.sortOrder}`}
									onClick={() => handleHeaderClick(index)}
								>
									{h.header}
								</th>
							))
						) : (
							<th className="empty__header" colSpan={100} style={{ textAlign: "center" }}>
								No Headers Present.
							</th>
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
							<td className="table__cell" colSpan={100} style={{ textAlign: "center" }}>
								No Entries Present.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
