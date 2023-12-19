/** IMPORTS **/
/**
 * Css
 */
import "bootstrap/dist/css/bootstrap.min.css"; // <- import bootstrap css
import "./scss/main.scss"; // <- After bootstrap for precedence

/**
 * React
 */
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/** 
 * Layout 
 */
import Layout from "./components/Layout";
import HeaderDefault from "./components/header/HeaderDefault";
import SearchBar from "./components/SearchBar";
import FooterDefault from "./components/Footer/FooterDefault";
/** Pages */
const IdxPageMain = React.lazy(() => import('./pages/IdxPage'));
const NotFoundPageMain = React.lazy(() => import('./pages/NotFoundPage'));
// const HmePageMain = React.lazy(() => import('./pages/HmePage'));
// const GllPageMain = React.lazy(() => import('./pages/GllPage'));
// const NxsPageMain = React.lazy(() => import('./pages/NxsPage'));
// const ShpPageMain = React.lazy(() => import('./pages/ShpPage'));
// const ClgPageMain = React.lazy(() => import('./pages/ClgPage'));
const AbtPageMain = React.lazy(() => import('./pages/AbtPage'));

/**
 * Data & Custom Hooks/Functions
 */
import urlData from "./data/s6-url-data";
import getLoadingJSX from "./components/LoadingScaffold/getLoadingJSX";

const App = () => {
	return (
		<Router>
			<Layout
				main={
				<>
					<SearchBar />
					{getJSXContent()}
				</>
				}
				header={<HeaderDefault/>}
				footer={<FooterDefault />}
			/>
		</Router>
	);
};

const getJSXContent = () => {
	const pageComponents = {
		// todo: import this components at the top of the file once the page migration is done from s6
		idx: IdxPageMain,
		// hme: HmePageMain,
		// gll: GllPageMain,
		// nxs: NxsPageMain,
		// shp: ShpPageMain,
		// clg: ClgPageMain,
		abt: AbtPageMain,

		//! PLACEHOLDERS
		hme: () => (<>HmePageMain Placeholder</>),
		gll: () => (<>GllPageMain Placeholder</>),
		nxs: () => (<>NxsPageMain Placeholder</>),
		shp: () => (<>ShpPageMain Placeholder</>),
		clg: () => (<>ClgPageMain Placeholder</>),
		// abt: () => (<>AbtPageMain Placeholder</>),
	};


	return(
		<Suspense fallback={getLoadingJSX()}>
			<Routes>
				<Route path="/" element={<IdxPageMain/>}/> 
				{
					urlData.map(({abbreviation,subdirectory,path}, index) => {
						try {						
							const currentMain = pageComponents[abbreviation];
							if(currentMain === undefined) throw Error(`The [${abbreviation}] abbreviation index wasnt found inside the [pageComponents] object, but is defined in [s6-url-data.js]`);
							return <Route 
								key={index} 
								path={subdirectory+path} 
								element={React.createElement(currentMain)}
							/>
						} catch (error) {
							console.error(error);
						}
					})
				}
				<Route path="*" element={<NotFoundPageMain/>}/>
			</Routes>
		</Suspense>
	);
}

export default App;