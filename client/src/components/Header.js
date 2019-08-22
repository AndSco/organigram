import React, {useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import StaffContext from "../context/StaffContext";

const Header = props => {

	const context = useContext(StaffContext);

	// SAVE as PFD - onclick, I add a class changing size to A2, removed after the PDF has been saved
	const savePdf = async function() {
		context.startLoading();
		await context.enterPrintMode();
		const toPrint = document.querySelector(".App");
		toPrint.className += " to-print";
		html2canvas(toPrint, {useCORS: true}) // to allow saving external images!
	      .then(canvas => {
	        const imgData = canvas.toDataURL("image/png");
	        const pdf = new jsPdf("p", "mm", "a2");
	        pdf.addImage(imgData, "PNG", 0, 0, 420, 594);
	        pdf.save("EC_Rep_organigram.pdf");
	    })
	    .then(() => {
	    	toPrint.classList.remove("to-print");
	    	context.exitPrintMode();
	    	context.stopLoading();
	    });  
	}

	return (
		<header>
			<div id="icons-menu">
				<FontAwesomeIcon icon="download" size="2x" onClick={savePdf} />
				{ context.isAdmin && <FontAwesomeIcon icon="user-plus" size="2x" onClick={props.addStaffMember} />}
				<FontAwesomeIcon icon="sign-out-alt" size="2x" onClick={context.logOut} />
			</div>	
			<div className="title">
				<h2>European Commission</h2>
				<h1>Representation in Malta</h1>
			</div>	
		</header>
	)
}

export default Header;