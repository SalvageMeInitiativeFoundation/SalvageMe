import React, { useContext, useEffect, useState } from "react";
import DonorBook from "../components/donorBook";
import Filter from "../components/filter";
import axios from "axios";
import Spinner from "../shared/spinner";
import { UserContext } from "../context/userContext/userContext";
import styled from "styled-components";

function Request() {
  const {requestQty}=useContext(UserContext);
  const [singleSearchValue, setSingleSearchValue] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [donations, setDonations] = useState(null);

  useEffect(() => {
    // console.log("fetching");
    FetchData();
  }, []);

  const FetchData = async () => {
    setIsloading(true);
    try {
      const BookData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/donation/`
      );
      setDonations(BookData.data);
      setIsloading(false);
      // console.log(donations);
    } catch (error) {
      setIsloading(false);
    }
  };

  const FetchDataByTitle = async (title) => {
    setIsloading(true);
    try {
      const BookData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/donation/${title}`
      );
      setDonations(BookData.data);
      setIsloading((prev) => !prev);
      // console.log(donations);
    } catch (error) {
      //console.error(error);
      setIsloading((prev) => !prev);
    }
  };

  const handleSingleSearch = (e) => {
    e.preventDefault();
    if (singleSearchValue.length > 0) {
      FetchDataByTitle(singleSearchValue);
    }
    FetchData();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSingleSearchValue(e.target.value);
  };

  const options = [
    { value: "all Categories", label: "All Categories" },
    { value: "Language", label: "Language" },
    { value: "religion", label: "Religion" },
    { value: "Social Science", label: "Social Science" },
    { value: "Ap. Science & Technology", label: "Ap. Science & Technology" },
    { value: "Art Recreation", label: "Art Recreation" },
    { value: "Science & Math", label: "Science & Math" },
    { value: "Generalities", label: "Generalities" },
    { value: "Literature", label: "Literature" },
    { value: "Geography & History", label: "Geography & History" },
    { value: "Philosophy & Psychology", label: "Philosophy & Psychology" },
  ];

  return (
    <div>
      <RequestSearch className="RequestSearch">
        <div className="RequestSearchOne">
          <input
            type="text"
            name="BooKName"
            id="bookName"
            className="request-Text"
            placeholder="Search for book"
            onChange={handleChange}
            value={singleSearchValue}
          />
          <button type="button" className="button" onClick={handleSingleSearch}>
            Search
          </button>
        </div>
        <div>
          <Filter
            placeHolder={"By category......."}
            options={options}
            setDonations={setDonations}
            setIsloading={setIsloading}
          />
        </div>
          
      </RequestSearch>
      {requestQty.length>=1&&<p style={{textAlign:'center',color:'red'}} >
        
       NB: Users can only request a book at a time
      </p>}
      {isLoading ? (
        <Spinner></Spinner>
      ) : donations.filter((donation)=>donation.status=="recieved").length < 1 ? (
        <FlexLayout>
          <p>Thank you for joining our wait list,<span style={{fontWeight:'bold'}}> Launching Soon</span> </p>
          
        </FlexLayout>
      ) : (
        <FlexLayout>
          {donations.map((donation, index) => {

            if (donation.status == "recieved") {
              return <DonorBook key={index} donation={donation} />;
            }
          })}
        </FlexLayout>
      )}
    </div>
  );
}

const RequestSearch = styled.div`
  margin: 85px 10px;
  display: flex;
  justify-content: space-between;
  justify-items: baseline;
  align-items: center;
  & .RequestSearchOne {
  display: flex;
  align-items: center;
  }
  & .RequestSearchOne Button {
    margin-left: 10px;
    height: 48px;
  }
  & .RequestSearchOne input {
    width: 30vw;
  } 
  @media (max-width:768px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  @media (max-width: 540px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  `
  const FlexLayout = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-wrap: wrap;
   padding: 10px;
  `

export default Request;
