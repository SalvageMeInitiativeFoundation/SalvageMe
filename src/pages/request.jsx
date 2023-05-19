import React, { useEffect, useState } from "react";
import DonorBook from "../components/donorBook";
import { IoIosFunnel } from "react-icons/io";
import Filter from "../components/filter";
import axios from "axios";
import Spinner from "../shared/spinner";

function Request() {
  const [singleSearchValue, setSingleSearchValue] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [donations, setDonations] = useState(null);

  useEffect(() => {
    console.log("fetching");
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
      console.log(donations);
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
      console.log(donations);
    } catch (error) {
      console.error(error);
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
    console.log(e.target.value);
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
    <>
      <div className="RequestSearch">
        <div className="RequestSearchOne">
          <input
            type="text"
            name="BooKName"
            id="bookName"
            placeholder="Search for book"
            onChange={handleChange}
            value={singleSearchValue}
          />
          <button type="button" onClick={handleSingleSearch}>
            Search
          </button>
        </div>
        <div>
          <Filter
            placeHolder={"Filter by category..."}
            options={options}
            setDonations={setDonations}
            setIsloading={setIsloading}
          />
        </div>
      </div>

      {isLoading ? (
        <Spinner></Spinner>
      ) : donations.length < 1 ? (
        <div className="flexLayout">
          <p>No books available</p>
        </div>
      ) : (
        <div className="flexLayout">
          {donations.map((donation, index) => {
            console.log('==============================')

            if (donation.status == "recieved") {
              console.log(donation);
              return <DonorBook key={index} donation={donation} />;
            }
          })}
        </div>
      )}
    </>
  );
}

export default Request;
