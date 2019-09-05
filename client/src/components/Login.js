import React, {useState} from "react";
import axios from "axios";
import ErrorBox from "./Error";

const Login = props => {
	const [input, setInput] = useState("");
	const [error, setError] = useState(false);
	
	const handleChange = (e) => {
		setInput(e.target.value);
	}

	const logUserIn = (e) => {
		e.preventDefault();
		axios.post("/api/login", {password: input})
			.then(res => {
				console.log(res);
				if (res.data === "isAdmin") {
					props.handleLogin();
					props.authoriseAdmin();
					localStorage.setItem("isAdmin", "true");
				}
				else if (res.data === "isReader") {
					props.handleLogin();
					localStorage.setItem("isReader", "true");
				}
				else { 
					setError(true);
					setInput("");
				}
			});
	}


	const removeError = () => {
		setError(false);
	}

	return (
		<div className="modal">
			{ error && <ErrorBox message="Wrong password!" removeError={removeError} />}
			<div className="login-box">
				<h3>ENTER PASSWORD TO ACCESS:</h3>
				<form onSubmit={(e) => logUserIn(e)}>
					<input type="password" name="password" onChange={(e) => handleChange(e)} />
					<button>LOG IN</button>
				</form>
			</div>	
		</div>
	)
}



export default Login;