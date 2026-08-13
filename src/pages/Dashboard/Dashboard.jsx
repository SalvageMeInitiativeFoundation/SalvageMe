import CustomTable from "../../components/customTable";
import { styled } from "styled-components";
import useDashboard from "../../hooks/useDashboard";
import Spinner from "../../shared/spinner";

function Dashboard() {
  const { data, loading,filterData} =  useDashboard()

  return (
    <MyDashboard>
      <DashboardHeading> Welcome to your Dashboard</DashboardHeading>
      {loading ? (
        <Spinner />
      ) : data.length > 0 ?
      <>
        <StatSection>
          <StatContainer>
              <p className="number">{data.length}</p>
              <p className="caption">Total Requests</p> 
          </StatContainer>
          <StatContainer>
              <p className="number">{filterData('fulfilled').length}</p>
              <p className="caption">Fulfilled Requests</p>
          </StatContainer>
          <StatContainer>
              <p className="number">{filterData('pending').length}</p>
              <p className="caption">Pending Requests</p>   
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
      </> :
      <NoDataState>
        <div className="illustration">📭</div>
        <h3>No data recorded</h3>
        <p>There are no requests yet. Once users request books, they'll appear here.</p>
      </NoDataState>
      }
      
    </MyDashboard>
  );
}

const MyDashboard = styled.div`
text-align:center;
margin-top:120px;
display:flex;
flex-direction:column;

`;
const DashboardContainer = styled.div`
  border: 1px solid #36454f;
  display:block;
  margin:auto;
  margin-top:10px;
  margin-bottom:20px;
  border-radius:15px;
  padding:10px;
  @media (max-width: 768px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const DashboardHeading = styled.p`
 font-weight:bold;
 font-size:28px;
 text-align:center;
 margin-top:12px;
`;
const StatSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-width: 810px;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  gap: 10px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    margin: 40px 10px;
    max-width: calc(100% - 20px);
    box-sizing: border-box;
  }
`;
const StatContainer = styled.div`
  border: 1px solid #36454f;
  padding: 10px;
  border-radius: 10px;
  flex: 1;
  min-width:150px;
  & .number{
    font-size: 24px;
    font-weight: bold;
    color: #ff8c00;
  }
  & .caption{
    font-size: 14px;
    text-align: center;
    color: #36454f;
  }
`;

const DashboardTitle = styled.p`
 font-weight:bold;
 font-size:14px;
 text-align:left;
 margin-top:5px;
`;

const NoDataState = styled.div`
  max-width: 700px;
  margin: 24px auto;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(180deg,#fff,#fbfbff);
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  text-align: center;
  color: #333;
  & .illustration { font-size:40px; margin-bottom:8px }
  & h3 { margin: 6px 0; font-size:18px }
  & p { margin: 0; color: #666 }
`;

export default Dashboard;
