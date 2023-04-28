import { useEffect, useState } from "react";
import { IoIosFunnel } from "react-icons/io";


const Filter = ({ placeHolder,options }) => {
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
        setSelectedValue(option)
    }

    const isSelected = (option)=>{
        if(!selectedValue){
            return false;
        }
        return selectedValue.value===option.value;
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