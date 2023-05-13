import React, { useState, useEffect } from "react";
import DonorBook from "../components/donorBook";
import Dropdown from "../components/dropdown";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";

function Donate() {
  const [filterCategory, setFilterCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
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
    donor: "User.email",
    withOwner: "false",
    image: "",
  });

  const mypic = new FormData();
  const acceptedExt = ["image/png", "image/jpg", "image/jpeg"];

  const handleUpload = async (e) => {
    e.preventDefault();
    if (acceptedExt.includes(e.target.files[0].type)) {
      mypic.append("mypic", e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    let bool = null;
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
      handleUpload(e);
      // setSelectedImage(null)
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

  const addDonation = async () => {
    try {
      const urlResponse = await axios.post(
        "http://localhost:5000/salvageme/picture/image-upload",
        mypic
      );
      const image = urlResponse.data().imageUrl;
      const donationDetails = {
        ...donationFormData,
        image: image,
        category: filterCategory,
      };
      const donationResponse = await axios.post(
        "http://localhost:5000/salvageme/donation/createDonation",
        donationDetails
      );
      if (donationResponse.status() == 200) {
        setDonationFormData({
          title: "",
          category: "",
          donor: "User.email",
          withOwner: "false",
          image: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { title, category, donor, withOwner } = donationFormData;

  return (
    <>
      <main className="Donate">
        <div className="DonateForm">
          <h3 style={{ textAlign: "center" }}>Donate a book</h3>
          <form onSubmit={addDonation}>
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
                      <MdCloudUpload size={80} className="ProfileImage" />
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
            <button type="submit" className="DonateButton">Donate</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Donate;
