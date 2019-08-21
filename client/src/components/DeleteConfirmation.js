import React from "react";

const DeleteConfirmation = props => {
	const goAheadDelete = () => {
		props.delete(props.staffMember._id);
		props.removeModal();
	}

	const cancelGoBack = () => {
		props.removeModal();
	}

	return (
		<div className="modal">
			<div className="delete-box">
				<h3>Sure you want to delete {props.staffMember.name.toUpperCase()}?</h3>
				<div className="option-buttons">
					<button onClick={ goAheadDelete }>Yes, go ahead</button>
					<button onClick={ cancelGoBack }>No, go back</button>
				</div>
			</div>
		</div>
		)
}

export default DeleteConfirmation;