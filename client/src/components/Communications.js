import React, { useContext } from "react";
import Team from "./Team";
import StaffContext from "../context/StaffContext";
import { filterByTeam } from "../helperFunctions";


const Communications = props => {
	const context = useContext(StaffContext);

	const headOfComms = context.staffMembers 
		? 
		context.staffMembers.filter(member => member.designation.indexOf("Head of Communication") !== -1)[0]
		:
		null;

	const teamMembers = context.staffMembers 
		?
		filterByTeam(context.staffMembers, "Communications Team", headOfComms)
		:
		null;	


	return (
		<Team teamName="Communications Team" headOfTeam={headOfComms} teamMembers={teamMembers} />
	)
}

export default Communications;