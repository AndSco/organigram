import React from "react";
import Icon from "../images/addHomeIcon.png";

const AddToHomePopup = props => {
	return (
		<div style={styles.container} className="addHomePopup">
			<div style={styles.textContainer}>
				<p>Install this app on your iPhone! Tap <img src={Icon} alt="add to home" style={styles.image} /> below and then "Add to Homescreen".</p>
			</div>	
		</div>
	);
}

const styles = {
	container: {
		display: "flex", 
		borderTop: "3px solid #1573D8",
		flexDirection: "column", 
		jusdtifyContent: "center", 
		alignItems: "center",
		width: "100%",
		fontSize: "18px", 
		backgroundColor: "white", 
		color: "black", 
		position: "fixed", 
		bottom: 0, 
		zIndex: 300, 
		lineHeight: "20px", 
		// padding: "10px", 
		alignText: "center"
	}, 
	textContainer: {
		width: "80%", 
		// padding: "5px",
		display: "flex", 
		justifyContent: "center"
	},
	image: {
		width: "18px",
		height: "18px",
	}
}

export default AddToHomePopup;