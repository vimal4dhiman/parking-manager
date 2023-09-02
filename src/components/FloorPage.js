import React, { useState } from "react";
import "./FloorPage.css";
import { useParams } from "react-router-dom";

const FloorPage = ({ floors, setFloors }) => {
  const { floorId } = useParams();

  const [rowncol, setrowncol] = useState({});

  let floor = floors[floorId];

  const numRows = 5;
  const numCols = 4;

  const [buttonData, setButtonData] = useState(() => {
    const initialData = [];
    for (let i = 0; i < numRows; i++) {
      initialData.push(Array(numCols).fill(0));
    }
    return initialData;
  });

  const [popupVisible, setPopupVisible] = useState(false);

  const showPopup = () => {
    setPopupVisible(true);
  };

  const manageParking = (option) => {
    let newFloors = [...floors];
    const { row, col } = rowncol;

    if (buttonData[row][col] === 0) {
      if (option === 2) {
        newFloors[floorId].carParking -= 1;
        newFloors[floorId].bikeParking -= 2;
      } else if (option === 1) {
        if (newFloors[floorId].bikeParking % 2 === 1) {
          newFloors[floorId].bikeParking -= 1;
          newFloors[floorId].carParking -= 1;
        } else if (newFloors[floorId].bikeParking % 2 === 0) {
          newFloors[floorId].bikeParking -= 1;
          newFloors[floorId].carParking -= 1;
        }
      }
      const updatedButtonData = [...buttonData];
      updatedButtonData[rowncol.row][rowncol.col] = option;
      setButtonData(updatedButtonData);

      setFloors(newFloors);
    } else if (buttonData[row][col] === 1 && option === 4) {
      newFloors[floorId].bikeParking -= 1;
      const updatedButtonData = [...buttonData];
      updatedButtonData[rowncol.row][rowncol.col] = 4;
      setButtonData(updatedButtonData);
    }
  };

  const clearParking = () => {
    let newFloors = [...floors];
    if (buttonData[rowncol.row][rowncol.col] === 1) {
      newFloors[floorId].bikeParking++;
      newFloors[floorId].carParking++;
      buttonData[rowncol.row][rowncol.col] = 0;
      setButtonData(buttonData);
    } else if (buttonData[rowncol.row][rowncol.col] === 4) {
      console.log(buttonData);
      let buttons = [...buttonData];
      buttons[rowncol.row][rowncol.col] = 1;
      console.log(buttons);
      setButtonData(buttons);
      newFloors[floorId].bikeParking++;
    } else if (buttonData[rowncol.row][rowncol.col] === 2) {
      newFloors[floorId].carParking++;
      newFloors[floorId].bikeParking += 2;
      buttonData[rowncol.row][rowncol.col] = 0;
      setButtonData(buttonData);
    }
    setFloors(newFloors);
  };

  const hidePopup = (option) => {
    setPopupVisible(false);

    if (option === 1 || option === 2 || option === 4) {
      manageParking(option);
    } else if (option === 3) {
      clearParking();
    }
  };

  const handleButtonClick = (row, col) => {
    setrowncol({ row: row, col: col });
    showPopup();
  };

  return (
    <div className="div-container">
      <h2>Welcome to Floor No. {floorId}</h2>
      <div className="available-floors">
        <div className="car">Car parkings left: {floor.carParking}</div>
        <div className="bike">Bike parkings left: {floor.bikeParking} </div>
      </div>
      <div className="button-container">
        {Array.from({ length: numRows }, (_, rowIndex) => (
          <div key={rowIndex} className="button-row">
            {Array.from({ length: numCols }, (_, colIndex) => (
              <button
                key={colIndex}
                className={
                  buttonData[rowIndex][colIndex] === 1
                    ? "bike-clicked"
                    : buttonData[rowIndex][colIndex] === 4
                    ? "bike-2-clicked"
                    : buttonData[rowIndex][colIndex] === 2
                    ? "car-clicked"
                    : "unclicked"
                }
                onClick={() => handleButtonClick(rowIndex, colIndex)}
              >
                Parking {rowIndex + 1}-{colIndex + 1}
              </button>
            ))}
          </div>
        ))}
        {popupVisible && (
          <div className="popup">
            <div className="popup-content">
              <h2>Choose an Option:</h2>
              <button className="popup-btn" onClick={() => hidePopup(0)}>
                Exit
              </button>
              <button
                className="popup-btn"
                onClick={() =>
                  hidePopup(buttonData[rowncol.row][rowncol.col] === 0 ? 1 : 4)
                }
              >
                Park a Bike
              </button>
              <button className="popup-btn" onClick={() => hidePopup(2)}>
                Park a Car
              </button>
              <button className="popup-btn" onClick={() => hidePopup(3)}>
                Clear parking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloorPage;
