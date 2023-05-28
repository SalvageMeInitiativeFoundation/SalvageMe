import React, { useState, useEffect,useContext } from "react";
import DonorBook from "../components/donorBook";
import Dropdown from "../components/dropdown";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
import {UserContext} from "../context/userContext/userContext";


function Donate() {
  const {setLocalUser,getLocalUser,setUser,user}=useContext(UserContext)

  const [filterCategory, setFilterCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [picFile,setPicFile]=useState(null);
  const [isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    console.log('=====================useremail======================');
    console.log(user[0])
    console.log(donationFormData)
    if (!selectedImage) {
      setPreview(null);
      return;
    }
    // create the preview
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const options = [
    { value: "Language", label: "Language" },
    { value: "religion", label: "Religion" },
    { value: "Social Science", label: "Social Science" },
    { value: "Ap. Science & Technology", label: "Ap. Science & Technology" },
    { value: "Art Recreation", label: "Art Recreation" },
    { value: "Science & Math", label: "Science & Math" },
    { value: "Generalities", label: "Generalities" },
    { value: "Literature", label: "Literature" },
    { value: "Geography & History", label: "Geography & History" },
    { value: "Philosophy & Psychology", label: "Philosophy & Psychology" },
  ];

  const [donationFormData, setDonationFormData] = useState({
    title: "",
    category: "",
    donor: user[0].email,
    withOwner: "false",
    image: "",
  });

  // const mypic = new FormData();
  const acceptedExt = ["image/png", "image/jpg", "image/jpeg"];

  const handleUpload = async (e) => {
    e.preventDefault();
    if (acceptedExt.includes(e.target.files[0].type)) {
      setPicFile(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    let bool = null;
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
      handleUpload(e);
      
    }

    if (e.target.value === "true") {
      bool = true;
      setDonationFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }

    if (e.target.value === "false") {
      bool = false;
      setDonationFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }

    if (!e.target.files && bool !== Boolean) {
      setDonationFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const addDonation = async (File,e) => {
    e.preventDefault()
    setIsLoading(true);
    const mypic = new FormData();

    try {
      mypic.append('mypic',File);
      const urlResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/picture/image-upload`,
        mypic,{
          headers: {
            // 'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': 'multipart/form-data',
          }
        },
      );
      const image = urlResponse.data.imageUrl;
      const donationDetails = {
        ...donationFormData,
        image: urlResponse.data.imageUrl,
        category: filterCategory,
      };
      console.log('===============donation details=====')
      console.log(donationDetails);
      const donationResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/donation/createDonation`,
        donationDetails
      );
      if (donationResponse.status == 200) {
        console.log('=====================bookCreated=======================')
        console.log(donationResponse.data);
        setDonationFormData({
          title: "",
          category: "",
          donor: user[0].email,
          withOwner: "false",
          image: "",
        });
        setSelectedImage(null)
        setIsLoading(false)
        updateDonationCount();
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };

  const updateDonationCount=async()=>{
    // TODO:create api for this which doesn't need token

    const updateDonationCountData={email:user[0].email,donationCount:user[0].donationCount+1}
    try {
          const updateDonationResponse=await axios.put(`${process.env.REACT_APP_BASE_URL}/auth/updateUserCount/${user[0]._id}`,updateDonationCountData);
          if(updateDonationResponse.status==200){
                setLocalUser({...user[0],donationCount:user[0].donationCount+1})
                console.log("=====================updatingUserCount=====================")
                console.log(updateDonationResponse.data)
          }
    } catch (error) {
      console.log(error)
    }


  }

  const { title, category, donor, withOwner } = donationFormData;

  return (
    <>
      <main className="Donate">
        <div className="DonateForm">
          <h3 style={{ textAlign: "center" }}>Donate a book</h3>
          <form >
            <div className="DonateFormDetails">
              <div>
                <label>Title</label>
                <br></br>
                <input
                  type="text"
                  name="Title"
                  id="title"
                  placeholder="Enter name of donation"
                  required={true}
                  value={title}
                  onChange={handleChange}
                />
                <br></br>
                <label>Category</label>
                <br></br>
                <Dropdown
                  placeHolder="Search..."
                  options={options}
                  setFilterCategory={setFilterCategory}
                />
                <label>Volunteer Collection</label>
                <br></br>
                <div className="formButtons">
                  <button
                    type="button"
                    className={
                      withOwner == "true" ? "formButtonActive" : "formButton"
                    }
                    onClick={handleChange}
                    id="withOwner"
                    value={"true"}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={
                      withOwner == "false" ? "formButtonActive" : "formButton"
                    }
                    onClick={handleChange}
                    id="withOwner"
                    value={"false"}
                  >
                    No
                  </button>
                </div>

                <br></br>
              </div>
              <div className="ProfileImageDivContainer">
                <div className="ProfileImageContainer">
                  <label for="bookImage">
                    {selectedImage != null ? (
                      <img
                        src={preview}
                        alt="Profile image"
                        className="ProfileImage"
                      />
                    ) : (
                      <MdCloudUpload size={80} className="CloudImage" />
                    )}
                  </label>
                </div>

                <input
                  type="file"
                  name="BookImage"
                  id="bookImage"
                  onChange={handleChange}
                  accept="image/*"
                  hidden
                />
              </div>
            </div>
            <button type="button" className="DonateButton" onClick={(e)=>addDonation(picFile,e)}>{isLoading?'Loading....':'Donate'}</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Donate;
