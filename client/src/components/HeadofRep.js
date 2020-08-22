import React, { useContext } from "react";
import Team from "./Team";
import StaffContext from "../context/StaffContext";
import { filterByTeam } from "../helperFunctions";


const HeadofRep = props => {
	const context = useContext(StaffContext);

	const headOfRep = context.staffMembers 
		? 
		context.staffMembers.filter(member => member.team === "HOR" && member.designation.indexOf("Secretary") === -1)[0]
		:
		null;

	const teamMembers = context.staffMembers 
		?
		filterByTeam(context.staffMembers, "HOR", headOfRep)
		:
		null;	

	return (
		<Team teamName="Head of Rep. Office" headOfTeam={headOfRep} teamMembers={teamMembers} className="hor-office" />
	)
}

export default HeadofRep;

