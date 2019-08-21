import React, {useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../images/logo.jpg";
import StaffContext from "../context/StaffContext";

const ContactsBox = props => {

	const context = useContext(StaffContext);

	return (
		<div className="contacts-box">
			<h2>Representation's contact details</h2>
			<ul>
				<li>{context.printMode 
						?
						"Address: "
						:
						<FontAwesomeIcon icon="home"/>
					}
					Europe House, 254 St Paul’s Str, Valletta (VLT 1215)
				</li>
				
				<li>{context.printMode 
						?
						"Phone: "
						:
						<FontAwesomeIcon icon="phone-square-alt"/>
					}
					<a href="tel:+35623425100">+356 2342 5100</a>
				</li>

				<li>{context.printMode 
						?
						"Email: "
						:
						<FontAwesomeIcon icon="envelope"/>
					}
					<span onClick={() => {
						window.location.href = "mailto:comm-rep-mt@ec.europa.eu";
						return;
					}} className="mail-link">comm-rep-mt@ec.europa.eu</span>
				</li>

				<li>{context.printMode 
						?
						"Twitter: "
						:
						<FontAwesomeIcon icon={['fab', 'twitter']} />
					}
					<a href="https://twitter.com/ECRepMalta">@ECRepMalta</a>
				</li>

				<li>{context.printMode 
						?
						"Facebook: "
						:
						<FontAwesomeIcon icon={['fab', 'facebook']} />
					}
					<a href="https://www.facebook.com/KummissjoniEwropea">KummissjoniEwropea</a>
				</li>

				<li>{context.printMode 
						?
						"Instagram: "
						:
						<FontAwesomeIcon icon={['fab', 'instagram']}/>
					}
					<a href="https://www.instagram.com/euinmalta/">EUinMalta</a>
				</li>

				<li>{context.printMode 
						?
						"Website: "
						:
						<FontAwesomeIcon icon="desktop"/>
					}
					<a href="https://ec.europa.eu/malta/">www.ec.europa.eu/malta</a>
				</li>

			</ul>
			<img src={logo} width="60" height="60" className="logo" alt="EC Rep logo" />
		</div>
	)
}

export default ContactsBox;