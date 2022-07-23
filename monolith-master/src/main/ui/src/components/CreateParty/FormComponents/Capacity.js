
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Capacity() {
    const {register, formState: {errors}} = useFormContext();

    return(
      <div className='item4'>
            <label className='capacity-style'>Capacity</label>
            <input
                defaultValue={2}
                className='capacity-input-style'
                {...register('maxCapacity', {
                  required: {
                    value: true,
                    message: "* Capacity is required"
                  },
                  min: {
                    value: 2,
                    message: "* Capacity at least 2"
                  }
                })}
            ></input>
            <p className="spacing-alert validations">
              {errors.maxCapacity && errors.maxCapacity.message}
              </p>
        </div>
    )
}