import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { ErrorSpan } from './Error';

const detectContainerClass = (hideClass, customClass) => {
    var classCont = ['input-field', 'col', 's12'];

    hideClass && classCont.push(hideClass);
    customClass && classCont.push(customClass);

    return classCont.join(' ');
};

const renderOptions = (items) => {
    return items.map(v => {
        return (
            <option key={v._id || v} value={v._id || v}>{v.name || v}</option>
        );
    });
};

export default ({ name, onChange, label, options, defaultOptionLabel, hideClass, customClass, hasError, errorText, value }) => {
    useEffect(() => {
        M.AutoInit();
    }, [value || options]);
    
    return (
        <div className={detectContainerClass(hideClass, customClass)}>
            <select
                value={value}
                name={name}
                onChange={onChange}>
                {defaultOptionLabel ? <option value=''>{defaultOptionLabel}</option> : ''}
                {renderOptions(options)}
            </select>
            <label>{label}</label>
            {hasError ? <ErrorSpan errorText={errorText} /> : null}
        </div>
    );
};