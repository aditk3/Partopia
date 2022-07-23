
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Price() {
    const {register, formState: {errors}} = useFormContext();

    return (
        <div className="item5">
        <label className='price-style'>Price</label>
            <input
                defaultValue={0}
                className='price-input-style'
                {...register('price', {
                  min: {
                    value: 0,
                    message: "* Invalid Price"
                  }
                })}
            ></input>
            <p className="max-char-error validations">
                {errors.price && errors.price.message}
              </p>
        </div>
    ) 
}