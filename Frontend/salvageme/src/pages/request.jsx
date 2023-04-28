import React from "react";
import DonorBook from "../components/donorBook";
import { IoIosFunnel } from "react-icons/io";
import Filter from "../components/filter";

function Request() {
  const options=[
    {value:'all Categories',label:"All Categories"},
    {value:'Language',label:"Language"},
    {value:'religion',label:"Religion"},
    {value:'Social Science',label:"Social Science"},
    {value:'Ap. Science & Technology',label:"Ap. Science & Technology"},
    {value:'Art Recreation',label:"Art Recreation"},
    {value:'Science & Math',label:"Science & Math"},
    {value:'Generalities',label:"Generalities"},
    {value:'Literature',label:"Literature"},
    {value:'Geography & History',label:"Geography & History"},
    {value:'Philosophy & Psychology',label:"Philosophy & Psychology"},

]



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
        <div>
        <Filter  placeHolder={"Filter by category..."} options={options}/>
        </div>
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
