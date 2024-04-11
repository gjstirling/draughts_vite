import Checker from './Checker';

interface SquareProps {
    coordinates: [number, number];
    checker?: string;
}

const Square: React.FC<SquareProps> = ({ coordinates, checker }) => {
    const squareStyle: React.CSSProperties = {
        position: 'relative',
        width: '50px',
        height: '50px',
        backgroundColor: setSquareColour(coordinates) ? 'dimgrey' : 'whitesmoke',
    };

    return (
        <button style={squareStyle}>
            {checker && <Checker colour={checker} />}
        </button>
    );
};

function setSquareColour(coordinates: [number, number]): boolean {
    const sum: number = coordinates[0] + coordinates[1];
    return sum % 2 !== 0;
}

export default Square;

