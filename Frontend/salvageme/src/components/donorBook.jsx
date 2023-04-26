import React from "react";
function DonorBook() {
  return (
    <>
      <div className="DonorBook">
        <div style={{width:"150px",height:"200px"}}>
          <img src={require("../assets/AkiOla.jpg")} alt="Image of Book" />
        </div>

        <h5 style={{ marginLeft: "5px",padding:"5px" }}>AkiOla</h5>
        <button className="DonorBookButton" type="submit">Request</button>
      </div>
    </>
  );
}
export default DonorBook;
