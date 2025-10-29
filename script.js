function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

// Calls the function
getChicagoInstitutedata();

// THIS CALLS THE ART INSTITUTE OF CHIACAGO DATA AND PUTS THE TITLES INTO THE DROPDOWN (ONLY DOES IT FOR THE FIRST PAFE OF 100 WORKS)
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
        console.log(`${art.title}`)
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