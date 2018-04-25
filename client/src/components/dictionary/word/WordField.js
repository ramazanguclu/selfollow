import React from 'react';

export default ({ label, type, input, inputValue }) => {
    return (
        <div>
            <label style={{ 'visibility': type }}>{label}</label>
            <input {...input} type={type} defaultValue={inputValue}/>
        </div>
    )
};