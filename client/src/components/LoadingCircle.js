import React from 'react';

const LoadingCircle = ({color}) => {
    return (
        <div className={`spinner-layer spinner-${color}`}>
            <div className="circle-clipper left">
                <div className="circle"></div>
            </div><div className="gap-patch">
                <div className="circle"></div>
            </div><div className="circle-clipper right">
                <div className="circle"></div>
            </div>
        </div>
    );
};

export default LoadingCircle;