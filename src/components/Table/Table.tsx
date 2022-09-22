import { useState } from "react";
import { TableProps } from "./TableTypes";
import "./Table.css";

const Table = ({ data }: TableProps) => {
	const [headers, setData] = useState(data.headers);
	const [entries, setEntries] = useState(data.entries);

	const areHeadersEmpty = () => {
		return headers.length === 0;
	};

	const areEntriesEmpty = () => {
		return entries.length === 0;
	};

	const handleHeaderClick = (i: number) => {
		entries.forEach((e) => console.log(e[i]));
	};

	return (
		<div className="table__container">
			<table className="table">
				<thead className="table__header">
					<tr className="table__row">
						{!areHeadersEmpty() ? (
							headers.map((h, index) => (
								<th
									key={h}
									className="table__header__cell"
									onClick={() => handleHeaderClick(index)}
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
						entries.map((e, i) => (
							<tr className="table__row" key={i}>
								{e.map((a) => (
									<td className="table__cell" key={a}>
										{a}
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
