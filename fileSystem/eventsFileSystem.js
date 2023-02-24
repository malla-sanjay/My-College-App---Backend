const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/events/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(
    __dirname,
    "..",
    "schedules",
    "eventsSchedules",
    `${fileName}_events.json`
  );

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: true, message: "File not found" });
  }

  // Read the file contents
  const fileContents = fs.readFileSync(filePath, "utf8");

  try {
    const jsonData = JSON.parse(fileContents);
    return res.json({ error: false, data: jsonData });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: true, message: "Error while parsing" });
  }
});

router.post("/events/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(
    __dirname,
    "..",
    "schedules",
    "eventsSchedules",
    `${fileName}_events.json`
  );

  // Check if file exists
  if (fs.existsSync(filePath)) {
    return res
      .status(400)
      .json({ error: true, message: "Files already exist" });
  }

  // Create the file with an empty array
  const jsonData = [];
  fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" });
    }
    return res
      .status(200)
      .json({ error: false, message: "File for user created" });
  });
});

router.put("/events/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(
    __dirname,
    "..",
    "schedules",
    "eventsSchedules",
    `${fileName}_events.json`
  );

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: false, message: "File not found" });
  }

  try {
    // Read the file contents
    const fileContents = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileContents);
    const newJsonData = req.body;

    // Append new data to the existing array
    if (Array.isArray(newJsonData)) {
      jsonData.push(...newJsonData);
    } else if (typeof newJsonData === "object") {
      jsonData.push(newJsonData);
    } else {
      return res
        .status(400)
        .json({ error: true, message: "Invalid Data type" });
    }

    // Write the updated data to the file
    fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: true, message: "Internal server error" });
      }
      return res
        .status(200)
        .json({ error: false, message: "Data added successfully" });
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: true, message: "Error while parsing file" });
  }
});

router.delete("/events/:fileName/:id", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(
    __dirname,
    "..",
    "schedules",
    "eventsSchedules",
    `${fileName}_events.json`
  );
  const id = req.params.id;

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: true, message: "File not Found" });
  }

  // Read the file contents
  const fileContents = fs.readFileSync(filePath, "utf8");

  try {
    const jsonData = JSON.parse(fileContents);
    const index = jsonData.findIndex((obj) => obj.id === id);

    if (index === -1) {
      return res.status(404).json({ error: true, message: "Object Not found" });
    }

    // Remove the object from the array
    jsonData.splice(index, 1);

    // Write the updated data to the file
    fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: true, message: "Internal server error" });
      }
      return res
        .status(200)
        .json({ error: true, message: "Deleted successfully" });
    });
  } catch (err) {
    console.error(err);
    return res.json({ error: true, message: "Error while parsing file" });
  }
});

module.exports = router;
