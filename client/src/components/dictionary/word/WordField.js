import React from 'react';

export default ({ label, input, meta: { error, touched } }) => {
    return (
        <div>
            <div className="red-text">{touched && error}</div>
            <label>{label}</label>
            <input {...input} />
        </div>
    )
};