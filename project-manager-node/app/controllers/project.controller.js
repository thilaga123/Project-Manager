const Project = require("../models/project.model.js");

// Create and Save a new project
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "project body can not be empty"
    });
  }
  console.log(req.body);
  // Create a project
  const project = new Project({
    Project_Name: req.body.Project_Name,
    Priority: req.body.Priority,
    User_ID: req.body.User_ID,
    Start_Date: req.body.Start_Date,
    End_Date: req.body.End_Date,
    Status:req.body.Status
  });
  console.log(project);

  // Save Project in the database
  project.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });
};

// Retrieve and return all projects from the database.
exports.findAll = (req, res) => {
  Project.find()
    .then(projects => {
      res.send(projects);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving projects."
      });
    });
};

// Find a single project with a projectId
exports.findOne = (req, res) => {
  Project.findById(req.params.projectId)
    .then(project => {
      if (!project) {
        return res.status(404).send({
          message: "Project not found with id " + req.params.projectId
        });
      }
      res.send(project);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Project not found with id " + req.params.projectId
        });
      }
      return res.status(500).send({
        message: "Error retrieving project with id " + req.params.projectId
      });
    });
};

// Update a project identified by the projectId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Project body can not be empty"
    });
  }

  // Find project and update it with the request body
  Project.findByIdAndUpdate(
    req.params.projectId,
    {
     Project_Name: req.body.Project_Name,
     Priority: req.body.Priority,
     User_ID: req.body.User_ID,
     Start_Date: req.body.Start_Date,
     End_Date: req.body.End_Date,
     Status:req.body.Status
    },
    { new: true }
  )
    .then(project => {
      if (!project) {
        return res.status(404).send({
          message: "project not found with id " + req.params.projectId
        });
      }
      res.send(project);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "project not found with id " + req.params.projectId
        });
      }
      return res.status(500).send({
        message: "Error updating project with id " + req.params.projectId
      });
    });
};

// Find project and delete it with the request body
exports.delete = (req, res) => {
  Project.findByIdAndRemove(req.params.projectId)
    .then(project => {
      if (!project) {
        return res.status(404).send({
          message: "project not found with id " + req.params.projectId
        });
      }
      res.send({ message: "project deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "project not found with id " + req.params.projectId
        });
      }
      return res.status(500).send({
        message: "Could not delete project with id " + req.params.projectId
      });
    });
};
