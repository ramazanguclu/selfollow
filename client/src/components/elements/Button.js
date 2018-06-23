import React from 'react';

export const BackButton = ({ label, onClick }) => {
    return (
        <button className="red btn-flat left white-text" onClick={onClick}>
            {label}
            <i className="material-icons left">arrow_back</i>
        </button>
    );
};

export const SubmitButton = ({ label, onClick }) => {
    return (
        <button className="btn waves-effect waves-light right" type="submit" onClick={onClick}>
            {label}
            <i className="material-icons right">done</i>
        </button>
    );
};