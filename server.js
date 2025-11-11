//this is the thing that is reciving the request
const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs"); //allows files to be accessed 
const app = express();
const PORT = process.env.PORT || 3002; //?

app.use(cors()); //enables  for all cores
app.use(express.json()); //middleware to parse JSON bodies
app.use(express.static(path.join(__dirname, "public"))); //creating the app

// Chris: deadlines and to do
app.get("/data", (req, res) => {
  // define the link
  res.sendFile(path.join(__dirname, "public", "deadline.html"));
});
app.delete("/api/artwork/:id", (req, res) => {
  // Logic to delete artwork by id
  res.json({ message: "Artwork deleted successfully" });
});
app.get("/api/deadlines", (req, res) => {
    // Logic to get all deadlines
    fs.readFile('listInfo.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading deadlines" });
        }
        res.json(JSON.parse(data));
    });
});
app.post("/api/deadlines", (req, res) => {
    // Logic to create a new deadline
    const newItem = req.body;
    fs.readFile('listInfo.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading deadlines" });
        const json = JSON.parse(data);
        json.listItems.push(newItem);
        fs.writeFile('listInfo.json', JSON.stringify(json), (err) => {
            if (err) return res.status(500).json({ message: "Error saving deadline" });
            res.json(newItem); 
        });
    });
app.delete("/api/deadlines/:id", (req, res) => {
  const idToDelete = req.params.id;

  fs.readFile("listInfo.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading deadlines" });

    const json = JSON.parse(data);
    json.listItems = json.listItems.filter(item => item.id !== idToDelete);

    fs.writeFile("listInfo.json", JSON.stringify(json, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error saving updated deadlines" });
      res.json({ message: "Deadline deleted successfully" });
    });
  });
});

});

//Ashley: EXHIBITS

// Path to my data file
const exhibitsPath = path.join(__dirname, "exhibits.json");

// GET - Retrieve all exhibit projects
app.get("/api/exhibits", (req, res) => {
  console.log("Get is working")
  fs.readFile(exhibitsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading exhibits file" });
    }
    const exhibits = JSON.parse(data);
    res.json(exhibits);
    console.log(exhibits)
  });
});

// POST - Add a new exhibit project
app.post("/api/exhibits", (req, res) => {
  const newExhibit = req.body;
  console.log(newExhibit)

  fs.readFile(exhibitsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading exhibits file" });
    }
    const exhibits = JSON.parse(data);

    exhibits.push(newExhibit);

    fs.writeFile(exhibitsPath, JSON.stringify(exhibits, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing exhibits file" });
      }
      console.log("New exhibit saved:", newExhibit);
      res.status(201).json(newExhibit);
    });
  });

});

// PUT - Update an exhibit project by ID
app.put("/api/exhibits/:id", (req, res) => {
  const exhibitId = req.params.id;
  const updatedData = req.body;
  fs.readFile(exhibitsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading exhibits file" });
    }
    let exhibits = JSON.parse(data);
    const index = exhibits.findIndex((exhibit) => exhibit.id === exhibitId);
    if (index === -1) {
      return res.status(404).json({ message: "Exhibit not found" });
    }
    exhibits[index] = { ...exhibits[index], ...updatedData };
    fs.writeFile(exhibitsPath, JSON.stringify(exhibits, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing exhibits file" });
      }
      res.json(exhibits[index]);
    });
  });
});

// DELETE - Remove an exhibit project by ID
app.delete("/api/exhibits/:name", (req, res) => {
  const exhibitName = req.params.name;

  console.log("Deleting exhibit:", exhibitName);

  fs.readFile(exhibitsPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading exhibits file." });

    let exhibits = [];
    try {
      exhibits = JSON.parse(data || "[]");
    } catch (parseErr) {
      return res.status(500).json({ message: "Invalid exhibits file format." });
    }

    // Filter out the exhibit matching the name
    const updatedExhibits = exhibits.filter(ex => ex.name !== exhibitName);

    // Write the updated array back to the file
    fs.writeFile(exhibitsPath, JSON.stringify(updatedExhibits, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ message: "Error deleting exhibit." });
      res.json({ message: `Exhibit '${exhibitName}' deleted successfully.` });
    });
  });
  console.log(exhibitName)
});

app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`);
});
