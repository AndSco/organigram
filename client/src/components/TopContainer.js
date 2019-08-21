import React from "react";
import HeadofRep from "./HeadofRep";
import Dgt from "./dgt";
import Press from "./Press";

const TopContainer = props => {
	return (
		<div className="top-container">
			<Dgt />
			<HeadofRep />
			<Press />
		</div>
	)
}


export default TopContainer;

