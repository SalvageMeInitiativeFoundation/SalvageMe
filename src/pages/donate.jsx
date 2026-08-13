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
  const [donationLevel, setDonationLevel] = useState(null);
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

  const levelOptions = [
    { value: "creche", label: "Creche" },
    { value: "nursery", label: "Nursery" },
    { value: "primary", label: "Primary" },
    { value: "jhs", label: "JHS" },
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
          level: donationLevel,
        };
        // console.log("===============donation details=====");
        // console.log(donationDetails);
        const donationResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/donation/createDonation`,
          donationDetails,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
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
          // clear chosen category, level and image preview
          setFilterCategory(null);
          setDonationLevel(null);
          setSelectedImage(null);
          setIsLoading(false);
          setIsSucessful(true);
          // clear success flag shortly after so future resets work
          setTimeout(() => setIsSucessful(false), 1200);
          toast.success('Book Successfully Donated',{
            position: toast.POSITION.TOP_RIGHT
        })
        }
      } catch (error) {
        toast.error('Error Donating Book',{
          position: toast.POSITION.TOP_RIGHT
      })
        console.log("==image upload error==");
        console.log(error);
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


  const { title, category, donor, withOwner } = donationFormData;

  return (
    <>
      <main className="Donate">
        <div className="DonateForm">
          <h1 style={{ textAlign: "center",color:'#ff8c00', marginBottom:"10px" }}>Donate a Book</h1>
          <p className="DonateSubtitle" style={{textAlign:'center', marginBottom: '24px', color:'#6b6b6b'}}>Share a book - add a title, select a category, and upload an image to help us list it faster.</p>
          {isError? (
            <span style={{ color: "red", textAlign: "center" }}>
              Complete all fields including image
            </span>
          ): (
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
                    resetKey={isSuccessful}
                  />
                </div>
                <div className="inputbox-wrap">
                  <label>Donation Level</label>
                  <br></br>
                  <Dropdown
                    placeHolder="Select level..."
                    options={levelOptions}
                    setFilterCategory={setDonationLevel}
                    resetKey={isSuccessful}
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
  max-width: 980px;
  margin: 0 auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(18, 18, 18, 0.06);
  border: 1px solid rgba(0,0,0,0.04);

  & .formButtons {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  & .DonateFormDetails {
    display: grid;
    grid-template-columns: 1fr minmax(220px, 360px);
    gap: 20px;
    margin-bottom: 10px;
    align-items: start;
  }

  & label {
    font-weight: 600;
    color: #333;
    display: block;
    margin-bottom: 8px;
  }

  & input[type="text"],
  & input[type="email"],
  & textarea {
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.12);
    outline: none;
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
  }

  & .formButtonActive {
    background-color: #ff8c00;
    color: #ffffff;
    padding: 12px 16px;
    width: 100%;
    border-radius: 8px;
    border: none;
  }

  & .formButton{
    padding: 12px 16px;
    margin: 2px;
    color: #050505;
    background-color: #ffffff;
    border:  #ff8c00 solid 1px;
    width: 100%;
    border-radius: 8px;
  }

  & .ProfileImageDivContainer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  & .ProfileImageContainer {
    width: 100%;
    max-width: 360px;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 2px dashed rgba(0,0,0,0.06);
    background: #fafafa;
    padding: 12px;
    box-sizing: border-box;
    overflow: hidden;
  }

  & .ProfileImage {
    width: 100%;
    max-width: 200px;
    height: auto;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.06);
    display: block;
  }

  & .CloudImage {
    color: #ff8c00;
    opacity: 0.9;
  }

  & .DonateButton {
    background: #ff8c00;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    align-self: flex-end;
    box-shadow: 0 8px 18px rgba(255,140,0,0.16);
  }

  @media (max-width:768px) {
    & .DonateFormDetails{
      display: grid;
      grid-template-columns: 1fr ;
      gap: 20px;
      margin-bottom: 10px;
      align-items: center;
    }
  }
`;
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
