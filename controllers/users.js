const User = require("../models/user.js");
const flash = require("connect-flash");


module.exports.renderSignupForm = (req, res) => {
  res.render("users/signUp.ejs");
}


module.exports.signUp = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ username, email });
      let registeredUser = await User.register(newUser, password);
      console.log(registeredUser);

      req.login(registeredUser , (err) => {
        if(err){
          return next(err);
        }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
      })

    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }


module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
}


module.exports.logIn = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let finalRedirectUrl = res.locals.redirectUrl || "/listings"  //single wise access when it required.
    res.redirect(finalRedirectUrl);
}



module.exports.logOut = (req,res,next) => {
  req.logOut( (err) => {
      if(err){
        return next(err);
      }
      req.flash("success" , "you are logged out!")
      return res.redirect("/listings")
  } )
}
