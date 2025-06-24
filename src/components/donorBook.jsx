import axios from "axios";
import React,{useEffect, useState,useContext } from "react";
import {UserContext} from "../context/userContext/userContext";
import { toast } from "react-toastify";


function DonorBook({donation}) {    
  // console.log(...donation.listRecievers)
  const {setLocalUser,getLocalUser,setUser,user,setRequestQty,requestQty}=useContext(UserContext)

  const [requestList,setrequestlist]=useState([])
  const [listRecievers,setListRecievers]=useState(null)
  useEffect(()=>{
    setListRecievers([...donation.listRecievers,{"recieversId":user[0].email}])
  },[])

  const requestBook=async(donation)=>{
    // console.log('=========================')
    // console.log(listRecievers);
    // TODO:change current reciever to user email
    const requestData={'status':'processing','currentReciever':user[0].email,'listRecievers':listRecievers}
    if(requestQty.length<1||user[0].accountType=='org'){
      // console.log(user[0].accountType=='org')
    try {
      const requestBookResponse = await axios.put(`${process.env.REACT_APP_BASE_URL}/donation/updateDonation/${donation._id}`,requestData);
      // console.log("================================")
      // console.log(requestBookResponse.data.listRecievers);
      if(requestBookResponse.status==200){
        setrequestlist((prev)=>[...prev,donation._id])
        toast.success("Book Request Successful",{
          position: toast.POSITION.TOP_RIGHT
      })
        updateRequestCount()
        setRequestQty((prev)=>[...prev,donation._id])
      }

    } catch (error) {
      toast.error('Could\'t Request Book,Try again',{
        position: toast.POSITION.TOP_RIGHT
    })
      //console.error(error)
    }
  }
  }
  const updateRequestCount=async()=>{
    // TODO:create api for this which doesn't need token
    const updateRequestCountData={email:user[0].email,recievedCount:user[0].recievedCount+1}
    try {
          const updateRequestResponse=await axios.put(`${process.env.REACT_APP_BASE_URL}/auth/updateUserCount/${user[0]._id}`,updateRequestCountData);
          if(updateRequestResponse.status==200){
            // console.log('======================updating request count==========')
            // console.log(updateRequestResponse.data);
                setLocalUser({...user[0],recievedCount:user[0].recievedCount+1})

          }
    } catch (error) {
      //console.log(error)
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
