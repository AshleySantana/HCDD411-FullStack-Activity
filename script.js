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

//document.querySelector("#btn_add").addEventListener("click", addModule);

// document.querySelector("#btn_save")
//     .addEventListener("click", saveModule);

//document.querySelector("#btn_load").addEventListener("click", loadModule);
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
  
  let data = {
    name: exhibitName,
    theme: exhibitTheme,
    date: exhibitDateCreated
  }

  let newElement = document.createElement("div")

  let textName = document.createElement("input")
  textName.classList.add("exhibitName")
  textName.value = exhibitName

  let textTheme = document.createElement("input")
  textTheme.classList.add("exhibitTheme")
  textTheme.value = exhibitTheme

  let textDateCreated = document.createElement("input")
  textDateCreated.classList.add("exhibitDateCreated")
  textDateCreated.value = exhibitDateCreated

  let deleteButton = document.createElement("button")
  deleteButton.textContent = "Delete"
  deleteButton.classList.add("delete")
  
  newElement.appendChild(textName)
  newElement.appendChild(textTheme)
  newElement.appendChild(textDateCreated)
  newElement.appendChild(deleteButton)

  deleteButton.addEventListener("click",()=> {
      deleteButton.parentElement.remove()
  })

  document.querySelector("#exhibitsWrapper").appendChild(newElement)
}

document.addEventListener("DOMContentLoaded", () => {

  console.log("boo")
  
  const params = new URLSearchParams(window.location.search);
  const exhibitId = params.get("id");

  if (!exhibitId) return;

  fetch("/api/exhibits")
    .then(res => res.json())
    .then(exhibits => {
      const exhibit = exhibits.find(e => e.id === exhibitId);
      if (exhibit) {
        document.getElementById("exhibit-title").textContent = exhibit.title;
        document.getElementById("exhibit-artist").textContent = exhibit.artist;
        document.getElementById("exhibit-description").textContent = exhibit.description;
      } else {
        console.error("Exhibit not found");
      }
    })
    .catch(err => console.error("Error loading exhibit:", err));
});


//sendData(data)
// added the infroamtion to dynamically change the circle in the list 
document.addEventListener("DOMContentLoaded", () => {
  const categoryColors = {
    ExhibitionPlanning: "#FFB347",
    cataloging: "#87CEFA",
    documentation: "#90EE90",
    other: "#FFFFFF"
  };

  function addDeadlineItem(text, category) {
    const list = document.getElementById("todomodules");

    if (!list) {
      console.error("Could not find #todomodules in the DOM.");
      return;
    }

    const listItem = document.createElement("li");
    const wrapper = document.createElement("div");
    wrapper.className = "lstElm";

    const circle = document.createElement("div");
    circle.className = "circle";
    circle.style.backgroundColor = categoryColors[category] || "#ccc";
    circle.textContent = category.charAt(0).toUpperCase();

    const ltext = document.createElement("div");
    ltext.className = "ltext";

    const titleSpan = document.createElement("span");
    titleSpan.className = "title";
    titleSpan.textContent = text;

    const metaDiv = document.createElement("div");
    metaDiv.className = "meta";
    metaDiv.textContent = `Due: ${new Date().toISOString().split("T")[0]}`;

    ltext.appendChild(titleSpan);
    ltext.appendChild(metaDiv);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "status";

    const label = document.createElement("label");
    label.setAttribute("for", "status");

    wrapper.appendChild(circle);
    wrapper.appendChild(ltext);
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    listItem.appendChild(wrapper);
    list.appendChild(listItem);
  }

  document.querySelector("#btn_add").addEventListener("click", () => {
    const input = document.getElementById("module");
    const categorySelect = document.getElementById("category");

    const deadlineText = input.value.trim();
    const selectedCategory = categorySelect.value;

    if (!deadlineText || !selectedCategory) {
      alert("Please enter a title and select a category.");
      return;
    }

    addDeadlineItem(deadlineText, selectedCategory);

    input.value = "";
    categorySelect.value = "";
  });
});
// end of todo page js code
// added this here bc 


