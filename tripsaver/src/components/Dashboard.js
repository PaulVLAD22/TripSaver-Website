import React, { useEffect } from "react";
import { HiUserCircle } from "react-icons/hi";
import { Text, Button} from "@chakra-ui/react";
import axios from "axios";
import { locationIQApiKey } from "../Config";



const Dashboard = ({logout,email}) => {
  
  const locationIQApi =
    "https://us1.locationiq.com/v1/reverse.php?key="+locationIQApiKey;

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
    async function addMarker(e) {
      //POST
  
      const marker = new L.marker(e.latlng,{title:"Country, City"})
        .addTo(map)
        .bindPopup(buttonRemove);

      marker.on("popupopen", removeMarker);

      console.log("https://cors-anywhere.herokuapp.com/"+locationIQApi+"&lat="+e.latlng.lat+'&lon='+e.latlng.lng+"&format=json")
      
      await axios({
      method: "GET",
      url: "https://cors-anywhere.herokuapp.com/"+locationIQApi+"&lat="+e.latlng.lat+'&lon='+e.latlng.lng+"&format=json",
      data: {},
    }).then(
      (response) => {
        console.log(response.data.address.city+response.data.address.country)
      },
      (error) => {
        console.log(error);
      }
    );

    }
    //map
    var L = window.L;
    var map = L.map("map").setView([53,40],4);
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);


    let spots = [
      { lat: 12, long: 13, country: "Romania", city: "Bucharest" },
      { lat: 20, long: 20, city: "City", country: "Romania" },
    ];
    
    

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
          {email}
        </Text>
        <Button color="teal" onClick={logout}>
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
          height: "80vh",
          marginRadius:'25px' 
        }}
      ></div>
    </div>
  );
}

export default Dashboard;
