
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Description() {
    const {register, formState: {errors}} = useFormContext();

    return( 
        <div className="item8">
         <label className='description-style'>Description</label>
            <textarea
                className='description-input-style'
                {...register('description', {
                  maxLength: {
                    value: 100,
                    message: "* Max Characters reached"
                  }
                })}                
            ></textarea>
            <p className="max-char-desc-error validations">
                {errors.description && errors.description.message}
              </p>
        </div>
    );
}