import React from 'react';
import { useFormContext } from 'react-hook-form';


export default function PartyNameInput() {
    const {register, formState: {errors}} = useFormContext();

    return(
      <div className='item1'>

            <label className='party-name-style'>Party Name</label>
            <input
             className="party-name-input-style"
                {...register("partyName", {
                  required: {
                    value: true,
                    message: "* Party name is required"
                  },
                  maxLength: {
                    value: 15,
                    message: "* Max 15 characters reached"
                  }  
                })}
            ></input>
            {
              errors.partyName && <p className="spacing-alert validations">{errors.partyName.message}</p>
            }
        </div>
        
    );




}