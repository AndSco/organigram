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


// import React, { useContext } from "react";
// import Employee from "./Employee";
// import StaffContext from "../context/StaffContext";

// const HeadofRep = props => {
// 	const context = useContext(StaffContext);

// 	const headOfRep = context.staffMembers 
// 		?
// 		context.staffMembers.filter(member => member.designation === "Head of Representation")[0]
// 		:
// 		null;

// 	const secretary = context.staffMembers 
// 		?
// 		context.staffMembers.filter(member => member.designation.indexOf("Secretary") > -1)[0]	
// 		:
// 		null;

// 	return (
// 		<div className="head-of-rep">
// 			<Employee staffMember={headOfRep} />
// 			<Employee staffMember={secretary} />
// 		</div>
// 	)
// }

// export default HeadofRep;