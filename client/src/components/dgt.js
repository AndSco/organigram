import React, { useContext } from "react";
import Team from "./Team";
import StaffContext from "../context/StaffContext";
import { filterByTeam } from "../helperFunctions";


const Dgt = props => {
	const context = useContext(StaffContext);

	const teamMembers = context.staffMembers 
		?
		filterByTeam(context.staffMembers, "DGT")
		:
		null;	

	return (
		<Team teamName="DGT" teamMembers={teamMembers} />
	)
}

export default Dgt;
