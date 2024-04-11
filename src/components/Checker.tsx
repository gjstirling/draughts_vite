import redChecker from '../../public/images/red.png';
import blueChecker from '../../public/images/blue.png';

function Checker({ colour }) {
    return <img src={colour === "red" ? redChecker : blueChecker} alt={colour}/>;
}

export default Checker