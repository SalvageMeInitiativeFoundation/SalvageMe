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
    // If the selected category is 'All' fetch all donations
    try {
      setIsLoading(true);
      let BookData;
      if (/all/i.test(category)) {
        BookData = await axios.get(`${process.env.REACT_APP_BASE_URL}/donation/`);
      } else {
        BookData = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/donation/category/${category}`,
        );
      }
      setDonations(BookData.data);
    } catch (error) {
      // ignore errors for now
    } finally {
      setIsLoading(false);
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
  border: 1px solid rgba(0,0,0,0.12);
  position: relative;
  border-radius: 10px;
  margin: 5px 0px 5px 0px;
  width: 170px;
  float: right;

  & .Filter-input {
  height: 48px;
  padding: 0 12px;
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
    z-index: 1000;
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
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
