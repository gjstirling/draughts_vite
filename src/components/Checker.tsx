interface CheckerProps {
    colour: string;
    selected?: boolean; // Define selected prop as optional
    onClick: VoidFunction;
}

const Checker = ({ colour, selected, onClick }: CheckerProps): JSX.Element => {

    return (
        <div className="checker" style={{backgroundColor: colour, ...(selected ? { filter: 'brightness(20%)' } : {})
        }} onClick={onClick}></div>
    );
};

export default Checker;


