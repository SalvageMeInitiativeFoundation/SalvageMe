import React, { useEffect, useState } from "react";
import Heroes from "../components/heroes";
import Partners from "../components/partners";
import Volunteers from "../components/volunteers";
import axios from "axios";
import Spinner from "../shared/spinner";

function Home() {
  const [isLoading, setIsloading] = useState(true);
  const [users, setUsers] = useState(null);
  // const [donations, setDonations] = useState([]);

  useEffect(() => {
    // console.log("fetching");
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const Users = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/users`
      );
      setUsers(Users.data);
      // const Books = await axios.get(
      //   `${process.env.REACT_APP_BASE_URL}/donation/`
      // );
      // setDonations(Books.data);

      // console.log(Books.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <div className="Dashboard">
        <div className="DashboardMini">
          <div className="C1"></div>
          <h3>
            {
              donations.filter((donation) => (donation.category == "Religion"&donation.status=='recieved'))
                .length
            }
          </h3>
          <p>Religion</p>
        </div>
        <div className="DashboardMini">
          <div className="C2"></div>
          <h3>
            {
              donations.filter(
                (donation) => (donation.category == "Social Science" & donation.status=='recieved')
              ).length
            }
          </h3>
          <p>Social Science</p>
        </div>
        <div className="DashboardMini">
          <div className="C3"></div>
          <h3>
            {
              donations.filter(
                (donation) => (donation.category == "Ap. Science & Technology"&donation.status=='recieved')
              ).length
            }
          </h3>
          <p>Ap. Science & Technology</p>
        </div>
        <div className="DashboardMini">
          <div className="C4"></div>
          <h3>
            {
              donations.filter(
                (donation) => (donation.category == "Art Recreation"&donation.status=='recieved')
              ).length
            }
          </h3>
          <p>Art Recreation</p>
        </div>
        <div className="DashboardMini">
          <div className="C5"></div>
          <h3>
            {
              donations.filter((donation) => (donation.category == "Language"&donation.status=='recieved'))
                .length
            }
          </h3>
          <p>Language</p>
        </div>
        <div>
          <h1>{donations.length}</h1>
          <h5>Total</h5>
        </div>
        <div className="DashboardMini">
          <div className="C6"></div>
          <h3>
            {
              donations.filter(
                (donation) => (donation.category == "Science & Math"&donation.status=='recieved')
              ).length
            }
          </h3>
          <p>Science & Math</p>
        </div>
        <div className="DashboardMini">
          <div className="C7"></div>
          <h3>
            {
              donations.filter(
                (donation) => (donation.category == "Generalities"&donation.status=='recieved')
              ).length
            }
          </h3>
          <p>Generalities</p>
        </div>
        <div className="DashboardMini">
          <div className="C8"></div>
          <h3>
            {
              donations.filter((donation) => (donation.category == "Literature"&donation.status=='recieved'))
                .length
            }
          </h3>
          <p>Literature</p>
        </div>
        <div className="DashboardMini">
          <div className="C9"></div>
          <h3>
            {
              donations.filter(
                (donation) => (donation.category == "Geography & History"&donation.status=='recieved')
              ).length
            }
          </h3>
          <p>Geography & History</p>
        </div>
        <div className="DashboardMini">
          <div className="C10"></div>
          <h3>
            {
              donations.filter(
                (donation) => (donation.category == "Philosophy & Psychology"&donation.status=='recieved')
              ).length
            }
          </h3>
          <p>Philosophy & Psychology</p>
        </div>
      </div> */}
      <h1 className="HeroesTitle">Heroes of Change</h1>
      {users == null ? (
        <Spinner></Spinner>
      ) : (
        <div className="flexLayout">
          {users.map((user, index) => (user.donationCount>50 && <Heroes key={index} user={user} />
          ))}
        </div>
      )}
      {/* <div className="Developers">
        <h4>SalvageMe Foundation</h4>
        <div className="DevelopersContainer">
          <img
            src={require("../assets/learning.jpg")}
            alt="Developers Image"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "500px",
              margin: "10px",
            }}
          />
          <hr width="1" size="200" />
          <div className="DevelopersInfo">
            <h5>About Project</h5>
            <p>
              As part of our quest to contributing to the sustainable
              development goals <em>Goal 4 - Quality Education</em>; the SALVAGE
              ME campaign seeks to mobilize, rehabilitate and donate requisite
              educational materials, most especially books to local libraries
              and students giving priority to students in rural areas.
            </p>
            <h5>Our Objectives</h5>
            <p>
              we hope to Maximize Access to Educational Resources, Minimize Waste, Foster a Sustainable and Inclusive Learning environment, promote Quality Education, Create Sustainable City and Community.
            </p>
          </div>
        </div>
      </div> */}
      <h3 style={{ textAlign: "center",color:'#ff8c00' }}>Volunteers</h3>
      {users == null ? (
        <Spinner></Spinner>
      ) : (
        <div className="flexLayout">
          {users.map((user, index) => {
            if (user.accountType == "volunteer") {
              return <Volunteers key={index} user={user} />;
            } else if (user.length == 0) {
              return <p>Call for Volunteers</p>;
            }
          })}
        </div>
      )}

      <h4 style={{ textAlign: "center",color:'#ff8c00' }}>Partners</h4>
      <div className="flexLayout">
        <Partners urlpath="transtack.jpeg" />
      </div>
    </>
  );
}

export default Home;
