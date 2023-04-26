import React from "react";
import DonorBook from "../components/donorBook";
import { IoIosFunnel } from "react-icons/io";

function Request() {
  return (
    <>
      <div className="RequestSearch">
       <div  className="RequestSearchOne">
        <input
          type="text"
          name="BooKName"
          id="bookName"
          placeholder="Search for book"
         
        />
        <button type="submit">Search</button>
        </div>

        <IoIosFunnel/>
       
      </div>

      <div className="flexLayout">
        <DonorBook />
        <DonorBook />
        <DonorBook />
        <DonorBook />
        <DonorBook />
        <DonorBook />
        <DonorBook />
        <DonorBook />
        <DonorBook />
        <DonorBook />
        <DonorBook />
      </div>
    </>
  );
}

export default Request;
