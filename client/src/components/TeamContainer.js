import React from "react";
import Communications from "./Communications";
import Administration from "./Administration";
import Eso from "./Eso";

const TeamContainer = props => {

	const renderContents = () => {
		return (
		<div className="team-container">
			<Communications />
			<Administration />
			<Eso />
		</div>
	)};
	

	return renderContents();
}


export default TeamContainer;
