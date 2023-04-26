import {FaLinkedin} from 'react-icons/fa';
import {MdOutlineFavoriteBorder,MdCloudUpload} from 'react-icons/md';
import {BsArrowDownLeft} from 'react-icons/bs';

function Heroes(){

    return <div className="Heroes">
        <img src={require('../assets/heropic.jpg')} alt="Heroe's image" />
        <p>Papa Kow Dadson</p>
        <div className="HeroesDetails">
            <a href="http://" target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
            <><MdOutlineFavoriteBorder/> 100 </>
            <><BsArrowDownLeft fill='red'/>100</>
        </div>
    </div>

}
export default Heroes;