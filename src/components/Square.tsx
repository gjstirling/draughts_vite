function setSquareColour(value: [number, number]): boolean {
    const sum: number = value[0] + value[1];
    const isOdd: (num: number) => boolean = (num: number): boolean => num % 2 !== 0;

    return isOdd(sum);
}

interface SquareProps {
    value: [number, number];
}

const Square: React.FC<SquareProps> = ({ value }) => {
    const key = `square_${value[0]}_${value[1]}`;

    return (
        <button key={key} style={setSquareColour(value) ? { backgroundColor: 'dimgrey' } : { backgroundColor: 'whitesmoke' }}></button>
    );
};

export default Square;