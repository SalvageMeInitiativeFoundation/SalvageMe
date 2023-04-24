import React from "react";
import Heroes from "../components/heroes";

function Home(){
    return (
        <>
            <div className="Dashboard">
                <div>
                     <h3>1000</h3>
                     <p>Religion</p>
                </div>
                <div>
                     <h3>1000</h3>
                     <p>Social Science</p>
                </div>
                <div>
                     <h3>1000</h3>
                     <p>Ap. Science & Technology</p>
                </div>
                <div>
                     <h3>1000</h3>
                     <p>Art Recreation</p>
                </div>
                <div>
                     <h3>1000</h3>
                     <p>Language</p>
                </div>
                <div>
                     <h3>1000</h3>
                     <h5>Total</h5>
                </div>
                <div>
                     <h3>1000</h3>
                     <p>Science & Math</p>
                </div>
                <div>
                     <h3>1000</h3>
                     <p>Generalities</p>
                </div>
                <div>
                     <h3>1000</h3>
                     <p>Literature</p>
                </div>
                <div>
                     <h3>1000</h3>
                     <p>Geography & History</p>
                </div>
                <div>
                     <h3>1000</h3>
                     <p>Philosophy & Psychology</p>
                </div>
            </div>
            <h1 className="HeroesTitle">Heroes of Change</h1>
            <Heroes/>
            <div className="Developers">
                <h4>Developers</h4>
                <div><img src="" alt="" /></div>
            </div>
        </>
    )
}

export default Home;