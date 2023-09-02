import React from "react";
import "./Floors.css";
import Floor from "./Floor";

const FloorsPage = ({ floors, setFloors }) => {
  return (
    <div className="container">
      <p>
        About Us: This parking has 5 floors and 20 lots each floor for parking,
        making a total of 100 lots for parking. Each lot can either park 1 car,
        or 2 bikes in it. <br />
        Please select the floor from the below list and lock the parking for
        your vehicle.
      </p>
      <div className="div-block">
        {floors.map((floor) => {
          return <Floor floor={floor} />;
        })}
      </div>
    </div>
  );
};

export default FloorsPage;
