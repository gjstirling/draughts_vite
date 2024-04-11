interface CheckerProps {
    colour: string;
}

const Checker: React.FC<CheckerProps> = ({ colour }) => {
    return <div className="checker" style={{ backgroundColor: colour }}></div>;
};

export default Checker;

