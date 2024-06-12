import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { auth } from "../firebase-config";

// import Header from "./components/Header";
// import Main from "./components/Main";
// import Footer from "./components/Footer";

import {
  getAllDocuments,
  addDocument,
  deleteDocument,
} from "../firestore-utility";

function App() {
  // need to hold data for workouts in state as an array of objects
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await getAllDocuments("workouts");

        if (docs?.length > 0) {
          setWorkoutData(docs);
        } else {
          console.log("NO DOCS FOUND.");
        }
      } catch (error) {
        console.error("Failed fetching docs", error);
      }
    };

    fetchData();
  }, [workoutData]);

  const handleAddEntry = () => {
    const newDate = new Date();
    const obj = { date: newDate, type: "", createdBy: auth.currentUser.uid };

    addDocument("workouts", obj);
    setWorkoutData([...workoutData, obj]);
  };

  // event handler to delete an entry
  const handleUpdate = () => {
    console.log("Updated entry");
  };

  // event handler to update an entry
  const handleDelete = (entry) => {
    const newWorkoutData = workoutData.map((elm) => {
      if (elm?.date !== entry.date) {
        return elm;
      }
    });

    deleteDocument("workouts", entry.id);
    setWorkoutData(newWorkoutData);

    console.log("Deleted Entry");
  };

  return (
    <>
      <Header />
      <Main
        workoutData={workoutData}
        handleAddEntry={handleAddEntry}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      <Footer />
    </>
  );
}

export default App;