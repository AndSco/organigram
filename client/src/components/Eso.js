import React, { useContext } from "react";
import Team from "./Team";
import StaffContext from "../context/StaffContext";
import { filterByTeam } from "../helperFunctions";


const Eso = props => {
	const context = useContext(StaffContext);

	const teamMembers = context.staffMembers 
		?
		filterByTeam(context.staffMembers, "Economic Team")
		:
		null;	

	return (
		<Team teamName="Economic Team" teamMembers={teamMembers} />
	)
}

export default Eso;