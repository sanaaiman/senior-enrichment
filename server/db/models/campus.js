'use strict';

const Sequelize = require('sequelize')
const db = require('../index.js')

const Campus = db.define('campus', {
    name : {
        type : Sequelize.STRING,
        allowNull : true,
        validate : {
            notEmpty : true
        }
    },
    imageUrl :{
        type : Sequelize.STRING,
        defaultValue : ''

    },
    description : {
        type : Sequelize.TEXT

    },


})
           

module.exports = Campus;

