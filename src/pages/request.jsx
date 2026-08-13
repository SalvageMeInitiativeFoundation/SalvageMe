import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DonorBook from "../components/donorBook";
import Filter from "../components/filter";
import axios from "axios";
import Spinner from "../shared/spinner";
import { UserContext } from "../context/userContext/userContext";
import styled from "styled-components";

function Request() {
  const {requestQty,user}=useContext(UserContext);
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
        `${process.env.REACT_APP_BASE_URL}/donation/`,
        {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
        }
      );
      setDonations(BookData.data);
      setIsloading(false);
      // console.log(donations);
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Could not fetch donations';
      toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
      setIsloading(false);
    }
  };

  const FetchDataByTitle = async (title) => {
    setIsloading(true);
    try {
      const BookData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/donation/${title}`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      console.log("Search By Title Result:", BookData.data);
      setDonations(BookData.data);
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Search failed';
      toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setIsloading(false);
    }
  };

  const handleSingleSearch = (e) => {
    e.preventDefault();
    if (singleSearchValue.length > 0) {
      FetchDataByTitle(singleSearchValue);
    } else {
      FetchData();
    }
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
            setIsLoading={setIsloading}
          />
        </div>
          
      </RequestSearch>
      {requestQty.length >= 1 && (
        <Banner role="status" aria-live="polite">
          <strong>Note:</strong>&nbsp;Users can only request one book at a time.
        </Banner>
      )}
      {isLoading ? (
        <Spinner />
      ) : donations.filter((donation) => donation.status == "recieved").length < 1 ? (
        <EmptyState>
          <div className="empty-illustration">📚</div>
          <h3>No books available right now</h3>
          <p>We're restocking our collection — check back soon or try a different category.</p>
          <small style={{ color: "#666" }}>You can also sign up for notifications when new books arrive.</small>
        </EmptyState>
      ) : (
        <FlexLayout>
          {donations
            .filter((donation) => donation.status && donation.status.toLowerCase().startsWith("rec"))
            .map((donation, index) => (
              <DonorBook key={donation._id || index} donation={donation} />
            ))}
        </FlexLayout>
      )}
    </div>
  );
}

const RequestSearch = styled.div`
  margin: 120px 10px 20px 10px;
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
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    padding: 24px 20px 60px 20px;
    max-width: 1100px;
    margin: 0 auto;
  `

  const Banner = styled.div`
    max-width: 1100px;
    margin: 16px auto;
    padding: 12px 16px;
    background: linear-gradient(90deg, #fffaf0, #fff7e6);
    border-left: 4px solid #ffdd57;
    color: #8a6d3b;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    text-align: center;
    font-weight: 600;
    @media (max-width: 768px) {
      margin: 16px 10px;
    }
  `;

  const EmptyState = styled.div`
    max-width: 1100px;
    margin: 48px auto;
    padding: 28px;
    border-radius: 12px;
    text-align: center;
    background: linear-gradient(180deg, #ffffff, #fffdf6);
    box-shadow: 0 8px 30px rgba(17,17,17,0.06);
    color: #333;
    & .empty-illustration{ font-size:48px; margin-bottom:8px }
    & h3 { margin: 8px 0; font-size:20px }
    & p { margin: 6px 0 12px 0; color:#555 }
    @media (max-width: 768px) {
      margin: 48px 10px;
    }
  `;

export default Request;
