import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js";
import express from "express";

const routesInit = (app, passport) => {
    // Route to start Google OAuth
    app.get(
      "/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );
  
    // Callback route after Google OAuth
    app.get(
      "/auth/google/callback",
      passport.authenticate("google", { 
        failureRedirect: "/login",
        successRedirect: "/user",
       }),
      (req, res) => {
        console.log("User authenticated:", req.user);
      }
    );

    // Test route to check authentication
    app.get("/test", authenticateUser, (req, res) => {
      res.send("<h3>User is authenticated.</h3>");
    });

    // Protected Route: Dashboard (Only Authenticated Users)
    app.get("/dashboard", authenticateUser, (req, res) => {
      res.send(`<h2>Welcome ${req.user.id}! Your role: ${req.user.role}</h2>`);
    });

    // Protected Route: Admin Panel (Only Admins)
    app.get("/admin", authenticateUser, authorizeAdmin, (req, res) => {
      res.send("<h2>Welcome Admin! You have special access.</h2>");
    });

    // Protected Route: User Panel (Only Regular Users)
    app.get("/user", authenticateUser, (req, res) => {
      res.send("<h2>Welcome User! You have access.</h2>");
    });
};

export { routesInit };
