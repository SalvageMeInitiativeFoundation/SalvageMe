import React, { useState, useEffect, useContext } from "react";
import DonorBook from "../components/donorBook";
import styled from "styled-components";
import Dropdown from "../components/dropdown";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
import { UserContext } from "../context/userContext/userContext";
import { toast } from "react-toastify";

function Donate() {
  const { setLocalUser,user } = useContext(UserContext);

  const [filterCategory, setFilterCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [picFile, setPicFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccessful, setIsSucessful] = useState(false);

  useEffect(() => {
    // console.log("=====================useremail======================");
    // console.log(user);
    // console.log(donationFormData);
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
    donor: user.email,
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

  const addDonation = async (File, e) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);
    setIsSucessful(false);
    const mypic = new FormData();
    if (selectedImage != null) {
      try {
        mypic.append("mypic", File);
        const urlResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/picture/image-upload`,
          mypic,
          {
            headers: {
              // 'Accept-Language': 'en-US,en;q=0.8',
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = urlResponse.data.imageUrl;
        const donationDetails = {
          ...donationFormData,
          image: imageUrl,
          category: filterCategory,
        };
        // console.log("===============donation details=====");
        // console.log(donationDetails);
        const donationResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/donation/createDonation`,
          donationDetails
        );
        if (donationResponse.status == 200) {
          // console.log(
          //   "=====================bookCreated======================="
          // );
          // console.log(donationResponse.data);
          setDonationFormData({
            title: "",
            category: "",
            donor: user.email,
            withOwner: "false",
            image: "",
          });
          setSelectedImage(null);
          setIsLoading(false);
          setIsSucessful(true);
          toast.success('Book Successfully Donated',{
            position: toast.POSITION.TOP_RIGHT
        })
          updateDonationCount();
        }
      } catch (error) {
        toast.error('Error Donating Book',{
          position: toast.POSITION.TOP_RIGHT
      })
        //console.log(error);
      }finally{         
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const updateDonationCount = async () => {
    // TODO:create api for this which doesn't need token

    const updateDonationCountData = {
      email: user.email,
      donationCount: user.donationCount + 1,
    };
    try {
      const updateDonationResponse = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/auth/updateUserCount/${user._id}`,
        updateDonationCountData
      );
      if (updateDonationResponse.status == 200) {
        setLocalUser({ ...user, donationCount: user.donationCount + 1 });
        // console.log(
        //   "=====================updatingUserCount====================="
        // );
        // console.log(updateDonationResponse.data);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const { title, category, donor, withOwner } = donationFormData;

  return (
    <>
      <main className="Donate">
        <div className="DonateForm">
          <h1 style={{ textAlign: "center",color:'#ff8c00', marginBottom:"30px" }}>Donate a Book</h1>
          {isError? (
            <span style={{ color: "red", textAlign: "center" }}>
              Complete all fields including image
            </span>
          ) : isSuccessful ? (
            <span style={{ color: "green", textAlign: "center" }}>
              Donation sent successfully,you can upload more
            </span>
          ) : (
            ""
          )}
          <DonationForm>
            <div className="DonateFormDetails">
              <DonateFormDetailsBookDetails>
                <div className="inputbox-wrap">
                  <label>Title</label>
                  <br></br>
                  <input
                    type="text"
                    name="Title"
                    id="title"
                    className="donation-Text"
                    placeholder="Enter name of donation"
                    required={true}
                    value={title}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputbox-wrap">
                  <label>Category</label>
                  <br></br>
                  <Dropdown
                    placeHolder="Search..."
                    options={options}
                    setFilterCategory={setFilterCategory}
                  />
                </div>
                <div className="inputbox-wrap">
                  <label>Volunteer for Book Collection</label>
                  <br></br>
                  <div className="formButtons">
                    <button
                      type="button"
                      className={
                        withOwner == "true" ? "formButtonActive button" : "formButton button"
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
                        withOwner == "false" ? "formButtonActive button" : "formButton button"
                      }
                      onClick={handleChange}
                      id="withOwner"
                      value={"false"}
                    >
                      No
                    </button>
                  </div>
                </div>
              </DonateFormDetailsBookDetails>
              <div className="ProfileImageDivContainer">
                <div className="ProfileImageContainer">
                  <label htmlFor="bookImage">
                    {selectedImage != null ? (
                      <img
                        src={preview}
                        alt="Profile image"
                        className="ProfileImage"
                      />
                    ) : (
                      <MdCloudUpload size={160} className="CloudImage" />
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
            <button
              type="button"
              className="button DonateButton"
              onClick={(e) =>isLoading? null : addDonation(picFile, e)}
            >
              {isLoading ? "Loading...." : "Donate"}
            </button>
          </DonationForm>
        </div>
      </main>
    </>
  );
}

const DonationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & .formButtons {
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  gap:8px;
  }
  & .DonateFormDetails {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;

  
  }
  & .formButtonActive {
    background-color: #ff8c00;
    color: #ffffff;
    padding: 14px 20px 14px 20px;
    width: 100%;

  }
  & .formButton{
    padding: 14px 20px 14px 20px;
    margin: 2px;
    color: #050505;
    background-color: #ffffff;
    border:  #ff8c00 solid 1px;
    width: 100%;
  }
  @media (max-width:768px) {
    & .DonateFormDetails{display: grid;
    grid-template-columns: 1fr ;
    gap: 30px;
    margin-bottom: 10px;
    align-items: center;
    }
    }
  `
const DonateFormDetailsBookDetails = styled.div`
  & .inputbox-wrap {
    flex-direction: column;
    & p {
      text-align: left;
      padding-left: 10px;
      color: red;
    }
    margin-top: 20px;
  }

  & input {
    position: relative;
    padding: 11px 5px;
    border-radius: 10px;
    font-size: 1.2em;
    border: 2px solid #000;
    outline: none;
    display: block;
    width: 100%;
    border-radius: 10px;
    height: fit-content;
    &:focus ~ span,
    
  }
  & input[type="file"] {
    border: none;
    padding-top: 0;
  }
`;

export default Donate;
