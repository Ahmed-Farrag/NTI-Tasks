const express = require('express')
const router = express.Router()
const userController = require('../src/controller/user.controller')
router.get("", (req, res) => {
    res.redirect('/showAll')
})
router.get('/add', (req, res) => {
    res.render('add', { title: "add new user" })
})

router.post('/add', (req, res) => {
    console.log(req.body)
    userController.addNewUser(req.body.title, req.body.content, req.body.date)
    res.redirect('/showAll')
})
router.get('/showAll', (req, res) => {
    allusers = userController.showAllUsers()
    // console.log(allusers.length)
    // console.log(allusers)
    res.render('all', {
        title: "all Data",
        allusers,
        isEmpty: allusers.length ? false : true
    })
})

router.get('/delete/:id', (req, res) => {
    userController.deleteUser(req.params.id)
    res.redirect('/showAll')
})

router.get('/edit/:id', (req, res) => {
    userdata = userController.searchUser(req.params.id)
    res.render('edit', { title: "edit", user: userdata })
})
router.post('/edit/:id', (req, res) => {
    user = req.body
    userController.editUser(req.params.id, req.body)
    res.redirect('/showAll')
})



module.exports = router