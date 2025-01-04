import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/rooms/getallrooms");
        console.log("Rooms fetched from API:", response.data);
        setrooms(response.data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.error("Error fetching rooms:", error);
        setloading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error fetching rooms</h1>
        ) : (
          rooms.map((room) => (
            <div className="col-md-9 mt-2" key={room._id}>
              <Room room={room} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;
