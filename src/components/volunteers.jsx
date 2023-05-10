
import {FaLinkedin} from 'react-icons/fa';

function Volunteers({user}){
    return <div className="Volunteers">
        <img src={require('../assets/heropic.jpg')} alt="Heroe's image" />
        <p style={{textAlign:'center'}}>{user.username}</p>
        <div className="HeroesDetails">
            <a href={user.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
        </div>
    </div>
}
export default Volunteers;