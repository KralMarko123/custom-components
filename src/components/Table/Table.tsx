import { useState, useEffect } from "react";
import { TableProps } from "./TableTypes";
import "./Table.css";

const Table = ({ data, striped }: TableProps) => {
	const [headers, setHeaders] = useState<any[]>([]);
	const [highlightedHeader, setHighlightedHeader] = useState<number>(-1);
	const [entries, setEntries] = useState<any[][]>([]);
	const [sortApplied, setSortApplied] = useState({ sort: false, index: 0 });

	const areHeadersEmpty = () => {
		return headers.length === 0;
	};

	const areEntriesEmpty = () => {
		return entries.length === 0;
	};

	useEffect(() => {
		const generateHeaders = () => {
			let initialHeaders: {}[] = [];
			data?.headers.forEach((h) => {
				initialHeaders.push({ header: h, sortOrder: "" });
			});
			setHeaders(initialHeaders);
		};

		const generateEntries = () => {
			let initialEntries: any[][] = [];
			data?.entries.forEach((e) => {
				initialEntries.push(e);
			});
			setEntries(initialEntries);
		};

		generateHeaders();
		generateEntries();
	}, [data]);

	useEffect(() => {
		const sortAscending = (index: number) => {
			headers[index].sortOrder = "ascending";
			setEntries(
				[...entries].sort((a, b) => {
					if (b[index] > a[index]) {
						return -1;
					} else if (b[index] === a[index]) {
						return 0;
					} else return 1;
				})
			);
		};

		const sortDescending = (index: number) => {
			headers[index].sortOrder = "descending";
			setEntries(
				[...entries].sort((a, b) => {
					if (b[index] < a[index]) {
						return -1;
					} else if (b[index] === a[index]) {
						return 0;
					} else return 1;
				})
			);
		};

		const clearSortingForOtherHeaders = (index: number) => {
			let currentHeaders = headers;
			currentHeaders.forEach((h, i) => (index !== i ? (h.sortOrder = "") : null));
			setHeaders(currentHeaders);
		};

		const handleHeaderClick = (index: number) => {
			clearSortingForOtherHeaders(index);
			if (headers[index].sortOrder === "ascending") {
				sortDescending(index);
			} else sortAscending(index);
		};

		if (sortApplied.sort === true) {
			handleHeaderClick(sortApplied.index);
			setSortApplied({ sort: false, index: 0 });
		}
	}, [sortApplied]);

	return (
		<div className="table__container">
			<table className="table">
				<thead className="table__header">
					<tr className="table__row">
						{!areHeadersEmpty() ? (
							headers.map((h, index) => (
								<th
									key={index}
									className={`table__header__cell ${h.sortOrder} ${
										highlightedHeader === index ? "highlighted" : ""
									}`}
									onKeyDown={(e) => {
										switch (e.key) {
											case "Enter":
											case "Space":
												setSortApplied({ sort: true, index: highlightedHeader });
												break;
											case "ArrowLeft":
												highlightedHeader > 0 ? setHighlightedHeader((prev) => prev - 1) : null;
												break;
											case "ArrowRight":
												highlightedHeader < headers.length - 1
													? setHighlightedHeader((prev) => prev + 1)
													: null;
												break;
											default:
												break;
										}
									}}
									onClick={() => {
										setSortApplied({ sort: true, index: index });
									}}
									onFocus={() => setHighlightedHeader(index)}
									tabIndex={0}
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
							<tr
								className={`table__row ${index % 2 !== 0 && striped ? "striped" : ""}`}
								key={index}
							>
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
