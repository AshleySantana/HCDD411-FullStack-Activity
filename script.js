function openNav() {
  //Open nav Bar (Not working Yet )
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
  //Close nav Bar: Side bar
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
//end of side bar code

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
};
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

document.querySelector("#btn_add").addEventListener("click", addModule);

// document.querySelector("#btn_save")
//     .addEventListener("click", saveModule);

document.querySelector("#btn_load").addEventListener("click", loadModule);
// end of deadlines feature
// Deadlines Page feature

//Outline for deadlines page
// when the submit button is clicked a new element need to br created
// it should take the inpput of rthe

// Exhibit page JS Code

function createExhibit(){
  // calling all of my info
  let exhibitName = document.querySelector('#exhibitInputName').value
  let exhibitTheme = document.querySelector('#exhibitInputTheme').value
  let exhibitDateCreated = document.querySelector('#exhibitInputDateCreated').value
  const data = {
      name: exhibitName,
      theme: exhibitTheme,
      date: exhibitDateCreated
  }
  sendData(data)
  let newElement = document.createElement("div")

  let textName = document.createElement("input")
  textName.classList.add("exhibitName")
  textName.textContent = exhibitName

  let textTheme = document.createElement("input")
  textTheme.classList.add("exhibitTheme")
  textTheme.textContent = exhibitTheme

  let textDateCreated = document.createElement("input")
  textDateCreated.classList.add("exhibitDateCreated")
  textDateCreated.value = exhibitDateCreated

  let deleteButton = document.createElement("button")
  deleteButton.textContent = "Delete"
  deleteButton.classList.add("delete")

  let editButton = document.createElement("button")
  editButton.textContent = "Edit"
  editButton.classList.add("edit")
  
  newElement.appendChild(textName)
  newElement.appendChild(textTheme)
  newElement.appendChild(textDateCreated)
  newElement.appendChild(editButton)
  newElement.appendChild(deleteButton)

  deleteButton.addEventListener("click",()=> {
      deleteButton.parentElement.remove()
  })
  
  
  document.querySelector("#exhibitsWrapper").appendChild(newElement)

}
