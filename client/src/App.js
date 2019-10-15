import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/Header";
import Grid from "./components/Grid";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faChevronCircleRight, faSignOutAlt, faHome, faDesktop, faTrashAlt, faEdit, faMobileAlt, faPhoneSquareAlt, faEnvelope, faUserPlus, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import AddForm from "./components/AddForm";
import Context from "./context/Context";
import AddToHomePopup from "./components/AddToHomePopup";



library.add(fab, faChevronCircleRight, faSignOutAlt, faDownload, faHome, faDesktop, faTrashAlt, faEdit, faMobileAlt, faPhoneSquareAlt, faEnvelope, faUserPlus, faWindowClose);


function App() {
	// const [staffMembers, setStaffMembers] = useState(null); NOW MANAGED BY CONTEXT
	const [isAdding, setIsAdding] = useState(false);
	
	// Manage popup to add to screen only on iphone if not installed already


	const [showAddToScreenPopup, setShowAddToScreenPopup] = useState(false);
	
	// Detects if device is on iOS 
	const isIos = () => {
	  const userAgent = window.navigator.userAgent.toLowerCase();
	  console.log("userAgent", userAgent);
	  return /iphone|ipad|ipod/.test( userAgent );
	}

	// Detects if device is in standalone mode
	const isInStandaloneMode = () => (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');

	// ('standalone' in window.navigator) && (window.navigator.standalone);

	//(window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');

	
	
	useEffect(() => {
		console.log("NAVIGATOR: ", window.navigator);
		console.log("isIos", isIos());
		console.log("isInStandaloneMode", isInStandaloneMode())
		if (isIos && !isInStandaloneMode) {
			setShowAddToScreenPopup(true);
		}	
	}, []);


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
			      <AddToHomePopup isIos={isIos} isStandAlone={isInStandaloneMode} />
			    </div>
			</Context> 
		)
	}

    return renderContents();
  }


export default App;

// { showAddToScreenPopup && <AddToHomePopup /> }
