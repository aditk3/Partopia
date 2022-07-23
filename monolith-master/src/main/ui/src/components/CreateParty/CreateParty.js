import React from "react";
import "./createParty.css"
import CreatePartyForm from "./CreatePartyForm"

export default function CreateParty(props){
    return(
        <div className="create-party-flex-container">
            <div className="background-form-style">
                <CreatePartyForm />
            </div>
        </div>
        
    );
}