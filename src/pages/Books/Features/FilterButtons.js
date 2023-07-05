import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { books, locations, dateFilters } from "../../../assets/data";

const FilterButtons = ({ 
    filterEvents, 
    setfilteredEvents, 
    categories, 
    checkedInputs
  }) => {
  const [curentCategory, setCurentCategory] = useState("All");

  let newCheckedInputs = checkedInputs;

  const checkInputChangeHandler = (id) => {
    let elem = document.getElementById(id);
    let filterTypeId = getFilterType(id);

    if (elem.checked) {
      let filterTypeId = getFilterType(id);
      newCheckedInputs[filterTypeId] = [...newCheckedInputs[filterTypeId], elem.value];
      console.log(newCheckedInputs);
    }
    else {
      if (newCheckedInputs[filterTypeId].includes(elem.value)) {
        let updatedCheckedInputs = newCheckedInputs[filterTypeId].filter((item) => item !== elem.value);
        newCheckedInputs[filterTypeId] = updatedCheckedInputs;
        console.log(newCheckedInputs);
      }
    }
  };

  const getFilterType = (id) => {
    return id.split("-")[0];
  };

  const handleFilter = () => {
    console.log(newCheckedInputs);
    filterEvents(newCheckedInputs);
  };

  // const reset = () => {
  //   return id.split("-")[0];
  // };

  const toggleDropdown = (id) => {
    document.getElementById(id).classList.toggle("show");
  };

  return (
    <>
      <Wrapper>
        <button
            className="all-btn"
            style={{
              backgroundColor: curentCategory==="All" ? "#0000FF" : "#E5E4E2",
              color: curentCategory==="All" ? "white" : "black"
            }}
            onClick={() => setfilteredEvents(books)}
          >
          All
        </button>

        <Dropdown>
          <button onClick={() => toggleDropdown("category")} className="dropbtn">
            <select>
              <option>Category</option>
            </select>
            <div className="overSelect"></div>
          </button>

          <div id="category" className="dropdown-content">
            {categories.map((category, id) => {
              return (
                <label for={id} key={id}>
                  <input 
                    type="checkbox" 
                    id={`cat-${id}`} 
                    value={category}
                    onChange={()=> checkInputChangeHandler(`cat-${id}`)}
                    />
                  {category}
                </label>
              );
            })}
          </div>
        </Dropdown>

        <button className="filter-btn" onClick={handleFilter}>
          <img src="/images/icons/filter-b.svg" alt="Filter" height="19"/>
          &nbsp;Filter 
        </button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin: 1px 0;
  padding: 20px 0;
  /* border: 1px solid red; */
  button {
    margin: 5px 10px;
    padding: 8px 20px;
    background-color: #E5E4E2;
    border-radius: 20px;
    font-size: 14px;
    flex-shrink: 0;
    border: none;
    outline: none;
    cursor: default;
    position: relative;
    width: fit-content;

    &.filter-btn {
      display: inline-flex;
      background-color: #ff9f00;
    }

    & select {
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      background-color: transparent;
    }

    & div.overSelect {
      position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
    }

    &:hover,
    &.active{
      background-color: #0000FF;
      color: white;
      &.filter-btn {
        background-color: #fa8128;
      }
    }
  }
  @media (max-width: 480px) {
    padding: 10px 0;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  button {
    min-width: 100px;
  }

  /* button > select {
    border: none;
    outline: none;
    background-color: transparent;
  } */

  & .dropdown-content {
    display: none;
    position: absolute;
    background-color: rgba(0,0,0,0.8);
    max-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    overflow: auto;
    border: 1px solid #ddd;
    z-index: 1;
    float: right;

    & label, a {
      display: flex; 
      color: #FFF;
      padding: 5px 16px;
      text-decoration: none;
      margin-left: 0;
      align-items: center;

      & input{
        margin-right: 3px;
      }
      &:hover, &.active {
        color: #fa8128;
        cursor: default;
      }
    }
  }
  .show {display:block;}
`;


export default FilterButtons;