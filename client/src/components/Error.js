import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Error = props => {
	return (
		<div className="modal">
			<div className="error-box">
				<FontAwesomeIcon icon="window-close" size="2x" onClick={props.removeError} />
				<h4>{props.message.toUpperCase()}</h4>
			</div>
		</div>
	)
}

export default Error;