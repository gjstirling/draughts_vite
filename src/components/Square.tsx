import Checker from './Checker';

type coordinates = [number, number]
// type board = string[][] | null[][]

interface SquareProps {
    coordinates: coordinates;
    checker?: string;
    isSelected: boolean;
    onCheckerSelected: (coordinates: coordinates) => void;
    moveAction: (move: coordinates) => void; // Update prop type
}

const Square: React.FC<SquareProps> = ({ coordinates, checker, isSelected , onCheckerSelected, moveAction}) => {
    const squareColour = setSquareColour(coordinates) ? { backgroundColor: 'dimgrey' } : { backgroundColor: 'whitesmoke'}

    function handleCheckerClick() {
        console.log("Clicked on checker:     " + coordinates)
        onCheckerSelected(coordinates); // Call onCheckerSelected function with coordinates
    }

    function handleSquareClick() {
        if (checker) console.log("checker on square")
        else {
            console.log("Clicked on Square:     " + coordinates)
            moveAction(coordinates)
        }
    }

    return (
        <button style={squareColour} onClick={handleSquareClick}>
            {checker && <Checker colour={checker} selected={isSelected} onClick={handleCheckerClick}/>}
        </button>
    );
};

function setSquareColour(coordinates: coordinates): boolean {
    const sum: number = coordinates[0] + coordinates[1];
    return sum % 2 !== 0;
}

export default Square;

