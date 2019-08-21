import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Error = props => {
	return (
		<div className="modal">
			<div className="error-box">
				<FontAwesomeIcon icon="window-close" onClick={props.removeError} />
				<h3>ERROR!</h3>
				<p>{props.message}</p>
			</div>
		</div>
	)
}

export default Error;