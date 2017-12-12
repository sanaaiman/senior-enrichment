'use strict';
const db = require('../index.js')
const Sequelize = require('sequelize');

const Student = db.define('students',{
    firstName : {
        type : Sequelize.STRING,
        allowNull : false,
        notEmpty : true
    },
    lastName : {
        type : Sequelize.STRING,
        allowNull : false,
        notEmpty : true
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        notEmpty : true,
        validate : {
            isEmail : true
        }
    },
    gpa : {
        type : Sequelize.DECIMAL,
        validate : {
            min : 0.0,
            max : 4.0
        }

    },
    name : {
        type : Sequelize.VIRTUAL,
        get() {
            return this.getDataValue('firstName')+ ' ' + this.getDataValue('lastName')
        }
    }
    
})
module.exports = Student

