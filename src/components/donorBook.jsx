import axios from "axios";
import React from "react";
function DonorBook({donation}) {
  console.log(donation.image)
  const requestList=[]
  const requestBook=async(donation)=>{
    console.log()
    // TODO:change current reciever to user email
    const requestData={'status':'processing','currentReciever':"user.email",'listRecievers':"user.email"}
    try {
      const requestBookResponse = await axios.put(`http://localhost:5000/salvageme/donation/updateDonation/${donation._id}`,requestData);
      if(requestBookResponse.status()==200){
        requestList.push(donation._id);
      }

    } catch (error) {
      
    }
  }


  return (
    <>
      <div className="DonorBook">
        <div style={{width:"150px",height:"150px"}}>
          <img src={donation.image} alt="Image of Book" />
        </div>

        <h5 style={{ marginLeft: "5px",padding:"5px" }}>{donation.title}</h5>
        <button className={requestList.includes(donation._id)?"DonorBookButtonRequested" : "DonorBookButton"} type="submit" onClick={()=>requestBook(donation)}>{requestList.includes(donation._id)?"Requested":"Request"}</button>
      </div>
    </>
  );
}
export default DonorBook;
