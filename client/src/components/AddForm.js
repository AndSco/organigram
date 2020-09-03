import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StaffContext from "../context/StaffContext";

// WILL USE THE SAME COMPONENT FOR UPLOAD AND EDIT!
const AddForm = props => {
  const context = useContext(StaffContext);

  // console.log("Context from form", context);

  const [designation, setDesignation] = useState("");
  const [name, setName] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("DGT");
  const [imageFile, setImageFile] = useState("");
  const [needNewPicture, setNeedNewPicture] = useState(false);
  const [needNewTeam, setNeedNewTeam] = useState(false);

  // FOR EDITING! Set state with params of the current object. these will populate the input as starting values
  const { action, staffMember } = props;
  useEffect(() => {
    if (action === "edit") {
      setDesignation(staffMember.designation);
      setName(staffMember.name);
      setOfficePhone(staffMember.officePhone);
      setMobile(staffMember.mobile);
      setTeam(staffMember.team);
      setEmail(staffMember.email);
      setImageFile(staffMember.imageFile);
    }
  }, [action, staffMember]);

  const handleChange = (e, value) => {
    if (value === "designation") setDesignation(e.target.value);
    if (value === "name") setName(e.target.value);
    if (value === "officePhone") setOfficePhone(e.target.value);
    if (value === "mobile") setMobile(e.target.value);
    if (value === "email") setEmail(e.target.value);
    if (value === "team") setTeam(e.target.value);
  };

  const fileChangeHandler = e => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // first I handle the image axios request, send it to cloudinary and get back image URL;
  // Then I include imageUrl in newEmployee object and send this to Mlab with another axios post
  // Now the database will also include the imageUrl
  const handleSubmit = e => {
    e.preventDefault();
    context.startLoading();
    managePicture()
      .then(res => {
        const endPointData = "/api/employees/new";
        const newEmployee = {
          designation,
          name,
          officePhone,
          mobile,
          email,
          team,
          imageUrl: res.data.url
        };
        axios
          .post(endPointData, newEmployee)
          .then(res => console.log(res))
          .then(() => context.manageNewInput())
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    props.closeForm();
  };

  // Isolated picture logic, so it is reusable
  const managePicture = () => {
    const fd = new FormData();
    console.log(imageFile);
    fd.append("image", imageFile, imageFile.name);
    const endPointImage = "/api/images";
    return axios.post(endPointImage, fd);
  };

  const handleUpdate = (e, employeeId) => {
    e.preventDefault();
    context.startLoading();
    console.log("UPDATE");
    const editEndPoint = `/api/employees/${employeeId}`;

    if (needNewPicture) {
      if (!imageFile) {
        context.stopLoading();
        // props.closeForm();
        context.addError("Upload a pic to continue!");
        return;
      }
      managePicture().then(res => {
        const updatedEmployee = {
          designation,
          name,
          officePhone,
          mobile,
          email,
          team,
          imageUrl: res.data.url
        };
        console.log("UPDATED EMPLOYEE FROM NEEDpic", updatedEmployee);
        axios
          .put(editEndPoint, updatedEmployee)
          .then(res => console.log(res))
          .then(() => {
            props.closeForm();
            context.triggerEditing();
          })
          .catch(err => console.log(err));
        // setNeedNewPicture(false);
      });
    } else {
      const updatedEmployee = {
        designation,
        name,
        officePhone,
        mobile,
        email,
        team,
        imageUrl: props.staffMember.imageUrl
      };
      axios
        .put(editEndPoint, updatedEmployee)
        .then(res => console.log(res))
        .then(() => {
          props.closeForm();
          context.triggerEditing();
        })
        .catch(err => console.log(err));
    }
  };

  // useEffect(() => console.log(needNewPicture), [needNewPicture])

  // useEffect(() => console.log(designation, name, officePhone, mobile, email, team, imageFile), [designation, name, officePhone, mobile, email, team, imageFile]);

  return (
    <div className={`form ${props.status}`}>
      <FontAwesomeIcon
        icon="chevron-circle-right"
        onClick={props.closeForm}
        size="2x"
      />
      <h2>
        {props.action === "edit"
          ? `EDIT ${props.staffMember.name.toUpperCase()}`
          : "ADD A STAFF MEMBER"}
      </h2>
      <form
        onSubmit={
          props.action === "edit"
            ? e => handleUpdate(e, props.staffMember._id)
            : e => handleSubmit(e)
        }
      >
        <input
          type="text"
          name="designation"
          placeholder="designation"
          value={designation}
          onChange={e => handleChange(e, "designation")}
        />
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={e => handleChange(e, "name")}
        />
        <input
          type="text"
          name="officePhone"
          placeholder="office phone"
          value={officePhone}
          onChange={e => handleChange(e, "officePhone")}
        />
        <input
          type="text"
          name="mobile"
          placeholder="office mobile (if any)"
          value={mobile}
          onChange={e => handleChange(e, "mobile")}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={e => handleChange(e, "email")}
        />
        {props.action === "edit" && !needNewTeam ? (
          <div className="add-team">
            <p>
              Team:{" "}
              <strong className="team-designation">
                {props.staffMember.team}
              </strong>
            </p>
            <FontAwesomeIcon icon="edit" onClick={() => setNeedNewTeam(true)} />
          </div>
        ) : (
          <div className="bottom-form">
            <label htmlFor="team">Team:</label>
            <select name="team" onChange={e => handleChange(e, "team")}>
              <option value="DGT">DGT</option>
              <option value="HOR">Head of Representation</option>
              <option value="Media & Political Team">
                Media & Political Team
              </option>
              <option value="Communications Team">Communications Team</option>
              <option value="Administration Team">Administration Team</option>
              <option value="Economic Team">Economic Team</option>
            </select>
          </div>
        )}
        {props.action === "edit" && !needNewPicture && (
          <div className="change-image">
            <p>Profile picture: </p>
            <img
              src={props.staffMember.imageUrl}
              width="40"
              height="40"
              onClick={() => setNeedNewPicture(true)}
              alt={props.staffMember.name}
            />
            <FontAwesomeIcon
              icon="edit"
              onClick={() => setNeedNewPicture(true)}
            />
          </div>
        )}
        {(needNewPicture || props.action !== "edit") && (
          <div className="bottom-form">
            <label forhtml="image">Upload pic:</label>
            <input
              type="file"
              name="image"
              onChange={e => fileChangeHandler(e)}
            />
          </div>
        )}
        <button>{props.action === "edit" ? "UPDATE!" : "UPLOAD!"}</button>
      </form>
    </div>
  );
};

export default AddForm;
