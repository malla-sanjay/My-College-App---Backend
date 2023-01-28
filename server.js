const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
require("dotenv").config();

//Route imports
const authRoutes = require("./authentication/jwtAuth");
const collegeBlocks = require("./src/blocks/blockRouter");
const collegeModules = require("./src/modules/moduleRouter");
const collegeFaculties = require("./src/faculties/facultyRouter");
const collegeTeachers = require("./src/teachers/teacherRouter");
const collegeCapacities = require("./src/capacities/capacityRouter");
const collegeStudentGroups = require("./src/studentGroups/studentGroupRouter");
const collegeClassrooms = require("./src/classroom/classroomRouer");

const eventsFileSystem = require("./fileSystem/eventsFileSystem");

//Middleware
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/authentication", authRoutes);
app.use("/block", collegeBlocks);
app.use("/module", collegeModules);
app.use("/faculty", collegeFaculties);
app.use("/teacher", collegeTeachers);
app.use("/capacity", collegeCapacities);
app.use("/studentGroup", collegeStudentGroups);
app.use("/classroom", collegeClassrooms);

app.use("/filesystem", eventsFileSystem);

//Root Route test
app.get("/", (req, res) => {
  res.send(`Hello world`);
});

//Port activity test
app.listen(port, () => console.log("the port is listening"));
