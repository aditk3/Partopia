

import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function StartDate() {
    const {register, formState: {errors}} = useFormContext();

    const validateDate = (data) => {
      const [year,month, day] = data.split("-");
      const currentDate = new Date();
      const currentMonth = String(currentDate.getMonth() + 1).padStart(2,"0");
      const currentDay = String(currentDate.getDate()).padStart(2,"0")
      return (year >= currentDate.getFullYear() && month >= currentMonth && day >= currentDay) || '* Invalid Start date'
    }


    return (

         <div className="item6">
            <label className='startdate-style'>Start Date</label>
            <input
              type="date"
                className='startdate-input-style'
                {...register('startDate', {
                  required: {
                    value: true,
                    message: "* Start date required"
                  }, 
                  validate: (data) => validateDate(data)
                })}
            ></input>
            <p className="validations">
                {errors.startDate && errors.startDate.message}
              </p>
        </div>
    )
}