import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Input } from "../input/input";
import { formatField } from "../../utils/Utilities";
import { loginService, registerService } from "../../service/UserService";

export default function Signup(props) {
  const [state, setState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [userExists, setUserExists] = useState(false);

  const inputFields = Object.keys(state);

  const handleOnChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  let navigate = useNavigate();


  const register = (event) => {
    registerService(event, state).then(res => {
      if(res === true) {
        loginService(event, {email: state.email, password: state.password}).then(res => navigate("/")).catch(e => {})
      }
    }).catch(error => {
      setUserExists(true);
    })
  };


  return (
    <div>
      <p className="signup-side">Sign Up</p>

      <form onSubmit={register} className="formStyle">
        {inputFields.map((field) => {
          return (
            <div key={field}>
              <Input
                classStyle={field}
                name={field}
                placeholder={`   ${formatField(field)}`}
                value={state[field]}
                type={field}
                handleOnChangeEvent={handleOnChange}
              ></Input>
              <p
                className={`validations ${
                  state[field].trim() ? "hidden" : "not-hidden"
                }`}
              >
                {`* ${formatField(field)} is required`}
              </p>
            </div>
          );
        })}
        <p
                className={`validations user-exists ${
                  userExists ? "not-hiddent" : "hidden"
                }`}
              >
               * User already exists
              </p>
        <div className="buttonz">
          <div className="button">
            <Link className="goback-button" to="/login">
              Go Back
            </Link>
          </div>
          <div className="button">
            <button className="signUP-button">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
