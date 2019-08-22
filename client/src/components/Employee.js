import React, {useContext, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeSurname } from "../helperFunctions";
import StaffContext from "../context/StaffContext";
import DeleteConfirmation from "./DeleteConfirmation";
import AddForm from "./AddForm";

const Employee = props => {
	const context = useContext(StaffContext);
	const { staffMember } = props;
	const [isDeleting, setIsDeleting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const removeModal = () => {
		setIsDeleting(false);
	}

	const openEditForm = () => {
		setIsEditing(true);
	}

	const closeEditForm = () => {
		setIsEditing(false);
	}


	if (staffMember) {
		return (
			<div className={`employee ${staffMember.team.split(" ")[0].toUpperCase()}`}>
				<div className="left-side-card">
					<div className="profile-pic" style={{backgroundImage: `url(${staffMember.imageUrl})`}} ></div>
					{ context.isAdmin && 
						(
							<div className="edit-delete">
								<FontAwesomeIcon icon="edit" onClick={openEditForm} />
								<FontAwesomeIcon icon="trash-alt" onClick={() => setIsDeleting(true)} />
							</div>	
						)
					}
					
				</div>	
				{isDeleting && <DeleteConfirmation delete={context.removeStaffMember} staffMember={staffMember} removeModal={removeModal} />}
				<AddForm action="edit" status={ isEditing ? "form-showing" : "form-hidden" } closeForm={closeEditForm} staffMember={staffMember} />
				<div className="details">
					<h4>{ staffMember.designation }</h4>
					<p className="name"><em>{ capitalizeSurname(staffMember.name) }</em></p>
					<div className="contacts">
						<div className="phones">
							<span className="tel">
								{ context.printMode 
									?
									"Phone: "
									:
									<FontAwesomeIcon icon="phone-square-alt" />
								} 
								<a href={`tel:+35623425${staffMember.officePhone}`}>{staffMember.officePhone}</a>
							</span>	
							{ staffMember.mobile && 
								<span className="mobile">
									{ context.printMode 
										?
										"Mob.: "
										:
										<FontAwesomeIcon icon="mobile-alt" />
									}
									<a href={`tel:+356${staffMember.mobile}`}>{staffMember.mobile}</a> 
									
									
								</span>	
							}
						</div>	
						<div className="email">
							<FontAwesomeIcon icon="envelope" />	
							<span className="mail-link" onClick={() => {
								window.location.href = `mailto:${staffMember.email}`;
								return;
							}}>{staffMember.email}</span>
						</div>	
					</div>
				</div>
			</div>
	)
	} else return null;
	
}


// href={`mailto:${staffMember.email}`}
export default Employee;