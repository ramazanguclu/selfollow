import React from 'react';

const detectContainerClass = (hideClass, customClass) => {
    var classCont = ['input-field', 'col', 's12'];

    hideClass && classCont.push(hideClass);
    customClass && classCont.push(customClass);

    return classCont.join(' ');
};

export default ({ name, onChange, label, options, defaultOptionLabel, hideClass, customClass }) => {
    return (
        <div className={detectContainerClass(hideClass, customClass)}>
            <select
                name={name}
                onChange={onChange}>
                {defaultOptionLabel ? <option value="" >{defaultOptionLabel}</option> : ''}
                {options}
            </select>
            <label>{label}</label>
        </div>
    );
};