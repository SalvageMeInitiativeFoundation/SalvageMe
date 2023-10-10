import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createId } from '@paralleldrive/cuid2';
import { createDonationAPI } from "../../actions";
import Dropzone from "./Features/Dropzone";
import ImageGrid from "./Features/ImageGrid";
import { isContactValid, isEmailValid, handleImageErrors } from "../../utils/middleware";
import { getCategoriesAPI } from "../../actions";


const DonationForm = (props) => {
  const [bookName, setBookName] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorDescription, setDonorDescription] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorContact, setDonorContact] = useState("");
  const [bookCategories, setBookCategories] = useState([]);
  const [bookType, setBookType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [bookCover, setBookCover] = useState();
  const [readBookCover, setReadBookCover] = useState("");
  const [bookImages, setBookImages] = useState([]);
  const [readBookImages, setReadBookImages] = useState([]);

  const [allCategories, setAllCategories] = useState([]); // Categories from API
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [filename, setFilename] = useState("");

  // ERRORS
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [imageError, setImageError] = useState({bookCover: "", images: ""});


  const validateEmail = (value) => { 
    setDonorEmail(value);
    let emailRes = isEmailValid(value);
    setEmailError(emailRes[1] ? emailRes[1] : "");
  }; 

  const validateContact = (value) => { 
    setDonorContact(value);
    let contactRes = isContactValid(value);
    setContactError(contactRes[1] ? contactRes[1] : "");
  }; 

  useEffect(() => {
    if (props.apiCategories){
      setAllCategories(props.apiCategories.results);
    }
    else {
      props.getCategories();
    }
  },  [props.apiCategories])


  const onDrop = (acceptedFiles, rejectedFiles) => {
    setImageError({...imageError, images: ""});
    
    if (bookImages.length >= 3) {
      setImageError({...imageError, images: "Too many files"});
    }
    else {
      //console.log("Accepted files", acceptedFiles);
      //console.log("Book images", bookImages);
      //console.log("Read book images", readBookImages);
      // Add acceptedfiles to setEventImages
      acceptedFiles.map((file) => {
        const reader = new FileReader();
        const imgId = createId();

        setBookImages((prevState) => [
          ...prevState,
          { id: `image-${imgId}`, file: file },
        ]);

        reader.onload = function (e) {
          setReadBookImages((prevState) => [ 
            ...prevState,
            { id: `image-${imgId}`, src: e.target.result },
          ]);
        };
        reader.readAsDataURL(file);
        return file;
      });
    }

    if(rejectedFiles) {
      let errorMessage = handleImageErrors(rejectedFiles[0].errors[0].code);
      setImageError({...imageError, images: errorMessage});
    }
  };

  const popImage = (imageId) => {
    setBookImages(bookImages.filter((img) => {
      return img.id != imageId;
    }));
    setReadBookImages(bookImages.filter((img) => {
      return img.id != imageId;
    }));
  };
  // (prevState) => [...prevState]


  const coverImageHandler = (acceptedFiles, rejectedFiles) => {
    const singleImagePreview = (file) => {
      // let thumbnailElement = document.getElementById("dropzone-image-preview");
      // Show thumbnail for image files
      if (file && file.type.startsWith("image/")) {
        setFilename(mediaFile.name);
        setBookCover(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
          setReadBookCover(reader.result);
        };
      } 
      else {
        let errorMessage = handleImageErrors(rejectedFiles[0].errors[0].code);
        setImageError({...imageError, flyer: errorMessage});
      }
    };

    setImageError({...imageError, flyer: ""});
    let mediaFile = acceptedFiles[0];
    singleImagePreview(mediaFile);
  };


  const handlePostDonation = (e) => {
    e.preventDefault();

    if (e.target !== e.currentTarget) {
      return;
    }

    // const payload_keys = []

    const payload = {
      book_data: {
        name: bookName,
        description: bookDescription,
        book_type: bookType, 
        donation_date: donationDate,
        categories: bookCategories
      },
      donor_data: {
        name: donorName,
        description: donorDescription,
      },
      address_data: {
        email: donorEmail,
        phone_number: donorContact,
        location: location,
        address: address
      }
    };

    const files = {
      coverImage: bookCover,
      images: bookImages,
    }

    // const formData = new FormData();
    props.postDonation({payload, files});
  }


  useEffect(() => {
    const isAllEntriesFilled = async () => { 
      if ((bookName && bookDescription && donorName && donorDescription && donorEmail &&
        donorContact && bookCategories && bookType && location && address &&
        donationDate && bookCover )) {
          setEnableSubmit(true);
        }
      else {
        setEnableSubmit(false);
      }
    }; 
    isAllEntriesFilled();
  }, [bookName, bookDescription, donorName, donorDescription, donorEmail,
    donorContact, bookCategories, bookType, location, address,
    donationDate, bookCover]);

  return (
    <>
    <Container>
      <Content>
        <Header>
          <h2>Create Donation</h2>
        </Header>

        <Slides class="slides">
          <Slide >
            <FormContent>
              <FormInputs>
                <label>Book Title</label>
                <input
                  type="text"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  required/>
              
                <label for="book-description">Book Description</label>
                <textarea 
                  id="book-description" 
                  name="book-description"
                  value={bookDescription}
                  onChange={(e) => setBookDescription(e.target.value)}
                  required>
                </textarea>
              </FormInputs>
            </FormContent>
          </Slide> 

          <Slide>
            <FormContent>
              <FormInputs>
              <label>Name of Donor</label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required/>

              <label for="about-donor">About the Donor</label>
              <textarea 
                id="about-donor" 
                name="about-donor"
                value={donorDescription}
                onChange={(e) => setDonorDescription(e.target.value)}
                required>
              </textarea>

              <label>Email</label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => validateEmail(e.target.value)}
                required/>
                {emailError && <p className="error">{emailError}</p>}

              <label>Phone Number</label>
              <input
                type="tel"
                value={donorContact}
                onChange={(e) => validateContact(e.target.value)}
                required/>
                {contactError && <p className="error">{contactError}</p>}

              <label for="categories">Category </label><br />
              <select id="categories" name="categories"
                onChange={(e) => 
                  setBookCategories(Array.from(e.target.selectedOptions, option => option.value))
                }
                multiple 
                size={5}
                required>
                {
                  allCategories.map((category) => (
                    <option key={`cat-${category.id}`} value={category.pk}>{category.name}</option>
                    ))
                }
              </select>
              {/* handleCategoriesChange */}
              </FormInputs>
            </FormContent>
          </Slide>

          <Slide>
            <FormContent>
              <FormInputs>
                <label for="location">Location </label><br />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required/>

                { location === "venue" && <>
                  <label>Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required/>
                  </>
                }
              </FormInputs>
            </FormContent>
          </Slide>

          <Slide>
            <FormContent>              
              <FormInputs>
                <label>Donation Date</label>
                <input
                  type="date"
                  value={donationDate}
                  onChange={(e) => setDonationDate(e.target.value)}
                  required/>
              </FormInputs>
            </FormContent>
          </Slide>

          <Slide>
            <FormContent>
              <AssetsArea>
                <div>
                  <label>Upload Book Cover Image</label>
                  <Dropzone 
                    onDrop={coverImageHandler} 
                    accept={"image/*"}
                    minSizeBytes={1}
                    maxSizeBytes={1000000}
                    maxFiles={1}
                    preview={true} 
                    filename={filename}
                    bgImage = {readBookCover}
                    error = {imageError.bookCover && imageError.bookCover}
                    />
                </div>
                <div>
                  <label>Upload Book Images</label>
                  <Dropzone 
                    onDrop={onDrop} 
                    accept={"image/*"} 
                    minSizeBytes={1}
                    maxSizeBytes={1000000}
                    maxFiles={3}
                    error = {imageError.images && imageError.images}
                    />
                </div>
              </AssetsArea>
            </FormContent>
            {readBookImages.length > 0 &&
            < ImageGrid images={readBookImages} popImage={popImage}/>
            }
          </Slide>
        </Slides>

        <SubmitSection>
          <SubmitButton 
            disabled={!enableSubmit}
            onClick={(book) => handlePostDonation(book)}>
            Submit
          </SubmitButton>
        </SubmitSection>
      </Content>
    </Container>
    </>
  );
};

const Container = styled.div`
  border-radius: 30px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  margin: 0 auto;
  border-radius: 30px;
`;

const Header = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: #fa8128;   
  font-weight: 400;
  text-align: center;
  @media (max-width: 480px) {
    padding: 0;
    /* border: 1px solid black; */
    & h2 {
      padding: 0;
      margin: 0;
      font-size: larger;
    }
  }
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const SubmitSection = styled.div`
  padding: 12px 24px 12px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const SubmitButton = styled.button`
  min-width: 100px;
  padding: 10px 50px;
  background-color: #ffcd90;
  border: none;
  outline: none;
  border-radius: 20px;
  color: white;
  &:hover {
    background: #ff8c00;
    }
`;

const FormInputs = styled.div`
  label {
    color: rgba(0, 0, 0, 0.6);
    font-size: 15px;
    margin-bottom: 2px;
    display: block;
  }
  input, select {
    display: block;
    width: 100%;
    height: 45px;
    font-size: 16px;
    border: 1px solid #E5E4E2;
    margin-bottom: 20px;
  }
  select#categories {
    height: fit-content;
  }
  textarea {
    display: block;
    width: 100%;
    font-size: 16px;
    border: 1px solid #E5E4E2;
    min-height: 100px;
    resize: none;
    margin-bottom: 20px;
  }
  p.error {
    color: red;
    margin-top: -15px;
    margin-bottom: 20px;
  }
`;

const Slides = styled.div`
  background: white;
`;

const Slide = styled.div`
 display: ${props => props.display};
`;

const AssetsArea = styled.div`
  & div { 
    & label {
      display: block;
      width: 100%;
      text-align: left;
      color: rgba(0, 0, 0, 0.6);
      padding-bottom: 5px;
    }
  }
`;


const mapStateToProps = (state) => {
  return {
      user: state.userState.user,
      apiCategories: state.donationState.apiCategories,
      createDonationStatus: state.donationState.createDonationStatus,
  }
};

const mapDispatchToProps = (dispatch) => ({
  postDonation: ({payload, files}) => dispatch(createDonationAPI({payload, files})),
  getCategories: () => dispatch(getCategoriesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DonationForm);
