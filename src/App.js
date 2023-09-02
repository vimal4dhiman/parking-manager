import { Route, Routes } from "react-router-dom";
import "./App.css";
import FloorPage from "./components/FloorPage";
import Floors from "./components/Floors";
import { createContext, useState } from "react";

const floorsInfo = [
  { floorNumber: 0, carParking: 20, bikeParking: 40 },
  { floorNumber: 1, carParking: 20, bikeParking: 40 },
  { floorNumber: 2, carParking: 20, bikeParking: 40 },
  { floorNumber: 3, carParking: 20, bikeParking: 40 },
  { floorNumber: 4, carParking: 20, bikeParking: 40 },
];

export const sharedDataContext = createContext();

function App() {
  const [floors, setFloors] = useState(floorsInfo);

  return (
    <>
      <header className="app-header">
        <h1>Parking Manager</h1>
      </header>
      <Routes>
        {/* <Route exact path="/" element={<Info />} /> */}
        <Route
          exact
          path="/"
          element={<Floors floors={floors} setFloors={setFloors} />}
        />
        <Route
          path="/floors/:floorId"
          element={<FloorPage floors={floors} setFloors={setFloors} />}
        />
      </Routes>
    </>
  );
}

export default App;
