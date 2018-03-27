import React from 'react';
import AddGroupName from './AddGroupName';
import WordGroupList from './WordGroupList';

const Dictionary = () => {
    return (
        <div>
            <div className="section">
                <AddGroupName />
            </div>
            <div className="divider"></div>
            <div className="section">
                <WordGroupList />
            </div>
            <div className="divider"></div>
        </div>
    )
}

export default Dictionary;