import React from "react";

import { IMAGE as I } from "../../assets/assets";
const Download = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <div>
        <h1>Choose your King and Queen Today</h1>
        <p>Remember to vote Bhone Nay Lin</p>

      </div>
      <div>
         <img src={I.ph1}/>
          <img src={I.ph2}/>
      </div>
    </div>
  );
};

export default Download;
