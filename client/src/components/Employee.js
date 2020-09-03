import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalizeSurname } from "../helperFunctions";
import StaffContext from "../context/StaffContext";
import DeleteConfirmation from "./DeleteConfirmation";
import AddForm from "./AddForm";
import { telephoneBase } from "../constants/telephoneBase";
import { teamColors } from "../constants/colors";

const ContactLine = ({ printMode, printText, icon, linkUrl, linkText }) => {
  return (
    <div className="contact-line">
      {printMode ? (
        `${printText}: `
      ) : (
        <FontAwesomeIcon
          icon={icon}
          style={{ marginRight: 3 }}
          color="#7d7d7d"
        />
      )}
      <a href={linkUrl} style={{ color: "#655f62" }}>
        {linkText}
      </a>
    </div>
  );
};

const Employee = props => {
  const context = useContext(StaffContext);
  const { staffMember } = props;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const removeModal = () => {
    setIsDeleting(false);
  };

  const openEditForm = () => {
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
  };

  if (staffMember) {
    return (
      <div
        className="employee"
        style={{ borderBottom: `3px solid ${teamColors[staffMember.team]}` }}
      >
        <div className="left-side-card">
          <div
            className="profile-pic"
            style={{ backgroundImage: `url(${staffMember.imageUrl})` }}
          ></div>
          {context.isAdmin && (
            <div className="edit-delete">
              <FontAwesomeIcon icon="edit" onClick={openEditForm} />
              <FontAwesomeIcon
                icon="trash-alt"
                onClick={() => setIsDeleting(true)}
              />
            </div>
          )}
        </div>
        {isDeleting && (
          <DeleteConfirmation
            delete={context.removeStaffMember}
            staffMember={staffMember}
            removeModal={removeModal}
          />
        )}
        <AddForm
          action="edit"
          status={isEditing ? "form-showing" : "form-hidden"}
          closeForm={closeEditForm}
          staffMember={staffMember}
        />
        <div className="details">
          <h4>{staffMember.designation}</h4>
          <p className="name">
            <em>{capitalizeSurname(staffMember.name)}</em>
          </p>
          <div className="contacts">
            <ContactLine
              printMode={context.printMode}
              printText="Phone"
              icon="phone-square-alt"
              linkUrl={`tel:+35623425${staffMember.officePhone}`}
              linkText={telephoneBase + staffMember.officePhone}
            />
            {staffMember.mobile && (
              <ContactLine
                printMode={context.printMode}
                printText="Mob."
                icon="mobile-alt"
                linkUrl={`tel:+356${staffMember.mobile}`}
                linkText={staffMember.mobile}
              />
            )}

            <ContactLine
              printMode={context.printMode}
              printText="Email"
              icon="envelope"
              linkUrl={`mailto:${staffMember.email}`}
              linkText={staffMember.email}
            />
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default Employee;
