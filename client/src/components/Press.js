import React, { useContext } from "react";
import Team from "./Team";
import StaffContext from "../context/StaffContext";
import { filterByTeam } from "../helperFunctions";


const Press = props => {
	const context = useContext(StaffContext);

	const headOfPress = context.staffMembers 
		? 
		context.staffMembers.filter(member => member.designation.indexOf("Deputy Head of Rep") !== -1)[0]
		:
		null;

	const teamMembers = context.staffMembers 
		?
		filterByTeam(context.staffMembers, "Media & Political Team", headOfPress)
		:
		null;	

	return (
		<Team teamName="Media & Political Team" headOfTeam={headOfPress} teamMembers={teamMembers} />
	)
}

export default Press;