import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import CustomTable from "../../components/customTable";
import { UserContext } from "../../context/userContext/userContext";
import { styled } from "styled-components";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [data,setData] = useState([]);
  const [approved,setApproved] = useState();
  const [processing,setProcessing] = useState();
  const [rejected,setRejected] = useState();
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
     fetchData();
  },[])
  const fetchData =async()=>{
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/donation/myRequest/${user[0].email}`);
    if(res.status==200){
      // console.log("====================My request===========");
    
      // console.log('mydata',res.data);
      setData(res.data);
      setApproved(()=>res.data.filter((myRequest)=>myRequest.status=='donated'));
      setProcessing(()=>res.data.filter((myRequest)=>myRequest.status=='processing'));
      setRejected(()=>res.data.filter((myRequest)=>myRequest.status=='rejected'));
      setLoading(!loading);
      
    }
  }
  return (
    <MyDashboard>
      <DashboardHeading> Welcome to your Dashboard</DashboardHeading>
      {loading?<p style={{textAlign:'center',marginTop:'10px'}}>loading....</p>:data.length>0?
      <>
        <DashboardContainer>
        <DashboardTitle>My approved Request</DashboardTitle>
        <CustomTable data={approved} loading={loading}/>
          </DashboardContainer>
          <DashboardContainer>
        <DashboardTitle>My Processing Request</DashboardTitle>
          <CustomTable data={processing} loading={loading}/>
          </DashboardContainer>
        <DashboardContainer>
          <DashboardTitle>My Rejected Request</DashboardTitle>
          <CustomTable data={rejected} loading={loading}/>
        </DashboardContainer>
      </>:
      <p style={{textAlign:'center',marginTop:'10px'}}>No data Recorded</p>
      }
      
    </MyDashboard>
  );
}

const MyDashboard = styled.div`
text-align:center;
margin-top:80px;
display:flex;
flex-direction:column;

`;
const DashboardContainer = styled.div`
  border: 1px solid black;
  display:block;
  margin:auto;
  margin-top:10px;
  border-radius:15px;
  padding:10px;
`;

const DashboardHeading = styled.p`
 font-weight:bold;
 font-size:24px;
 text-align:center;
 margin-top:5px;
`;

const DashboardTitle = styled.p`
 font-weight:bold;
 font-size:14px;
 text-align:left;
 margin-top:5px;
`;

export default Dashboard;
