
import {FaLinkedin} from 'react-icons/fa';

function Volunteers(){
    return <div className="Volunteers">
        <img src={require('../assets/heropic.jpg')} alt="Heroe's image" />
        <p>Papa Kow Dadson</p>
        <div className="HeroesDetails">
            <a href="http://" target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
            <a href="http://" target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
        </div>
    </div>
}
export default Volunteers;