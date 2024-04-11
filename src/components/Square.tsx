import React from 'react';
import Checker from "./Checker";

function setSquareColour(coordinates: [number, number]): boolean {
    const sum: number = coordinates[0] + coordinates[1];
    return sum % 2 !== 0;
}

interface SquareProps {
    coordinates: [number, number];
    checker?: Checker;
}

const Square: React.FC<SquareProps> = ({ coordinates, checker }) => {
    const key = `square_${coordinates[0]}_${coordinates[1]}`;
    const checkerComponent = checker ? <Checker colour={checker}/> : null;

    return (
        <button key={key} style={setSquareColour(coordinates) ? { backgroundColor: 'dimgrey' } : { backgroundColor: 'whitesmoke' }}>
            {checkerComponent}
        </button>
    );
};

export default Square;
