'use strict'
const apiRouter = require('express').Router()
const db = require('../db')
//const {Student,Campus} = require('../db/models')
const Student = require('../db/models/student.js');
const Campus = require('../db/models/campus.js');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
apiRouter.get('/hello', (req, res) => res.send({hello: 'world'}))

// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create


apiRouter.get('/campuses', (req, res, next) => {
	Campus.findAll({})
		.then(campuses => res.json(campuses))
		.catch(next);
});

apiRouter.get('/campuses/:id', (req, res, next) => {
	Campus.findById(req.params.id)
		.then(campus => res.json(campus))
		.catch(next);
});

apiRouter.get('/students', (req, res, next) => {
	Student.findAll({include: [Campus]})
		.then(students => res.json(students))
		.catch(next);
});

apiRouter.get('/students/:id', (req, res, next) => {
	    Student.findOne({
		where: {
			id: req.params.id
		},
		include: [Campus]
	})
		.then(student => res.json(student))
		.catch(next);
});

apiRouter.post('/campuses', (req, res, next) => {
	Campus.create(req.body)
		.then((campus) => {
				res.json(campus);
		})
		.catch(next);
});

apiRouter.post('/students', (req, res, next) => {
    // console.log('REQ.BODY: ', req.body)
    Student.findOrCreate({
        where: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        }
    })
        .spread((student, studentCreated) => {
			console.log(student.get({
					plain : true
				}))})
        .catch(next);
});


apiRouter.put('/students/:id', (req, res, next) => {
    Student.update(
        req.body
    // { name: req.body.name,
    //   email: req.body.email}
        , {
            where: {
                id: req.params.id
            },
            returning: true, // return the updated object (Postgres only)
            plain: true // eliminate updated object meta-data
        })
        .then(result => {
            // console.log('Student Updated: ', result[0]);
            res.json(result[0]); // updated student object
        })
        .catch(next);
});


apiRouter.put('/campuses/:id', (req, res, next) => {
    Campus.update({
        name: req.body.name,
        image: req.body.image
    }, {
            where: {
                id: req.params.id
            },
            returning: true, // return the updated object (Postgres only)
            plain: true //elinminate updated object meta-data
        })
        .then(result => {
            // console.log(`Campus Updated: ${result[0]}`);
            res.json(result[0]); // updated campus object
        })
        .catch(next);
});





apiRouter.delete('/students/:id', (req, res, next) => {
	Student.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(rowsDeleted => {
			// console.log(`Rows deleted: ${rowsDeleted}`);
			res.send(`Rows deleted: ${rowsDeleted}`);
		})
		.catch(next);
});

apiRouter.delete('/campuses/:id', (req, res, next) => {
	Campus.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(rowsDeleted => {
			// console.log(`Rows deleted: ${rowsDeleted}`);
			res.send(`Rows deleted: ${rowsDeleted}`);
		})
		.catch(next);
});







module.exports = apiRouter;