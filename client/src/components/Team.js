import React from "react";
import Employee from "./Employee";

const Team = props => {


	const renderContents = () => {
		return (
			<div className="team">
				<h2 className={props.teamName.toUpperCase()}>
					{props.teamName.toUpperCase()}
				</h2>
				{props.headOfTeam && <Employee staffMember={props.headOfTeam} /> }
				{ props.teamMembers && props.teamMembers.map((member, index) => <Employee staffMember={member} key={index} />) }
			</div>
		)
	}
	return renderContents();
		
}


export default Team;