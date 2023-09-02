import React from "react";
import { useNavigate } from "react-router-dom";
import "./Floor.css";

const Floor = ({ floor }) => {
  const navigate = useNavigate();

  const handleChange = () => {
    navigate(`/floors/${floor.floorNumber}`);
  };

  return (
    <div className="div-con">
      <div className="floor">Floor No.: {floor.floorNumber}</div>
      <div className="right">
        <div className="right-t">Available Car parking: {floor.carParking}</div>
        <div className="right-b">
          Available Bike parking: {floor.bikeParking}
        </div>
      </div>
      <button onClick={handleChange}>Go To Floor {floor.floorNumber}</button>
    </div>
  );
};

export default Floor;
