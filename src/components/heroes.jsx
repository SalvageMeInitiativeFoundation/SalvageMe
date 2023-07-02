import {FaLinkedin} from 'react-icons/fa';
import {MdOutlineFavoriteBorder,MdCloudUpload} from 'react-icons/md';
import {BsArrowDownLeft} from 'react-icons/bs';

function Heroes({user}){
    // console.log(user)

    return <div className="Heroes">
        <img src={user.image} alt="Heroe's image" />
        <p style={{textAlign:'center'}}>{user.username}</p>
        <div className="HeroesDetails">
            <a href={user.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
            <><MdOutlineFavoriteBorder/> {user.donationCount}</>
            <><BsArrowDownLeft fill='red'/>{user.recievedCount}</>
        </div>
    </div>

}
export default Heroes;