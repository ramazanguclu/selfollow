import React from 'react';


const renderRadioButton = (data) => {
    const { items, onChange, name } = data;

    return items.map(({ dataItem, label, defaultChecked }, k) => {
        return (
            <p key={k}>
                <label>
                    {React.createElement('input', { type: 'radio', className: 'with-gap', name: name, data: dataItem, onChange: onChange, defaultChecked: defaultChecked })}
                    <span>{label}</span>
                </label>
            </p>
        );
    });
};

export default ({ data }) => {
    return (
        <div className="input-field col s12">
            {renderRadioButton(data)}
            <div className="divider"></div>
        </div>
    );
};