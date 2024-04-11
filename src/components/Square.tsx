import Checker from './Checker';
import {Dispatch} from "react";

interface SquareProps {
    coordinates: [number, number];
    checker?: string;
    isSelected: boolean;
    onCheckerSelected: Dispatch<[number, number]>
}

const Square: React.FC<SquareProps> = ({ coordinates, checker, isSelected , onCheckerSelected}) => {
    const squareColour = setSquareColour(coordinates) ? { backgroundColor: 'dimgrey' } : { backgroundColor: 'whitesmoke'}

    function handleClick() {
        onCheckerSelected(coordinates)
    }

    return (
        <button style={squareColour}>
            {checker && <Checker colour={checker} selected={isSelected} onSelected={onCheckerSelected} onClick={handleClick}/>}
        </button>
    );
};

function setSquareColour(coordinates: [number, number]): boolean {
    const sum: number = coordinates[0] + coordinates[1];
    return sum % 2 !== 0;
}

export default Square;

