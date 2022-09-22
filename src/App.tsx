import Select from "./components/Select/Select";
import { useState } from "react";
import { SelectOption } from "./components/Select/SelectTypes";

const options = [
	{ label: "First", value: 1 },
	{ label: "Second", value: 2 },
	{ label: "Third", value: 3 },
	{ label: "Fourth", value: 4 },
	{ label: "Fifth", value: 5 },
];

const App = () => {
	const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
	const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);
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
					value={value1}
					options={options}
					onChange={(option) => setValue1(option)}
				/>
				<Select value={value2} options={options} onChange={(option) => setValue2(option)} />
			</div>
		</div>
	);
};

export default App;
