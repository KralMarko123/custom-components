import { useState } from "react";
import { SelectOption } from "./components/Select/SelectTypes";
import Select from "./components/Select/Select";
import DATA from "./constants/data.json";
import Table from "./components/Table/Table";

const App = () => {
	const [multipleSelectValue, setMultipleSelectValue] = useState<SelectOption[]>([
		DATA.selectOptions[0],
	]);
	const [singleSelectValue, setSingleSelectValue] = useState<SelectOption | undefined>(
		DATA.selectOptions[0]
	);

	return (
		<div className="home page">
			<h1 className="home__desc">
				// Each component is made using React/Typescript. Feel free to play around and check them
				out.
			</h1>
			<div className="container">
				<h3 className="container__title">Single/Multiple Select</h3>
				<Select
					multiple
					value={multipleSelectValue}
					options={DATA.selectOptions}
					onChange={(option) => setMultipleSelectValue(option)}
				/>
				<Select
					value={singleSelectValue}
					options={DATA.selectOptions}
					onChange={(option) => setSingleSelectValue(option)}
				/>
			</div>

			<div className="container">
				<h3 className="container__title">Table</h3>
				<Table data={DATA.tableData} striped />
			</div>
		</div>
	);
};

export default App;
