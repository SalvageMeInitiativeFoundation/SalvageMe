import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext/userContext";

const useDashboard = () => {
      const { user } = useContext(UserContext);
      const [data,setData] = useState([]);
      const [loading,setLoading] = useState(true);
      useEffect(()=>{
         fetchData();
      },[])
      
      const fetchData =async()=>{
        try {
          const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/donation/myRequest/${user[0].email}`);
          if(res.status==200){
            setData(res.data);
            setLoading(!loading);
            
          }
        } catch (error) {
            
          
        } finally {
          setLoading(!loading);
        } 
      }
      const filterData = (status) => {
        return data.filter(item => item.status === status);
      }

        return { data, loading, fetchData,filterData };
}

export default useDashboard;