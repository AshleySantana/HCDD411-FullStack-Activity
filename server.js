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

// app.post("/api/exhibition", (req, res) => {
//   // Logic to create an exhibition based on curator's notes
//   res.json({ message: "Exhibition created successfully" });
// });
// app.post("/api/artwork", (req, res) => {
//   // Logic to add artwork
//   res.json({ message: "Artwork added successfully" });
//   //fs.writeFileSync('artwork.json', JSON.stringify(req.body)); //saves the artwork to a text file
// });

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
            res.json({ message: "Deadline created successfully" });
        });
    });
});

//Ashley: EXHIBITS
// ---------- EXHIBIT PROJECTS API ---------- //

// Path to your data file
const exhibitsPath = path.join(__dirname, "exhibits.json");

// GET - Retrieve all exhibit projects
app.get("/api/exhibits", (req, res) => {
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
  newExhibit.id = newExhibit.id || Date.now().toString();

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
app.delete("/api/exhibits/:id", (req, res) => {
  const exhibitId = req.params.id;
  fs.readFile(exhibitsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading exhibits file" });
    }
    let exhibits = JSON.parse(data);
    const filteredExhibits = exhibits.filter((exhibit) => exhibit.id !== exhibitId);
    fs.writeFile(exhibitsPath, JSON.stringify(filteredExhibits, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing exhibits file" });
      }
      res.json({ message: "Exhibit deleted successfully" });
    });
  });
});

app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`);
});
