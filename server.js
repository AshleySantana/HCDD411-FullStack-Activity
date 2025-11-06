const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs"); //allows files to be acessed
const app = express();
const PORT = PORT || 3000; //?

app.use(cors()); //enables  for all cores
app.use(express.static(path.join(__dirname, "public"))); //creating the app

app.get("/data", (req, res) => {
  // define the link
  res.sendFile(path.join(__dirname, "public", "deadline.html"));
});

app.post("/api/exhibition", (req, res) => {
  // Logic to create an exhibition based on curator's notes
  res.json({ message: "Exhibition created successfully" });
});
app.post("/api/artwork", (req, res) => {
  // Logic to add artwork
  res.json({ message: "Artwork added successfully" });
  //fs.writeFileSync('artwork.json', JSON.stringify(req.body)); //saves the artwork to a text file
});
app.delete("/api/artwork/:id", (req, res) => {
  // Logic to delete artwork by id
  res.json({ message: "Artwork deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//THIS IS THE CALL INFO THE ART INSTITUTE OF CHICAGO DATA
getChicagoInstitutedata();
// THIS CALLS THE ART INSTITUTE OF CHIACAGO DATA AND PUTS THE TITLES INTO THE DROPDOWN (ONLY DOES IT FOR THE FIRST PAFE OF 100 WORKS)
function getChicagoInstitutedata() {
  // Create a new XMLHttpRequest object for making an HTTP request
  const request = new XMLHttpRequest();
  // Configure the request with the HTTP method (GET), the API URL (put the fields I want and makes the limit on the page 100), and set it to asynchronous
  request.open(
    "GET",
    "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display&limit=100",
    true
  );
  // What should happen once the request is loaded!
  request.onload = function () {
    // Parse the JSON response into a JavaScript object
    data = JSON.parse(this.response);
    // Loop through each artwork item in the response data
    // data.data means data the JSON parse thing steping into the data of that
    data.data.forEach((art) => {
      console.log(`${art.title}`);
    });
    // Check if the request was successful (HTTP status code 200)
    if (request.status == 200) {
      console.log("Response OK");
      console.log(data);
    } else {
      console.log(`Error occured: Status ${request.status}`);
    }
  };
  // Send the HTTP request to the server
  request.send();
} // END OF API CALL
