interface CheckerProps {
    colour: string;
    selected?: boolean; // Define selected prop as optional
    onClick: VoidFunction;
}

const Checker = ({ colour, selected, onClick }: CheckerProps): JSX.Element => {

    const king = (colour === "red" || colour === "blue") ? "" : "King"

    return (
        <div 
  className="checker" 
  style={{ 
    backgroundColor: colour, 
    ...(selected ? { filter: 'brightness(20%)' } : {}), 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }} 
  onClick={onClick}
>{king}
</div>
    );
};

export default Checker;


