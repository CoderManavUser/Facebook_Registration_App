var express = require('express');
var router = express.Router();
var userModel=require('./users');
var passport= require('passport');
const data = new userModel()

const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/reg", function (req, res) {
  const dets = new userModel({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
  });

  userModel.register(dets, req.body.password).then(function (registeredUser) {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});


router.get("/profile",isLoggedIn ,function (req, res) {
  userModel.findOne({username:req.session.passport.user})
  .then(function(user){
    res.render('profile',{user});
  })
});
router.get("/login", function (req, res) {
  res.render("login");
});


router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);
router.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/");
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
