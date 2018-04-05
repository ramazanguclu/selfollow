import React from 'react';

export default ({ inputName, label, inputType, inputValue }) => {
    return (
        <div>
            {inputType !== 'hidden' ? <label>{label}</label> : ''}
            <input type={inputType} name={inputName} value={inputValue} />
        </div>
    )
};