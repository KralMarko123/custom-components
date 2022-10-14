import { useState } from "react";
import { SelectOption } from "./components/Select/SelectTypes";
import { IMAGE_URLS } from "./constants/images";
import DATA from "./constants/data.json";
import Select from "./components/Select/Select";
import Table from "./components/Table/Table";
import ToDo from "./components/ToDo/ToDo";
import Accordion from "./components/Accordion/Accordion";
import Carousel from "./components/Carousel/Carousel";
import Timer from "./components/Timer/Timer";

const App = () => {
	const [multipleSelectValue, setMultipleSelectValue] = useState<SelectOption[]>([
		DATA.selectOptions[0],
	]);
	const [singleSelectValue, setSingleSelectValue] = useState<SelectOption | undefined>(
		DATA.selectOptions[0]
	);

	return (
		<div className="home page">
			<header className="header">
				<h1 className="home__desc">
					// Each component is made using React/Typescript. Feel free to play around and check them
					out.
				</h1>
			</header>

			<div className="container">
				<h2 className="container__title">Single/Multiple Select</h2>
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
				<h2 className="container__title">Table</h2>
				<Table data={DATA.tableData} striped />
			</div>

			<div className="container">
				<h2 className="container__title">ToDo</h2>
				<ToDo items={DATA.toDoItems} />
			</div>

			<div className="container">
				<h2 className="container__title">Accordion</h2>
				<Accordion items={DATA.accordionItems} />
			</div>

			<div className="container">
				<h2 className="container__title">Carousel</h2>
				<Carousel imageURLS={IMAGE_URLS} sliderSpeed={0.35} />
			</div>

			<div className="container">
				<h2 className="container__title">Timer</h2>
				<Timer start={10} decrement={2} />
			</div>

			<footer className="footer">
				<h1 className="home__desc">
					// Check out the source code{" "}
					<a href="https://github.com/KralMarko123/custom-components" target="_blank">
						here.
					</a>
				</h1>
			</footer>
		</div>
	);
};

export default App;
