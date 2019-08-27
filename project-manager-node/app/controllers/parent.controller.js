const Parent = require('../models/parent.model.js');

// Create and Save a new parent
exports.create = (req, res) => {
 // Validate request
 if(!req.body) {
     return res.status(400).send({
         message: "parent body can not be empty"
     });
 }
console.log(req.body)
 // Create a parent
 const parent = new Parent({
    Project_ID:req.body.Project_ID,
    Parent_Task: req.body.Task
 });
 console.log(parent);

 // Save Parent in the database
 parent.save()
 .then(data => {
     res.send(data);
 }).catch(err => {
     res.status(500).send({
         message: err.message || "Some error occurred while creating the Parent."
     });
 });

};

// Retrieve and return all parents from the database.
exports.findAll = (req, res) => {
 Parent.find()
    .then(parents => {
        res.send(parents);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving parents."
        });
    });
};

// Find a single parent with a parentId
exports.findOne = (req, res) => {
 Parent.findById(req.params.parentId)
    .then(parent => {
        if(!parent) {
            return res.status(404).send({
                message: "Parent not found with id " + req.params.parentId
            });            
        }
        res.send(parent);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Parent not found with id " + req.params.parentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving parent with id " + req.params.parentId
        });
    });
};

// Update a parent identified by the parentId in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body) {
 return res.status(400).send({
     message: "Parent body can not be empty"
 });
}

// Find parent and update it with the request body
Parent.findByIdAndUpdate(req.params.parentId, {
    Project_ID:req.body.Project_ID,
  Parent_Task: req.body.Task
}, {new: true})
.then(parent => {
 if(!parent) {
     return res.status(404).send({
         message: "parent not found with id " + req.params.parentId
     });
 }
 res.send(parent);
}).catch(err => {
 if(err.kind === 'ObjectId') {
     return res.status(404).send({
         message: "parent not found with id " + req.params.parentId
     });                
 }
 return res.status(500).send({
     message: "Error updating parent with id " + req.params.parentId
 });
});
};


// Find parent and delete it with the request body
exports.delete = (req, res) => {
 Parent.findByIdAndRemove(req.params.parentId)
 .then(parent => {
     if(!parent) {
         return res.status(404).send({
             message: "parent not found with id " + req.params.parentId
         });
     }
     res.send({message: "parent deleted successfully!"});
 }).catch(err => {
     if(err.kind === 'ObjectId' || err.name === 'NotFound') {
         return res.status(404).send({
             message: "parent not found with id " + req.params.parentId
         });                
     }
     return res.status(500).send({
         message: "Could not delete parent with id " + req.params.parentId
     });
 });
};

