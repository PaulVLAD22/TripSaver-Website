import React, { useState, useEffect, createElement } from "react";
import { HiUserCircle } from "react-icons/hi";
import { Text, Button } from "@chakra-ui/react";
import axios from "axios";
import {positionStackApiKey} from './Config'

function Dashboard(props) {
  const api = "https://605c88b16d85de00170da6c9.mockapi.io/";
  const positionStackReverseApi=  "http://api.positionstack.com/v1/reverse?access_key="+positionStackApiKey+"&query=";
  const [map, setMap] = useState("");
  
 
  useEffect(async () => {
    var L = window.L;
    var mymap = L.map("mapid").setView([50, 50], 4);
    setMap(mymap);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(mymap);

    let spots;
    await axios({
      method: "GET",
      url: api + "spot",
      data: {},
    }).then(
      (response) => {
        spots = response.data;
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(spots);
    
    for (let i = 0; i < spots.length; i++) {
      console.log(spots[i]);
      
      var marker = L.marker([spots[i].lat, spots[i].long])
        .addTo(mymap);

      var p= L.DomUtil.create('p','por');
      
      var popup = L.popup()
      .setLatLng([spots[i].lat, spots[i].long])
      .setContent(p)
      .openOn(mymap);

      marker.bindPopup(popup).openPopup();
    }

    var popup = L.popup();

    async function onMapClick (e) {
      await axios({
        method: "POST",
        url: api + "spot",
        data: {},
      }).then(
        (response) => {
          console.log(response)
        },
        (error) => {
          console.log(error);
        }
      );
      
      L.marker(e.latlng).addTo(mymap);
    }
    
    mymap.on("click", onMapClick);
   
    
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
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
          {props.name}
        </Text>
        <Button color="teal" onClick={props.logout}>
          {" "}
          Logout
        </Button>
      </nav>
      <div
        id="mapid"
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
