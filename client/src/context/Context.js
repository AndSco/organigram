import React, {useState, useEffect} from "react";
import StaffContext from "./StaffContext";
import axios from "axios";
import Loading from "../components/Loading";
import ErrorBox from "../components/Error";
import Login from "../components/Login";


const Context = props => {
	// Context provides the state, hence I have to manage state here. 
	// Switch triggered by addForm(manageNewInput function) sends context to fetch again from DB!
	const [staffMembers, setStaffMembers] = useState(null);
	const [hasAddedNew, setHasAddedNew] = useState(false);
	const [hasDeleted, setHasDeleted] = useState(false);
	const [hasEdited, setHasEdited] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [lastUpdate, setLastUpdate] = useState(null);
	const [printMode, setPrintMode] = useState(false);

	// check first if credentials are in local storage
	const credentialsInStorage = localStorage["isAdmin"] || localStorage["isReader"];
	const [isLoggedIn, setIsLoggedIn] = useState(credentialsInStorage);
	const isAdminInStorage = localStorage["isAdmin"];
	const [isAdmin, setIsAdmin] = useState(isAdminInStorage);
	

	const manageNewInput = () => {
		setHasAddedNew(!hasAddedNew);
	}

	const triggerEditing = () => {
		setHasEdited(true);
	}

	// StartLoading begins when form button is clicked
	const startLoading = () => {
		setIsLoading(true);
	}

	const stopLoading = () => {
		setIsLoading(false);
	}


	const removeStaffMember = (employeeId) => {
		const deleteEndPoint = `/api/employees/${employeeId}`;
		axios.delete(deleteEndPoint)
			.then(res => console.log(res))
			.then(() => setHasDeleted(true))
			.catch(err => console.log(err));
	}


	const addError = (message) => {
		setError(message);
	}

	const removeError = () => {
		setError(false);
	}


	const enterPrintMode = () => {
		setPrintMode(true);
	}

	const exitPrintMode = () => {
		setPrintMode(false);
	}


	const handleLogin = () => {
		setIsLoggedIn(true);
	}

	const logOut = () => {
		console.log("LOGGING OUT");
		setIsAdmin(false);
		setIsLoggedIn(false);
		// REMOVE CREDENTIALS FROM LOCAL STORAGE WHEN LOGGING OUT
		localStorage.removeItem("isAdmin");
		localStorage.removeItem("isReader");
	}

	const authoriseAdmin = () => {
		setIsAdmin(true);
	}

	// EFFECTS

	useEffect(() => {
		startLoading();
		axios.get("/api/employees")
			.then(res => {
				setStaffMembers(res.data.employees);
				setLastUpdate(res.data.lastUpdate);
			})
			.then(stopLoading)
			.catch(err => console.log(err));
	}, []);



	useEffect(() => {
		if (hasAddedNew || hasEdited) {
			console.log("RERENDER!");
			axios.get("/api/employees")
				.then(res => setStaffMembers(res.data.employees))
				.then(stopLoading())
				.then(setHasEdited(false))
				.catch(err => console.log(err));
		}
	}, [hasAddedNew, hasEdited]);


	useEffect(() => {
		if (hasDeleted) {
			console.log("DELETED!");
			axios.get("/api/employees")
				.then(res => setStaffMembers(res.data.employees))
				.then(setHasDeleted(false))
				.catch(err => console.log(err));
		}
	}, [hasDeleted]);


	useEffect(() => {
		console.log(lastUpdate);
	}, [lastUpdate]);

	// useEffect(() => console.log(isLoading), [isLoading]);




	return (
		<StaffContext.Provider value={{
			staffMembers: staffMembers, 
			manageNewInput: manageNewInput, 
			startLoading: startLoading, 
			stopLoading: stopLoading, 
			removeStaffMember: removeStaffMember, 
			triggerEditing: triggerEditing, 
			addError: addError, 
			lastUpdate: lastUpdate, 
			printMode: printMode, 
			enterPrintMode: enterPrintMode, 
			exitPrintMode: exitPrintMode, 
			isAdmin: isAdmin, 
			logOut: logOut
		}}>
		
		{ isLoading && <Loading /> }
		
		{ error && <ErrorBox message={error} removeError={removeError} /> }
			
			{ isLoggedIn 
				? 
				props.children
				:
				<Login handleLogin={handleLogin} authoriseAdmin={authoriseAdmin} />
			}
		
		</StaffContext.Provider>
	)
}

export default Context;

