function openNav() { //needs to be edited 
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

// Moved call to script.js

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
// Deadlines Page feature 
// when the submit button is clicked a new element need to br created 
// it should take the inpput of rthe 