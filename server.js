const express = require("express");
const app = express();
const port = 5000;

//Routes
const collegeRoutes = require("./src/college/routes");
const classroomRoutes = require("./src/classroom/routes");

//Middleware
app.use(express.json());

//Home page indication
app.get("/", (req, res) => {
  res.send(`Hello world`);
});

//College account Endpoints
app.use("/api/v1/colleges", collegeRoutes);

//Classroom Endpoint
app.use("/api/v1/classrooms", classroomRoutes);

/* //Blocks Endpoint
app.use("/api/v1/blocks", blockRoutes);

//Capacites Route
app.use("/api/v1/capacities", capacityRoutes);

//faculties Route
app.use("/api/v1/faculties", facultyRoutes);

//faculty modules Route
app.use("/api/v1/faculty-modules", facultyModuleRoutes);

//modules Route
app.use("/api/v1/Modules", moduleRoutes);

//Student groups Route
app.use("/api/v1/student-groups", studentGroupRoutes);

//Teachers Routes
app.use("/api/v1/teachers", teacherRoutes);

//Teacher modules route
app.use("/api/v1/teacher-modules", teacherModuleRoutes); */

app.listen(port, () => console.log("the port is listening"));
