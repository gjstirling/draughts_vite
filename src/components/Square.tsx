import Checker from './Checker';

interface SquareProps {
    coordinates: [number, number];
    checker?: string;
    isSelected: boolean;
}

const Square: React.FC<SquareProps> = ({ coordinates, checker, isSelected }) => {
    const squareColour = setSquareColour(coordinates)
        ? { backgroundColor: 'dimgrey' } : { backgroundColor: 'whitesmoke'}

    return (
        <button style={squareColour}>
            {checker && <Checker colour={checker} selected={isSelected}/>}
        </button>
    );
};

function setSquareColour(coordinates: [number, number]): boolean {
    const sum: number = coordinates[0] + coordinates[1];
    return sum % 2 !== 0;
}

export default Square;

