import React from 'react';

export default ({ name, onChange, label }) => {
    return (
        <p>
            <label>
                <input type="checkbox" name={name} onChange={onChange} />
                <span>{label}</span>
            </label>
        </p>
    );
};