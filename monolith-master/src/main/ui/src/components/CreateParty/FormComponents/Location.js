import React from 'react';
import { useFormContext } from 'react-hook-form';


export default function Location() {
    const {register, formState: {errors}} = useFormContext();

    return(
      <div className='item2'>
             <label className='location-style'>Location</label>
            <input
                className="location-input-style"
                {...register("location", {
                  required: {
                    value: true,
                    message: "* Location is required"
                  },
                  maxLength: {
                    value: 20,
                    message: "* Max 20 characters reached"
                  }
                })}
            ></input>
           {errors.location && <p className='validations spacing-alert'>{errors.location.message}</p>}
        </div>
    );
}