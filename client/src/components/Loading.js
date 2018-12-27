import React from 'react';
import LoadingCircle from './LoadingCircle';

const colorConfig = ['blue', 'red', 'yellow', 'green'];

const Loading = () => {
    return (
        <div className="row center-align">
            <div className="preloader-wrapper big active">
                {colorConfig.map(color => <LoadingCircle key={color} color={color}></LoadingCircle>)}        
            </div>
        </div>
    );
};

export default Loading;