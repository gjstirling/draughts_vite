import Checker from './Checker';

interface SquareProps {
    coordinates: [number, number];
    checker?: string;
}

const Square: React.FC<SquareProps> = ({ coordinates, checker }) => {
    const squareColour = setSquareColour(coordinates)
        ? { backgroundColor: 'dimgrey' } : { backgroundColor: 'whitesmoke'}

    return (
        <button style={squareColour}>
            {checker && <Checker colour={checker} />}
        </button>
    );
};

function setSquareColour(coordinates: [number, number]): boolean {
    const sum: number = coordinates[0] + coordinates[1];
    return sum % 2 !== 0;
}

export default Square;

