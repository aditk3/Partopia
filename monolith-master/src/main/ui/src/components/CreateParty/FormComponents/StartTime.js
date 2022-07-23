


import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function StartTime() {
    const {register, formState: {errors}} = useFormContext();

    return(

        <div className="item7">
        <label className='time-style'>Start Time</label>
            <input
                className="time-input-style"
                {...register('startTime', {
                  required: {
                    value: true,
                    message: "* Start time required"
                  },

                  validate: value => {
                    const [time , day]  = value.split(" ");
                    if(time && day) {
                      return (time.match(/[1][0-2]|[1-9]/)[0] === time && day.match(/am|AM|pm|PM/)[0] === day) || "* Invalid start time"
                    }
                    return `* Input time as AM or PM (include space after time)`

                  }
                 
                })}
            ></input>
            <p
                className="validations"
              >
                {errors.startTime && errors.startTime.message}
              </p>
        </div>
    ); 
}