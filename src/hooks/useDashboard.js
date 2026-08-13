import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext/userContext";

const useDashboard = () => {
      const { user } = useContext(UserContext);
      const [data,setData] = useState([]);
      const [loading,setLoading] = useState(true);
      useEffect(()=>{
         fetchData();
      },[])
      
      const fetchData =async()=>{
        console.log(user._id)
        try {
          const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/request/user/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${user?.accessToken}`,
              },
            }
          );
          if(res.status==200){
            console.log(res.data)
            setData(res.data);
            
          }
        } catch (error) {
           toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });  
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