var express = require("express");
var router = express.Router();

const credential = {
    email: "imran@gmail.com",
    password: "imran123"
}

//login user
router.post('/login', (req, res) => {
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard')
        // res.end("Login Successfull")
    }else{
        res.end("Invalid Username")
    }
});

//route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user: req.session.user})
    }else{
        res.send("Unauthorise User")
    }
})

//route for logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
            res.send("Error")
        }else {
            res.render('base', {title: "Express", logout: "Logout Successfully"})
        }
    })
})

module.exports = router