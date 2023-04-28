import React from "react";
import Heroes from "../components/heroes";
import Partners from "../components/partners";
import Volunteers from "../components/volunteers";

function Home() {
  return (
    <>
      <div className="Dashboard">
        <div className="DashboardMini">
          <div className="C1"></div>
          <h3>1000</h3>
          <p>Religion</p>
        </div>
        <div className="DashboardMini">
          <div className="C2"></div>
          <h3>1000</h3>
          <p>Social Science</p>
        </div>
        <div className="DashboardMini">
          <div className="C3"></div>
          <h3>1000</h3>
          <p>Ap. Science & Technology</p>
        </div>
        <div className="DashboardMini">
          <div className="C4"></div>
          <h3>1000</h3>
          <p>Art Recreation</p>
        </div>
        <div className="DashboardMini">
          <div className="C5"></div>
          <h3>1000</h3>
          <p>Language</p>
        </div>
        <div >
          <h1>1000</h1>
          <h5>Total</h5>
        </div>
        <div className="DashboardMini">
          <div className="C6"></div>
          <h3>1000</h3>
          <p>Science & Math</p>
        </div>
        <div className="DashboardMini">
          <div className="C7"></div>
          <h3>1000</h3>
          <p>Generalities</p>
        </div>
        <div className="DashboardMini">
          <div className="C8"></div>
          <h3>1000</h3>
          <p>Literature</p>
        </div>
        <div className="DashboardMini">
          <div className="C9"></div>
          <h3>1000</h3>
          <p>Geography & History</p>
        </div>
        <div className="DashboardMini">
          <div className="C10"></div>
          <h3>1000</h3>
          <p>Philosophy & Psychology</p>
        </div>
      </div>
      <h1 className="HeroesTitle">Heroes of Change</h1>
      <div className="flexLayout">
        <Heroes />
        <Heroes />
        <Heroes />
        <Heroes />
        <Heroes />
        <Heroes />
        <Heroes />
        <Heroes />
      </div>

      <div className="Developers">
        <h4>Developers</h4>
        <div className="DevelopersContainer">
          <img
            src={require("../assets/heropic.jpg")}
            alt="Developers Image"
            style={{ width: "200px", height: "200px", borderRadius: "500px" ,margin:"10px"}}
          />
          <hr width="1" size="200" />
          <div className="DevelopersInfo">
            <h5>About Project</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h5>About Me</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>

      <h3 style={{ textAlign: "center" }}>Volunteers</h3>
      <div className="flexLayout">
        <Volunteers />
        <Volunteers />
        <Volunteers />
        <Volunteers />
        <Volunteers />
        <Volunteers />
        <Volunteers />
        <Volunteers />
        <Volunteers />
        <Volunteers />
        <Volunteers />
      </div>

      <h4 style={{ textAlign: "center" }}>Partners</h4>
      <div className="flexLayout">
        <Partners />
        <Partners />
        <Partners />
        <Partners />
        <Partners />
        <Partners />
        <Partners />
        <Partners />
        <Partners />
        <Partners />
        <Partners />
      </div>
    </>
  );
}

export default Home;
