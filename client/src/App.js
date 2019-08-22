import React, { useState } from 'react';
import './App.css';
import Header from "./components/Header";
import Grid from "./components/Grid";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faChevronCircleRight, faHome, faDesktop, faTrashAlt, faEdit, faMobileAlt, faPhoneSquareAlt, faEnvelope, faUserPlus, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import AddForm from "./components/AddForm";
import Context from "./context/Context";


library.add(fab, faChevronCircleRight, faDownload, faHome, faDesktop, faTrashAlt, faEdit, faMobileAlt, faPhoneSquareAlt, faEnvelope, faUserPlus, faWindowClose);


function App() {
	// const [staffMembers, setStaffMembers] = useState(null); NOW MANAGED BY CONTEXT
	const [isAdding, setIsAdding] = useState(false);


	const addStaffMember = () => {
		setIsAdding(true);
	}

	const closeForm = () => {
		setIsAdding(false);
	}
	

	const renderContents = () => {
		return (
			<Context>
			    <div className="App">
			    	<AddForm closeForm={closeForm} status={ isAdding ? "form-showing" : "form-hidden" } /> 
				    <Header addStaffMember={addStaffMember} />
			      <Grid />
			    </div>
			</Context> 
		)
	}

    return renderContents();
  }

export default App;
