import image from "../assets/pineappleLogin.jpg";
import React from "react";
import { Welcome } from "../components/welcome/Welcome";
import Login from "../components/login/Login";
import Signup from "../components/signUp/signup";


export default function LandingPage({pathname}) {

    const renderComponent = () => {        
        if(pathname === '/login') {
            return (<Login />);
        }
        return (<Signup />)
    }

    return (
    <div className="flex-container">
        <Welcome />

        <div>
            <img className="image-style" src={image} alt="A party pineapple"></img>
        </div>

        {renderComponent()}
    
      </div>
    );
}