import React, { useContext } from "react";
import Team from "./Team";
import StaffContext from "../context/StaffContext";
import { filterByTeam } from "../helperFunctions";


const Administration = props => {
	const context = useContext(StaffContext);

	const headOfAdmin = context.staffMembers 
		? 
		context.staffMembers.filter(member => member.designation.indexOf("Head of Administration") !== -1)[0]
		:
		null;

	const teamMembers = context.staffMembers 
		?
		filterByTeam(context.staffMembers, "Administration Team", headOfAdmin)
		:
		null;	


	return (
		<Team teamName="Administration Team" headOfTeam={headOfAdmin} teamMembers={teamMembers} />
	)
}

export default Administration;