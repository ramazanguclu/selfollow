import React from 'react';

export const BackButton = ({ label, onClick }) => {
    return (
        <button className="red btn-flat left white-text col s12 m5 l3" onClick={onClick}>
            {label}
            <i className="material-icons left">arrow_back</i>
        </button>
    );
};

export const SubmitButtonDone = ({ label, onClick }) => {
    return (
        <button className="btn waves-effect waves-light right col s12 m5 l3 disabled" type="submit" onClick={onClick}>
            {label}
            <i className="material-icons right">done</i>
        </button>
    );
};

export const SubmitButtonSend = ({ label, onClick }) => {
    return (
        <button className="btn waves-effect waves-light right col s12 m5 l3 disabled" type="submit" onClick={onClick}>
            {label}
            <i className="material-icons right">send</i>
        </button>
    );
};

export const FavoriteButton = ({ colorClass, onClick }) => {
    return (
        <button
            className={colorClass + ' btn-floating btn-large right white-text'}
            onClick={onClick}
        >
            <i className="material-icons">favorite_border</i>
        </button>
    );
};