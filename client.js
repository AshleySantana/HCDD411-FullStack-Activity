getChicagoInstitutedata();

function getChicagoInstitutedata() {

    // Create a new XMLHttpRequest object for making an HTTP request
    const request = new XMLHttpRequest();

    // Configure the request with the HTTP method (GET), the API URL (put the fields I want and makes the limit on the page 100), and set it to asynchronous
    request.open( "GET", "https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display&limit=100",true);

    // What should happen once the request is loaded!
    request.onload = function () {

        // Parse the JSON response into a JavaScript object
        data = JSON.parse(this.response);

        // Loop through each artwork item in the response data
        // data.data means data the JSON parse thing steping into the data of that
        data.data.forEach((art) => {
        
        // Get the dropdown element from the HTML document
        let dropdown = document.querySelector("#chooseArtworks");
        // Create a new <option> element
        let newElement = document.createElement("option");
        // Create a text node with the artwork title
        let textNode = document.createTextNode(`${art.title}`);
        // Set the value of the option to the artwork's ID
        newElement.value = art.id;
        // Append the text to the <option> element
        newElement.appendChild(textNode);
        // Add the <option> element to the dropdown menu
        dropdown.appendChild(newElement);
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
}

function selectedArt() {
    // Get the selected artwork ID from the dropdown menu
    let dropdown = document.querySelector("#chooseArtworks").value;
  
    // Create a new XMLHttpRequest to fetch data for the selected artwork
    const request = new XMLHttpRequest();

    // Initializes the get request
    request.open("GET", `https://api.artic.edu/api/v1/artworks/${dropdown}`, true);

    // Define what should happen when the response is loaded
    request.onload = function () {

        // Parse the JSON response into a JS object
        data = JSON.parse(this.response);

        // MY VARIABLES :0
        // Get the artwork object from response
        let art = data.data;
        // Select the HTML table element
        let table = document.querySelector("#artworkTable");
        // Create a new row element to hold all artwork info
        let tr = document.createElement("tr");

        /*
         THIS IS WHERE I LOAD EACH CELL OF INFORMATION IT FOES AS FOLLOWS:
              TITLE
              IMAGE
              ARTIST
              YEAR
        */
        
        // TITLE element in table

            let title = document.createElement("td");

            // If the title isn't "Untitled", show the real title; otherwise, show "No title"
            if (title != "Untitled") {
                title.textContent = art.title;
            } else {
                title.textContent = "No title";
            }
            // Add the title cell to the row
            tr.appendChild(title);
            // Add the row to the table
            table.appendChild(tr);

        // IMAGE element in table

            // Create a cell for the image
            let imageCell = document.createElement("td");
            // Create an <img> element
            let image = document.createElement("img");
            // Construct the full image URL from the API response; It asked for a lot of specifics things, remember you included that in URL and utilized the IIIF API
            image.src = `${data.config.iiif_url}/${art.image_id}/full/400,/0/default.jpg`;
            // Append image to the cell
            imageCell.appendChild(image);
            // Append image cell to the row
            tr.appendChild(imageCell);
            // Append row to the table
            table.appendChild(tr);

        // ARTIST element in table
            let artist = document.createElement("td");
            // Set the artist's name
            artist.textContent = art.artist_display;
            tr.appendChild(artist);
            table.appendChild(tr);

        // YEAR element in table
            let year = document.createElement("td");
            // Set the year value
            year.textContent = art.date_end;
            tr.appendChild(year);
            table.appendChild(tr);            

        if (request.status == 200) {
            console.log(`Art retrieved!`);
        } else {
            console.log(`Error occured: Status ${request.status}`);
        }
    };
    request.send();
}

document.addEventListener("DOMContentLoaded", () => {


    const form = document.getElementById("create-exhibit-form");
  
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault(); // prevent page reload
  
        const exhibitData = {
          title: document.getElementById("title").value,
          artist: document.getElementById("artist").value,
          description: document.getElementById("description").value
        };
  
        //  Send POST request to create exhibit
        fetch("/api/exhibits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(exhibitData)
        })
        .then(res => res.json())
        .then(newExhibit => {
          console.log("Created exhibit:", newExhibit);
          //  Redirect to exhibit details page
          window.location.href = `exhibitProjects.html?id=${newExhibit.id}`;
        })
        .catch(err => console.error("Error creating exhibit:", err));
      });
    }
  });

  
  