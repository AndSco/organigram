import React, { useContext } from "react";
import TopContainer from "./TopContainer";
import TeamContainer from "./TeamContainer";
import ContactsBox from "./ContactsBox";
import StaffContext from "../context/StaffContext";
import moment from "moment";

const Grid = props => {

	const context = useContext(StaffContext);
	
	return(
		<div className="grid">
			<TopContainer />
			<TeamContainer />
			<div className="bottom-container">
				<p className="last-update">Last updated on {moment(context.lastUpdate).format("MMMM Do YYYY")}</p>
				<ContactsBox />
			</div>	
		</div>
	)
}

export default Grid;