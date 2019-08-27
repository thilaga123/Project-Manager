const Task = require('../models/task.model.js');

// Create and Save a new task
exports.create = (req, res) => {
 // Validate request
 if(!req.body) {
     return res.status(400).send({
         message: "task body can not be empty"
     });
 }
console.log(req.body)
 // Create a task
 const task = new Task({
    Project_ID:req.body.Project_ID,
  Parent_ID:  req.body.Parent_ID,
  Parent_Task: req.body.Parent_Task,
  Task: req.body.Task,
  Start_Date: req.body.Start_Date,
  End_Date: req.body.End_Date,
  Priority: req.body.Priority,
  Status: req.body.Status,
  User_ID:req.body.User_ID
 });
 console.log(task);

 // Save Task in the database
 task.save()
 .then(data => {
     res.send(data);
 }).catch(err => {
     res.status(500).send({
         message: err.message || "Some error occurred while creating the Task."
     });
 });

};

// Retrieve and return all tasks from the database.
exports.findAll = (req, res) => {
 Task.find()
    .then(tasks => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tasks."
        });
    });
};

// Find a single task with a taskId
exports.findOne = (req, res) => {
 Task.findById(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });            
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving task with id " + req.params.taskId
        });
    });
};

// Update a task identified by the taskId in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body) {
 return res.status(400).send({
     message: "Task body can not be empty"
 });
}

// Find task and update it with the request body
Task.findByIdAndUpdate(req.params.taskId, {
    Project_ID:req.body.Project_ID,
    Parent_ID:  req.body.Parent_ID,
    Parent_Task: req.body.Parent_Task,
    Task: req.body.Task,
    Start_Date: req.body.Start_Date,
    End_Date: req.body.End_Date,
    Priority: req.body.Priority,
    Status: req.body.Status,
    User_ID:req.body.User_ID
}, {new: true})
.then(task => {
 if(!task) {
     return res.status(404).send({
         message: "task not found with id " + req.params.taskId
     });
 }
 res.send(task);
}).catch(err => {
 if(err.kind === 'ObjectId') {
     return res.status(404).send({
         message: "task not found with id " + req.params.taskId
     });                
 }
 return res.status(500).send({
     message: "Error updating task with id " + req.params.taskId
 });
});
};


// Find task and delete it with the request body
exports.delete = (req, res) => {
 Task.findByIdAndRemove(req.params.taskId)
 .then(task => {
     if(!task) {
         return res.status(404).send({
             message: "task not found with id " + req.params.taskId
         });
     }
     res.send({message: "task deleted successfully!"});
 }).catch(err => {
     if(err.kind === 'ObjectId' || err.name === 'NotFound') {
         return res.status(404).send({
             message: "task not found with id " + req.params.taskId
         });                
     }
     return res.status(500).send({
         message: "Could not delete task with id " + req.params.taskId
     });
 });
};

