import React from "react";
import DonorBook from "../components/donorBook";
import Dropdown from "../components/dropdown";

function Donate() {
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
  return (
    <>
      <main className="Donate">
        <div className="DonateForm">
          <h3 style={{ textAlign: "center" }}>Donate a book</h3>
          <form>
            <div className="DonateFormDetails">
              <div>
                {" "}
                <label htmlFor="Name">Name</label>
                <br></br>
                <input
                  type="text"
                  name="Name"
                  id="name"
                  placeholder="Enter name of donation"
                  required={true}
                />
                <br></br>
                <label htmlFor="Category">Category</label>
                <br></br>
                <Dropdown placeHolder="Search..." options={options} />
                <label htmlFor="VolunteerPoint">Volunteer Collection</label>
                <br></br>
                
                <input
                className="VolunteerPoint"
                  type="checkbox"
                  name="VolunteerPoint"
                  id="volunteerPoint"
                />
                
                <br></br>
                <label htmlFor="MeetingPoint">Meeting Point</label>
                <br></br>
                <input
                  type="text"
                  name="MeetingPoint"
                  id="meetingPoint"
                  placeholder="Enter meeting point"
                  required={true}
                />
                <br></br>
              </div>
              <div>
            
                <input type="file" name="BookImage" id="bookImage" />{" "}
              </div>
            </div>
            <button type="submit">Donate</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Donate;
