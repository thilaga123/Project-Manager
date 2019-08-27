module.exports = (app) => {
 const parents = require('../controllers/parent.controller.js');

 // Create a new Parent
 app.post('/parents', parents.create);

 // Retrieve all Parent
 app.get('/parents', parents.findAll);

 // Retrieve a single Parent with parentId
 app.get('/parents/:parentId', parents.findOne);

 // Update a Parent with parentId
 app.put('/parents/:parentId', parents.update);

 // Delete a Parent with parentId
 app.delete('/parents/:parentId', parents.delete);
}