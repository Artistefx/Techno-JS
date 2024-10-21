const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

let items = [];

app.post("/items", (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).send("Item added");
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index !== -1) {
    items[index] = req.body;
    res.send("Item updated");
  } else {
    res.status(404).send("Item not found");
  }
});

app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index !== -1) {
    items.splice(index, 1);
    res.send("Item deleted");
  } else {
    res.status(404).send("Item not found");
  }
});
