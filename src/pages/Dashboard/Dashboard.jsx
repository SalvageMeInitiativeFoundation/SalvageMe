import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import CustomTable from "../../components/customTable";
import { UserContext } from "../../context/userContext/userContext";
import { styled } from "styled-components";
import useDashboard from "../../hooks/useDashboard";

function Dashboard() {
  const { data, loading,filterData} =  useDashboard()

  return (
    <MyDashboard>
      <DashboardHeading> Welcome to your Dashboard</DashboardHeading>
      {loading?<p style={{textAlign:'center',marginTop:'10px'}}>loading....</p>:data.length>0?
      <>
        <StatSection>
          <StatContainer>
              <p className="number">{data.length}</p>
              <p className="caption">Total Requests</p> 
          </StatContainer>
          <StatContainer>
              <p className="number">{filterData('approved').length}</p>
              <p className="caption">Approved Requests</p>
          </StatContainer>
          <StatContainer>
              <p className="number">{filterData('processing').length}</p>
              <p className="caption">Total Processing</p>   
          </StatContainer>
          <StatContainer>
            <p className="number">{filterData('rejected').length}</p>
            <p className="caption">Total Rejected</p>  
          </StatContainer>
        </StatSection>
        <DashboardContainer>
          <DashboardTitle>My Request List</DashboardTitle>
          <CustomTable data={data} loading={loading}/>
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

const StatSection = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
  max-width:810px;
  margin: auto;
  gap:10px;
  flex-wrap: wrap;
`;
const StatContainer = styled.div`
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  flex: 1;
  & .number{
    font-size: 24px;
    font-weight: bold;
    color: #ff8c00;
  }
  & .caption{
    font-size: 14px;
    text-align: center;
  }
`;

const DashboardTitle = styled.p`
 font-weight:bold;
 font-size:14px;
 text-align:left;
 margin-top:5px;
`;

export default Dashboard;
