const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/classes/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(
    __dirname,
    "..",
    "schedules",
    "classesSchedules",
    `${fileName}_classes.json`
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

router.post("/classes/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(
    __dirname,
    "..",
    "schedules",
    "classesSchedules",
    `${fileName}_classes.json`
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

router.put("/classes/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(
    __dirname,
    "..",
    "schedules",
    "classesSchedules",
    `${fileName}_classes.json`
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

    // Check for duplicates based on composite key
    const isDuplicate = jsonData.some((data) => {
      return (
        data.classroom === newJsonData.classroom &&
        data.dayOfWeek === newJsonData.dayOfWeek &&
        data.startingTime === newJsonData.startingTime
      );
    });

    if (isDuplicate) {
      return res
        .status(400)
        .json({ error: true, message: "Duplicate data not allowed" });
    }

    // Append new data to the existing array
    jsonData.push(newJsonData);

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

router.delete("/classes/:fileName/:id", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(
    __dirname,
    "..",
    "schedules",
    "classesSchedules",
    `${fileName}_classes.json`
  );
  const id = req.params.id;
  console.log(id);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: true, message: "File not Found" });
  }

  // Read the file contents
  const fileContents = fs.readFileSync(filePath, "utf8");
  console.log(fileContents);

  try {
    const jsonData = JSON.parse(fileContents);
    const index = jsonData.findIndex((obj) => obj.id == id);

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
        .json({ error: false, message: "Deleted successfully" });
    });
  } catch (err) {
    console.error(err);
    return res.json({ error: true, message: "Error while parsing file" });
  }
});

module.exports = router;
