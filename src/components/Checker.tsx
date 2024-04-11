import React from 'react';

interface CheckerProps {
    colour: string;
    selected?: boolean; // Define selected prop as optional
}

const Checker: React.FC<CheckerProps> = ({ colour, selected }) => {
    return (
        <div className="checker" style={{
            backgroundColor: colour,
            ...(selected ? { filter: 'brightness(500%)' } : {}) // Apply style conditionally
        }}></div>
    );
};

export default Checker;


