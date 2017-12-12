'use strict';

const db = require('../index');
const Student = require('./student.js');
const Campus = require('./campus.js');

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
//assosciations
Student.belongsTo(Campus);
Campus.hasMany(Student);
	
module.exports = db;


