import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Input } from "../input/input";
import { formatField } from "../../utils/Utilities";
import { getIsLoggedIn, loginService } from "../../service/UserService";

export default function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [isInvalidLogin, setIsInvalidLogin] = useState(false);

  const inputFields = Object.keys(state);
  let navigate = useNavigate();

  const handleOnChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const login = (event) => {
    loginService(event, state).then(res => {
      if(res === true) navigate("/")
    }).catch(error => {
      setIsInvalidLogin(true)
    });
  }

  return (
    <div>
      <p className="login-side">Login</p>

      <form onSubmit={login} className="formStyle">
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
          className={`bad-login validations ${isInvalidLogin ? "not-hidden" : "hidden"}`}
        >
          * Email or password is incorrect
        </p>
        <div className="buttonz">
          <div className="button">
            <Link className="signup-button" to="/signup">
              Sign Up
            </Link>
          </div>
          <div className="button">
            <button className="login-button">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
