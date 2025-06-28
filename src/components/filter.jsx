import { useEffect, useState } from "react";
import { IoIosFunnel } from "react-icons/io";
import axios from "axios";
import styled from "styled-components";

const Filter = ({ placeHolder, options, setDonations, setIsLoading }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue.label;
    }
    return placeHolder;
  };

  const onItemClick = (option) => {
    setSelectedValue(option);
    FetchDataByCategory(option.label);
  };

  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.value === option.value;
  };

  const FetchDataByCategory = async (category) => {
    // setIsLoading((prev)=>!prev)
    try {
      const BookData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/donation/category/${category}`
      );
      // console.log(BookData.data)
      setDonations(BookData.data);
      // setIsLoading((prev)=>!prev)
    } catch (error) {
      //console.error(error);
      // setIsLoading((prev)=>!prev)
    }
  };

  return (
    <Filtercontainer>
      <div onClick={handleInputClick} className="Filter-input">
        <div className="Filter-selected-value">{getDisplay()}</div>{" "}
        <div className="Filter-tools">
          <div className="Filter-tool">
            <IoIosFunnel />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="Filter-menu">
          {options.map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </Filtercontainer>
  );
};

const Filtercontainer = styled.div`
  text-align: left;
  border: 2px solid black;
  position: relative;
  border-radius: 10px;
  margin: 5px 0px 5px 0px;
  width: 150px;
  float: right;

  & .Filter-input {
  padding: 11px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  }
  & .Filter-menu {
    position: absolute;
    transform: translateY(4px);
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: auto;
    max-height: 150px;
    background-color: #fff;
  }
  & .Filter-item {
    padding: 5px;
    cursor: pointer;
  }
  & .Filter-selected-value {
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }

  & .Filter-item:hover {
    background-color: #ff8c00;
  }
  `
  


export default Filter;
