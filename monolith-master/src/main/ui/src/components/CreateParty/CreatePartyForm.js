import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId } from "../../utils/Utilities";
import PartyNameInput from './FormComponents/PartyNameInput';
import Location from './FormComponents/Location';
import Image from './FormComponents/Image';
import Capacity from './FormComponents/Capacity';
import Price from './FormComponents/Price';
import StartDate from './FormComponents/StartDate';
import StartTime from './FormComponents/StartTime';
import Description from './FormComponents/Description';

export default function CreatePartyForm(props) {
    const navigate = useNavigate();
    const userId = getUserId();
    const methods = useForm({
      reValidateMode: 'onSubmit',
    });
    const { reset, handleSubmit} = methods;



   

    const onSubmit = (data) => {
      data.attendees = [];
      data.host = userId;
      axios.post("http://localhost:8080/party", {...data}, { headers: { token: sessionStorage.getItem("token")}}).then(res => {
        navigate("/")
      })
      
    }

    const resetForm = (event) => {
      event.preventDefault(); //prevents the onSubmit validation
      reset();
    }

    const cancelForm = () => {
        navigate("/");
    }

    return(
        <FormProvider {...methods} >
          <form className='form-style' onSubmit={handleSubmit(onSubmit)}>

          <PartyNameInput />
           <Location />
        <Image />

            <Capacity />
 
      
            <Price />

       
            <StartDate />

            <StartTime />
        

           <Description />
        

            <div className="create-form-buttons-container item9">
            
                <div>
                <button className="reset-button" onClick={resetForm}>Reset</button>
                </div>
                <div>
                <button className="cancel-button" onClick={cancelForm}>Cancel</button>
                </div>
                <div>
                <button className="create-button">Create</button>
                </div>
            </div>
          </form>
        </FormProvider>
    );
}
