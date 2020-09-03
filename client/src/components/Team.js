import React from "react";
import Employee from "./Employee";
import { teamColors } from "../constants/colors";

const Team = props => {
  const renderContents = () => {
    return (
      <div className="team">
        <h2 style={{ backgroundColor: teamColors[props.teamName] }}>
          {props.teamName.toUpperCase()}
        </h2>
        {props.headOfTeam && <Employee staffMember={props.headOfTeam} />}
        {props.teamMembers &&
          props.teamMembers.map((member, index) => (
            <Employee staffMember={member} key={index} />
          ))}
      </div>
    );
  };
  return renderContents();
};

export default Team;
