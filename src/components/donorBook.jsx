import axios from "axios";
import React,{useEffect, useState} from "react";
function DonorBook({donation}) {    
  // console.log(...donation.listRecievers)
  const [requestList,setrequestlist]=useState([])
  const [listRecievers,setListRecievers]=useState(null)
  useEffect(()=>{
    setListRecievers([...donation.listRecievers,{"recieversId":"user.id16"}])
  },[])

  const requestBook=async(donation)=>{
    // console.log('=========================')
    // console.log(listRecievers);
    // TODO:change current reciever to user email
    const requestData={'status':'processing','currentReciever':"user.email",'listRecievers':listRecievers}
    try {
      const requestBookResponse = await axios.put(`http://localhost:5000/salvageme/donation/updateDonation/${donation._id}`,requestData);
      // console.log("================================")
      console.log(requestBookResponse.data.listRecievers);
      if(requestBookResponse.status==200){
        setrequestlist((prev)=>[...prev,donation._id])
      }

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <div className="DonorBook">
        <div style={{width:"150px",height:"150px"}}>
          <img src={donation.image} alt="Image of Book" />
        </div>

        <h5 style={{ marginLeft: "5px",padding:"5px" }}>{donation.title}</h5>
        <button className={requestList.includes(donation._id)?"DonorBookButtonRequested" : "DonorBookButton"} type="button" onClick={()=>requestBook(donation)}>{requestList.includes(donation._id)?"Requested":"Request"}</button>
      </div>
    </>
  );
}
export default DonorBook;
