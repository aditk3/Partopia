import React from 'react';

export function Input({classStyle, name, placeholder, value, type, handleOnChangeEvent}) {
    return (
        <input
        className={classStyle}
        name={name}
        value={value}
        placeholder={`${   placeholder}`}
        type={type === "password" ? "password" : "text"}
        onChange={handleOnChangeEvent}
      ></input>
    );
}