import React from "react";
import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { createId } from '@paralleldrive/cuid2';
import ReactPlayer from "react-player";
import firebase from "firebase/compat/app";
import { createEventAPI } from "../../actions";
import Editor from "./Features/Editor";
import Dropzone from "./Features/Dropzone";
import ImageGrid from "./Features/ImageGrid";
import { isContactValid, isEmailValid, handleImageErrors } from "../../utils/middleware";
import { getCategoriesAPI } from "../../actions";


const EventForm = (props) => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerDescription, setOrganizerDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [eventCategories, setEventCategories] = useState([]);
  const [eventType, setEventType] = useState("");
  //const [eventTicket, setEventTicket] = useState(""); // lookup
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [occurrence, setOccurrence] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventFlyer, setEventFlyer] = useState();
  const [readEventFlyer, setReadEventFlyer] = useState("");
  const [eventImages, setEventImages] = useState([]);
  const [readEventImages, setReadEventImages] = useState([]);
  const [socialMedia, setSocialMedia] = useState("");
  const [websiteURL, setwebsiteURL] = useState("");
  const [agreement, setAgreement] = useState("");

  const [allCategories, setAllCategories] = useState([]); // Categories from API
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [filename, setFilename] = useState("");

  // ERRORS
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [imageError, setImageError] = useState({flyer: "", images: ""});


  const validateEmail = (value) => { 
    setEmail(value);
    let emailRes = isEmailValid(value);
    setEmailError(emailRes[1] ? emailRes[1] : "");
  }; 

  const validateContact = (value) => { 
    setPhoneNumber(value);
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
    
    if (eventImages.length >= 3) {
      setImageError({...imageError, images: "Too many files"});
    }
    else {
      console.log("Accepted files", acceptedFiles);
      console.log("Event images", eventImages);
      console.log("Read event images", readEventImages);
      // Add acceptedfiles to setEventImages
      acceptedFiles.map((file) => {
        const reader = new FileReader();
        const imgId = createId();

        setEventImages((prevState) => [
          ...prevState,
          { id: `image-${imgId}`, file: file },
        ]);

        reader.onload = function (e) {
          setReadEventImages((prevState) => [ // setReadEventImages
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
    setEventImages(eventImages.filter((img) => {
      return img.id != imageId;
    }));
    setReadEventImages(eventImages.filter((img) => {
      return img.id != imageId;
    }));
  };
  // (prevState) => [...prevState]


  const flyerImageHandler = (acceptedFiles, rejectedFiles) => {
    const singleImagePreview = (file) => {
      // let thumbnailElement = document.getElementById("dropzone-image-preview");
      // Show thumbnail for image files
      if (file && file.type.startsWith("image/")) {
        setFilename(mediaFile.name);
        setEventFlyer(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
          setReadEventFlyer(reader.result);
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


  const radioInputHandler = (id) => {
    let elem = document.getElementById(id);

    if (elem.checked) {
      if (id === "paid-event" || id === "free-event"){
        setEventType(elem.value);
      }
      if (id === "once" || id === "recuring") {
        setOccurrence(elem.value);
      }
      if (id === "agreement") {
        setAgreement(elem.value);
      }
    }
  };

  const editorTextChangeHandler = (value) => {
    setEventDescription(value !== "<p><br></p>" ? value : "");
  };

  const handlePostEvent = (e) => {
    e.preventDefault();

    if (e.target !== e.currentTarget) {
      return;
    }

    // const payload_keys = []

    const payload = {
      event_data: {
        name: eventName,
        description: eventDescription,
        event_type: eventType, 
        start_date: startDate,
        end_date: endDate,
        start_time: startTime,
        end_time: endTime,
        categories: eventCategories, 
        occurrence: occurrence,
        social_media_handle: socialMedia,
        website_url: websiteURL,
        agreement: agreement
      },
      organizer_data: {
        name: organizerName,
        description: organizerDescription,
      },
      address_data: {
        email: email,
        phone_number: phoneNumber,
        location: location,
        extra_description: address
      }
    };

    const files = {
      flyer: eventFlyer,
      images: eventImages,
    }

    // const formData = new FormData();
    props.postEvent({payload, files});
  }


  useEffect(() => {
    const isAllEntriesFilled = async () => { 
      if ((eventName && eventDescription && organizerName && organizerDescription && email &&
        phoneNumber && eventCategories && eventType && location && address &&
        occurrence && startDate && endDate && startTime && endTime && eventFlyer &&
        socialMedia && agreement)) {
          setEnableSubmit(true);
        }
      else {
        setEnableSubmit(false);
      }
    }; 
    isAllEntriesFilled();
  }, [eventName, eventDescription, organizerName, organizerDescription, email,
    phoneNumber, eventCategories, eventType, location, address,
    occurrence, startDate, endDate,startTime, endTime, eventFlyer,
    eventImages, socialMedia, agreement, websiteURL]);

  return (
    <>
    {/* {(props.createEventStatus || props.createEventStatus===false) ? (
      <>
      { props.createEventStatus ? (
        <CreateEventSuccess />
        ) : (
          <CreateEventFailed />
        )
      }
      </>
    ) : ( */}
    <Container>
      <Content>
        <Header>
          <h2>Create Event</h2>
        </Header>

        <Slides class="slides">
          <Slide >
            <FormContent>
              <FormInputs>
                <label>Event Title</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required/>
              </FormInputs>
              <Editor handleTextEditorChange={editorTextChangeHandler}/>
            </FormContent>
          </Slide> 

          <Slide>
            <FormContent>
              <FormInputs>
              <label>Name of Organiser</label>
              <input
                type="text"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                required/>

              <label for="about-organizer">About the Organizer</label>
              <textarea 
                id="about-organizer" 
                name="about-organizer"
                value={organizerDescription}
                onChange={(e) => setOrganizerDescription(e.target.value)}
                required>
              </textarea>

              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
                required/>
                {emailError && <p className="error">{emailError}</p>}

              <label>Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => validateContact(e.target.value)}
                required/>
                {contactError && <p className="error">{contactError}</p>}

              <label for="categories">Category </label><br />
              <select id="categories" name="categories"
                onChange={(e) => 
                  setEventCategories(Array.from(e.target.selectedOptions, option => option.value))
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
              <RadioInputs>
                <span className="radio-title">Event Type</span>
                <RadioWrap>
                  <div>
                    <input 
                      type="radio" 
                      id="paid-event" 
                      name="event-type" 
                      value="paid"
                      onChange={() => radioInputHandler("paid-event")}
                      />
                    <label for="event-type" className="radio-label">Paid</label>
                  </div>
                  <div>
                    <input 
                      type="radio" 
                      id="free-event" 
                      name="event-type" 
                      value="free" 
                      onChange={() => radioInputHandler("free-event")}
                      />
                    <label for="event-type" className="radio-label">Free</label>
                  </div>
                </RadioWrap>
              </RadioInputs>
            </FormContent>
          </Slide>

          <Slide>
            <FormContent>
              <FormInputs>
                <label for="location">Location </label><br />
                <select id="location" name="location"
                  onChange={(e) => setLocation(e.target.value)}
                  required>
                  <option value="">Please Select</option>
                  <option value="venue">Venue</option>
                  <option value="online">Online</option>
                </select>

                { location === "venue" && <>
                  <label>Event Address</label>
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
              <RadioInputs>
                <span className="radio-title">Occurrence</span>
                <RadioWrap>
                  <div>
                    <input 
                      type="radio" 
                      id="once" 
                      name="occurrence" 
                      value="once" 
                      onChange={(e) => setOccurrence(e.target.value)}
                      />
                    <label for="occurrence" className="radio-label">One-time Event</label>
                  </div>
                  <div>
                    <input 
                      type="radio" 
                      id="occurrence" 
                      name="recuring" 
                      value="recuring" 
                      onChange={(e) => setOccurrence(e.target.value)}
                      />
                    <label for="occurrence" className="radio-label">Recuring Event</label>
                  </div>
                </RadioWrap>
              </RadioInputs>
              
              <FormInputs>
                <FlexWrap>
                  <div>
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required/>
                  </div>
                  <div>
                    <label>End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required/>
                  </div>
                </FlexWrap>
                <FlexWrap>
                  <div>
                    <label>Start time</label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required/>
                  </div>
                  <div>
                    <label>End time</label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required/>
                  </div>
                </FlexWrap>
              </FormInputs>
            </FormContent>
          </Slide>

          <Slide>
            <FormContent>
              <AssetsArea>
                <div>
                  <label>Upload Event Flyer</label>
                  <Dropzone 
                    onDrop={flyerImageHandler} 
                    accept={"image/*"}
                    minSizeBytes={1}
                    maxSizeBytes={1000000}
                    maxFiles={1}
                    preview={true} 
                    filename={filename}
                    bgImage = {readEventFlyer}
                    error = {imageError.flyer && imageError.flyer}
                    />
                </div>
                <div>
                  <label>Upload Event Images</label>
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
            {readEventImages.length > 0 &&
            < ImageGrid images={readEventImages} popImage={popImage}/>
            }
          </Slide>
            
          <Slide>
            <FormContent>
              <FormInputs>
                <FlexWrap>
                    <div>
                      <label>Social Media Handle</label>
                      <input
                        type="text"
                        value={socialMedia}
                        onChange={(e) => setSocialMedia(e.target.value)}
                        required/>
                    </div>
                    <div>
                      <label>Website URL</label>
                      <input
                        type="text"
                        value={websiteURL}
                        onChange={(e) => setwebsiteURL(e.target.value)}
                        />
                    </div>
                  </FlexWrap>
                </FormInputs>
            </FormContent>
          </Slide>
        </Slides>

        <Agreement>
          <span>Event Creation Agreement</span>
          <div>
            <input 
              type="radio" 
              id="agreement" 
              name="agreement" 
              value="agreed"
              onChange={(e) => setAgreement(e.target.value)}
              />
            <label for="agreement" className="radio-label">
              Agreeing with our terms and conditions means that you have agreed  
              to our policies regarding information on our platform.
            </label>
          </div>
        </Agreement>

        <SubmitSection>
          <SubmitButton 
            disabled={!enableSubmit}
            onClick={(event) => handlePostEvent(event)}>
            Submit
          </SubmitButton>
        </SubmitSection>
      </Content>
    </Container>
    {/* )} */}
    </>
  );
};

const Container = styled.div`
  margin-bottom: 20px;
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid black; */
  & div {
    width: 48%;
    /* border: 1px solid blue; */
    @media (max-width: 480px) {
      width: 100%;
    }
  }
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  margin: 0 auto;
`;

const Header = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: #fa8128;   /* dodgerblue rgba(0, 0, 0, 0.6); */
  font-weight: 400;
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
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

// const Attachments = styled.div`
//   display: flex;
//   padding-right: 8px;
//   align-items: center;
//   ${AssetButton} {
//     width: 40px;
//   }
// `;

// const ShareComment = styled.div`
//   padding-left: 8px;
//   margin-right: auto;
//   border-left: 1px solid rgba(0, 0, 0, 0.15);
//   ${AssetButton} {
//     svg {
//       margin-right: 5px;
//     }
//   }
// `;

const SubmitButton = styled.button`
  min-width: 100px;
  padding: 8px 20px;
  background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.5)" : "#0a66c2")};
  border-radius: 20px;
  color: white;
  &:hover {
    background: ${(props) =>
      props.disabled ? "rgba(0, 0, 0, 0.25)" : "#004182"};
    }
`;

const UploadImage = styled.div`
  text-align: center;
  p {
    margin-top: 5px;
    label {
      border: 1px solid blue;
      padding: 3px;
      font-size: 13px;
    }
  }
  img {
    width: 100%;
  }
`;

const UploadVideo = styled.div`  
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const FormInputs = styled.div`
  label {
    float: left;
    color: rgba(0, 0, 0, 0.6);
    font-size: 15px;
    margin-bottom: 2px;
  }
  input, select {
    width: 100%;
    height: 45px;
    font-size: 16px;
    border: 1px solid #E5E4E2;
    padding: 0 12px;
    margin-bottom: 20px;
  }
  select#categories {
    height: fit-content;
  }
  textarea {
    width: 100%;
    font-size: 16px;
    border: 1px solid #E5E4E2;
    padding: 0 12px;
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

const RadioInputs = styled.div`
  margin-bottom: 20px;
  /* padding: 5px; */
  /* border: 1px solid black; */
  & span.radio-title {
    font-size: 15px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
    text-align: left;
    display: block;
    width: 100%;
    margin-bottom: 5px;
    /* border: 1px solid blue; */
  }
  & label.radio-label {
    float: none;
    color: rgba(0, 0, 0, 0.6);
    font-size: 15px;
    /* border: 1px solid red; */
  }
`;

const RadioWrap = styled.div`
  display: flex;
  padding: 0 5px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  & div {
    width: 50%;
    height: 45px;
    display: flex;
    align-items: center;
    /* border: 1px solid black; */

    & input[type=radio] {
      width: 20px;
      height: 20px;
      margin-top: -3px;
      margin-right: 5px;
    }
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
      width: 100%;
      text-align: left;
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const Agreement = styled.div`
  padding: 8px 12px;
  margin-bottom: 20px;
  /* border: 1px solid green; */
  & span {
    display: block;
    text-align: left;
    padding: 5px 0;
    font-size: 15px;
    font-weight: 600;
    color: #fa8128;
    /* border: 1px solid brown; */
  }
  & div {
    display: flex;
    align-items: flex-start;
    /* border: 1px solid red; */
    & input {
      margin-right: 10px;
    }
    & label {
      text-align: left;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
      user: state.userState.user,
      apiCategories: state.eventState.apiCategories,
      createEventStatus: state.eventState.createEventStatus,
  }
};

const mapDispatchToProps = (dispatch) => ({
  postEvent: ({payload, files}) => dispatch(createEventAPI({payload, files})),
  getCategories: () => dispatch(getCategoriesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
