import { useEffect, useState } from "react";
import { IoIosFunnel } from "react-icons/io";
import axios from "axios";



const Filter = ({ placeHolder,options,setDonations }) => {
    const [showMenu,setShowMenu]=useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    
    useEffect(()=>{
        const handler = ()=>setShowMenu(false)
        window.addEventListener("click",handler)
        return ()=>{window.removeEventListener("click",handler)}
    })

    const handleInputClick = (e)=>{
        e.stopPropagation()
        setShowMenu(!showMenu)
    }


    const getDisplay = () => {
        if(selectedValue){
            return selectedValue.label
        }
      return placeHolder;
    };

    const onItemClick = (option)=>{
        setSelectedValue(option);
        FetchDataByCategory(option.label);
    }

    const isSelected = (option)=>{
        if(!selectedValue){
            return false;
        }
        return selectedValue.value===option.value;
    }

    const FetchDataByCategory=async(category)=>{
      try {
        const BookData = await axios.get(
          `http://localhost:5000/salvageme/donation/category/${category}`
        );
        setDonations(BookData.data);
      } catch (error) {
        console.log(error)
      }
  
    }

  
    return (
      <div className="Filter-container">
        <div onClick={handleInputClick} className="Filter-input">
          <div className="Filter-selected-value">{getDisplay()}</div>
          <div className="Filter-tools">
            <div className="Filter-tool">
            <IoIosFunnel/>
            </div>
          </div>
        </div>
        {showMenu&&(<div className="Filter-menu" >
            {options.map((option)=>(<div onClick={()=>onItemClick(option)} key={option.value} className={`dropdown-item ${isSelected(option) && "selected"}`}>
                {option.label}
            </div>))}
           </div> )  }
      </div>
    );
  };
  
  export default Filter;