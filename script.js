
// Sidebar open/close functions
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
// end of side bar code

document.addEventListener("DOMContentLoaded", () => {
  // Deadlines feature
  const categoryColors = {
    ExhibitionPlanning: "#FFB347",
    cataloging: "#87CEFA",
    documentation: "#90EE90",
    other: "#FFFFFF"
  };

  
function addDeadlineItem(text, category, dueDate, id) {
    const list = document.getElementById("todomodules");

    if (!list) {
      console.error("Could not find #todomodules in the DOM.");
      return;
    }

    const listItem = document.createElement("li");
    listItem.dataset.id = id; // Store ID for deletion

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
    metaDiv.textContent = `Due: ${dueDate}`; //  Use passed-in dueDate

    ltext.appendChild(titleSpan);
    ltext.appendChild(metaDiv);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "status";

    const label = document.createElement("label");
    label.setAttribute("for", "status");

const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";

  editBtn.addEventListener("click", () => {
    document.getElementById("editModal").style.display = "flex";
    document.getElementById("editTitle").value = titleSpan.textContent;

    document.getElementById("saveEdit").onclick = () => {
      const newTitle = document.getElementById("editTitle").value.trim();
      if (newTitle) {
        titleSpan.textContent = newTitle;

        // ✅ PUT request to update on server
        fetch(`http://localhost:3002/api/deadlines/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: newTitle })
        })
        .then(res => res.json())
        .then(data => console.log("Updated:", data))
        .catch(err => console.error("Update error:", err));
      }
      document.getElementById("editModal").style.display = "none";
    };

    document.getElementById("cancelEdit").onclick = () => {
      document.getElementById("editModal").style.display = "none";
    };
  });

    wrapper.appendChild(circle);
    wrapper.appendChild(ltext);
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    wrapper.appendChild(editBtn);

    listItem.appendChild(wrapper);
    list.appendChild(listItem);

    // Checkbox event to remove item and send DELETE request
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        listItem.classList.add("fade-out"); 
        setTimeout(() => {
          listItem.remove();

          // Send DELETE request to server
          fetch(`http://localhost:3002/api/deadlines/${id}`, {
            method: "DELETE"
          })
            .then(response => response.json())
            .then(data => {
              console.log("Deleted from server:", data);
            })
            .catch(error => {
              console.error("Error deleting deadline:", error);
            });
        }, 300);
      }
    });
  }

  // Button click to add deadline

document.querySelector("#btn_add").addEventListener("click", () => {
  const input = document.getElementById("module");
  const categorySelect = document.getElementById("category");

  const deadlineText = input.value.trim();
  const selectedCategory = categorySelect.value;

  if (!deadlineText || !selectedCategory) {
    alert("Please enter a title and select a category.");
    return;
  }

  
const newItem = {
      id: Date.now().toString(), // Simple unique ID
      title: deadlineText,
      category: selectedCategory,
      dueDate: new Date().toISOString().split("T")[0]
    };

    // Send to server
    fetch("http://localhost:3002/api/deadlines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Saved to server:", data);
        // Pass all data including ID
        addDeadlineItem(data.title, data.category, data.dueDate, data.id);
        input.value = "";
        categorySelect.value = "";
      })
      .catch((error) => {
        console.error("Error saving deadline:", error);
      });
  });

  //  Load deadlines from server on page load
  fetch("http://localhost:3002/api/deadlines")
    .then((response) => response.json())
    .then((data) => {
      data.listItems.forEach((item) => {
        addDeadlineItem(item.title, item.category, item.dueDate, item.id);
      });
    })
    .catch((error) => {
      console.error("Error loading deadlines:", error);
    });

  // Optional: Save and load modules locally
  
const saveModule = () => {
    const listItems = document.querySelectorAll("li span");
    const modules = [];
    listItems.forEach((item) => {
      modules.push(item.textContent);
    });

    const modulesJSON = JSON.stringify(modules);
    localStorage.setItem("modules", modulesJSON);
  };

  const loadModule = () => {
    const modulesJSON = localStorage.getItem("modules");
    if (!modulesJSON) return;

    const modules = JSON.parse(modulesJSON);
    modules.forEach((moduleName) => {
      addDeadlineItem(moduleName, "other", new Date().toISOString().split("T")[0], Date.now().toString()); // 🔧 NEW: Add ID
    });
  };

});

 // Create exhibit page feature
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

  const xhr = new XMLHttpRequest();
  xhr.open("POST","http://127.0.0.1:3002/api/exhibits", true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  console.log(data)
  xhr.send(JSON.stringify(data))
}

function appendExhibit(exhibit){
  console.log(exhibit)
  let newElement = document.createElement("div")
  let buttonWrapper = document.createElement("div")
  buttonWrapper.classList.add("buttonWrapper")

  let textName = document.createElement("div")
  textName.classList.add("exhibitName")
  textName.textContent = exhibit.name

  let textTheme = document.createElement("div")
  textTheme.classList.add("exhibitTheme")
  textTheme.textContent = exhibit.theme

  let textDateCreated = document.createElement("div")
  textDateCreated.classList.add("exhibitDateCreated")
  textDateCreated.textContent = exhibit.date

  let deleteButton = document.createElement("button")
  deleteButton.textContent = "Delete"
  deleteButton.classList.add("delete")

  let selectButton = document.createElement("button")
  selectButton.textContent = "Select"
  selectButton.classList.add("select")

  selectButton.addEventListener("click", function() {
    window.location.href = "exhibitsDetailPage.html";
  });
  
  newElement.appendChild(textName)
  newElement.appendChild(textTheme)
  newElement.appendChild(textDateCreated)

  newElement.appendChild(buttonWrapper)
  buttonWrapper.appendChild(deleteButton)
  buttonWrapper.appendChild(selectButton)

  deleteButton.addEventListener("click",()=> {
    deleteExhibit(exhibit.name, deleteButton.parentElement);
  })

  document.querySelector("#exhibitsWrapper").appendChild(newElement)
}

function getExhibit() {

  const xhr = new XMLHttpRequest();

  // Initialize the request
  xhr.open("GET", "http://127.0.0.1:3002/api/exhibits", true);

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Parse the JSON response text from the server
      const exhibits = JSON.parse(xhr.responseText);
      exhibits.forEach((exhibit) => appendExhibit(exhibit))
      console.log("Exhibits received:", exhibits);
    } else {
      console.error("Error fetching exhibits:", xhr.status, xhr.statusText);
    }
  };
  xhr.send();
}

function deleteExhibit(exhibitName, elementToRemove) {
  const xhr = new XMLHttpRequest();

  // Assuming your API identifies exhibits by "name"
  // If you use "id", replace exhibitName with exhibit.id in both frontend and backend
  xhr.open("DELETE", `http://127.0.0.1:3002/api/exhibits/${encodeURIComponent(exhibitName)}`, true);

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      
      console.log(`Exhibit "${exhibitName}" deleted successfully.`);
      elementToRemove.remove(); // remove the exhibit from the DOM
    } else {
      console.error("Error deleting exhibit:", xhr.status, xhr.statusText);
    }
  };

  xhr.onerror = function() {
    console.error("Network error while deleting exhibit.");
  };

  xhr.send();
}

// Fetch and display exhibits when page loads
document.addEventListener("DOMContentLoaded", () => {
  getExhibit();
});

