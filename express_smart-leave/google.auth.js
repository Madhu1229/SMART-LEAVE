// import GoogleStrategy from "passport-google-oauth20";
// import config from ".";
// import Login from "../react_smart-leave/src/Pages/login";

// const googleAuth = (passport)=> {
//     GoogleStrategy.Strategy;

//     passport.use
    
    
    
//     (new GoogleStrategy({
//         clientID:config.GOOGLE_CLIENT_ID,
//         clientSecret:config.GOOGLE_CLIENT_SECRET,
//         callbackURL:config.GOOGLE_REDIRECT_URL
//     },(accessToken, refreshToken, profile,callback )=>{
//         console.log(profile);
//         return callback(null,profile)
//     })
// );

// passport.serializeUser((user, callback)=>{
//     callback(null, user.id);
// });

// passport.deserializeUser((id,done)=>{
//     callback(null, user.id);
// });

// };

// export {googleAuth};

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "dotenv/config"; // Load environment variables
import User from './models/User.js'; // Check the correct path



const googleAuth = (passport) => {
   
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URL,
      },


      async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = new User({
                  googleId:profile.id,
                  displayName:profile.displayName,
                  gmail:profile.emails[0].value,
                  image:profile.photos[0].value,
                  firstName:profile.name.givenName,
                  lastName:profile.name.givenName,
                  role: "User", // Default role
                });
                await user.save();
            }

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }

  //     async (accessToken, refreshToken, profile, done) => {
  //       // console.log("Google Profile:", profile);
  //       const userObj = {
  //       googleId:profile.id,
  //       displayName:profile.displayName,
  //       gmail:profile.emails[0].value,
  //       image:profile.photos[0].value,
  //       firstName:profile.name.givenName,
  //       lastName:profile.name.givenName

  //       }

  //       // SELECT * FROM UserWHERE googleID = profile.id
  //       let user = await User.findOne({googleId:profile.id});

  //       if (user){
  //         return done(null,user);
  //       }

  //       User.create(userObj)
  //         .then((user)=>{
  //           return done(null,user);
          
  //         })
  //         .catch((err)=>{
  //           return done(err.message)
  //         }
  //       )
        
  //     }
     )
   );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); // No callback, use `await`
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

};
export { googleAuth };
