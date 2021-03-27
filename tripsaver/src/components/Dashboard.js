import React, { useState, useEffect, createElement } from "react";
import { HiUserCircle } from "react-icons/hi";
import { Text, Button, position } from "@chakra-ui/react";
import axios from "axios";
import { positionStackApiKey } from "../Config";

function Dashboard(props) {
  const positionStackReverseApi =
    "http://api.positionstack.com/v1/reverse?access_key=" +
    positionStackApiKey +
    "&query=";
  const positionStackApi =
    "http://api.positionstack.com/v1/forward?access_key=" +
    positionStackApiKey +
    "&query=";
  const [map, setMap] = useState("");

  useEffect(async () => {

    const buttonRemove =
      '<button type="button" class="remove">Delete Marker</button>';

    function removeMarker() {
      //Delete
      const marker = this;
      const btn = document.querySelector(".remove");
      btn.addEventListener("click", function() {
        map.removeLayer(marker);
      });
    }
    function addMarker(e) {
      //POST
  
      const marker = new L.marker(e.latlng)
        .addTo(map)
        .bindPopup(buttonRemove);

      marker.on("popupopen", removeMarker);

    }
    //map
    var L = window.L;
    var map = L.map("map").setView([53,40],4);
    setMap(map)
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);


    let spots = [
      { lat: 12, long: 13, country: "Romania", city: "Bucharest" },
      { lat: 20, long: 20, city: "City", country: "Romania" },
    ];
    
    // await axios({
    //   method: "GET",
    //   url: api + "spot",
    //   data: {},
    // }).then(
    //   (response) => {
    //     spots = response.data;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

    for (let i = 0; i < spots.length; i++) {
      const marker = new L.marker([spots[i].lat, spots[i].long], {
        draggable: true,
      })
        .addTo(map)
        .bindPopup(buttonRemove);

      // event remove marker
      marker.on("popupopen", removeMarker);
    }

    map.on("click", addMarker);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        background:
          "linear-gradient(90deg, rgba(12,24,21,1) 0%, rgba(20,99,89,1) 100%)",
      }}
    >
      <nav
        style={{
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80vw",
          padding: "10px 0",
        }}
      >
        <Text
          letterSpacing="3px"
          fontFamily="sans-serif"
          fontSize="3xl"
          color="whiteAlpha.800"
        >
          Kite
        </Text>
        <Text
          color="whiteAlpha.800"
          style={{ position: "relative", bottom: "-5px", cursor: "pointer" }}
        >
          <HiUserCircle fontSize="28px" style={{ display: "inline-block" }} />
          {props.email}
        </Text>
        <Button color="teal" onClick={props.logout}>
          {" "}
          Logout
        </Button>
      </nav>
     <div
        id="map"
        style={{
          paddingTop: "5%",
          margin: "0 auto",
          width: "90vw",
          height: "90vh",
        }}
      ></div>
    </div>
  );
}

export default Dashboard;
