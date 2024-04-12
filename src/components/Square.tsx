import Checker from './Checker';
import {Dispatch} from "react";

type coordinates = [number, number]

interface SquareProps {
    coordinates: coordinates;
    checker?: string;
    isSelected: boolean;
    onCheckerSelected: Dispatch<coordinates>;
}

const Square: React.FC<SquareProps> = ({ coordinates, checker, isSelected , onCheckerSelected}) => {
    const squareColour = setSquareColour(coordinates) ? { backgroundColor: 'dimgrey' } : { backgroundColor: 'whitesmoke'}

    function handleCheckerClick() {
        console.log("Clicked on checker:     " + coordinates)
        onCheckerSelected(coordinates)
    }

    function handleSquareClick() {
        if (checker) console.log("checker on square")
        else {
            console.log("Clicked on Square:     " + coordinates)
        }
    }



    return (
        <button style={squareColour} onClick={handleSquareClick}>
            {checker && <Checker colour={checker} selected={isSelected} onSelected={onCheckerSelected} onClick={handleCheckerClick}/>}
        </button>
    );
};

function setSquareColour(coordinates: coordinates): boolean {
    const sum: number = coordinates[0] + coordinates[1];
    return sum % 2 !== 0;
}

export default Square;

