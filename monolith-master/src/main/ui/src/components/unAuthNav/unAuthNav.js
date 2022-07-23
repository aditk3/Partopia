import React from "react";

export default function UnAuthNav(props){

    return(
        <div className="parent">
        <div className="child signup">
          <button className="signupbut" onClick={props.signUp}>
            Sign Up
          </button>
        </div>
        <div className="child login">
          <button className="loginbut" onClick={props.login}>
            Login
          </button>
        </div>
      </div>
    );
}