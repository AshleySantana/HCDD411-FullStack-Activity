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
// Deadlines  feature
const addAListItem = (text) => {
    /*
     * Adds a new list item with the given text and a Delete button.
     */

    if (text.length === 0) {
        // Won't add empty strings
        return;
    }

    const list = document.querySelector("ul");
    const listItem = document.createElement("li");
    const listText = document.createElement("span");
    const listBtn = document.createElement("button");

    listItem.appendChild(listText);
    listText.textContent = text;
    listItem.appendChild(listBtn);
    listBtn.textContent = "Delete";
    listBtn.setAttribute("class", "tufte-button primary");
    list.appendChild(listItem);

    listBtn.addEventListener("click", () => {
        list.removeChild(listItem);
    });


}
const addModule = (event) => {
    const input = document.querySelector("input");

    const moduleName = input.value;
    addAListItem(moduleName);

    // limits how many inputs are there
    

    // clear the textbox
    input.value = "";
};

const saveModule = (event) => {
    const listItems = document.querySelectorAll("li span");
    const modules = [];
    listItems.forEach((item) => {
        modules.push(item.textContent);
    });

    const modulesJSON = JSON.stringify(modules);
    localStorage.setItem("modules", modulesJSON);
};

const loadModule = (event) => {
    const modulesJSON = localStorage.getItem("modules");
    if (!modulesJSON) {
        return;
    }

    const modules = JSON.parse(modulesJSON);
    modules.forEach((moduleName) => {
        addAListItem(moduleName);
    }); 
};

document.querySelector("#btn_add")
    .addEventListener("click", addModule);


document.querySelector("#btn_save")
    .addEventListener("click", saveModule);

document.querySelector("#btn_load")
    .addEventListener("click", loadModule);
    // end of deadlines feature
