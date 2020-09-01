const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')

router.get('/employee', (request,response) => {

    const connection = db.connect()
    const statement = `select * from employee`
    connection.query(statement , (error,data) => {
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.get('/edit-employee-id/:id', (request,response) => {
    const id = request.params.id
    const connection = db.connect()
    const statement = `select * from employee where id = ${id}`
    connection.query(statement , (error,data) => {
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.get('/employee-details/:id' , (request,response) => {
    const id = request.params.id
    const connection = db.connect()
    const statement = `select * from employee where id = ${id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/add-employee' , (request,response) => {
    const {name,location,email,mobile} = request.body
    const connection = db.connect()
    const statement = `insert into employee (name,location,email,mobile) values ('${name}','${location}','${email}','${mobile}')`
    connection.query(statement, (error,data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/edit-employee/:id' , (request,response) => {
    const id = request.params.id
    const {name,location,email,mobile} = request.body
    const connection = db.connect()
    const statement = `update employee set name = '${name}' , location = '${location}', email = '${email}' , mobile ='${mobile}'  where id = ${id} `
    connection.query(statement, (error,data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/employee/:id' , (request,response) => {
    const id = request.params.id
    const connection = db.connect()
    const statement = `delete from employee where id = ${id}`
    connection.query(statement, (error,data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router
