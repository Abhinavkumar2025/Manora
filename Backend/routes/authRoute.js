import express from "express";
import { signup, login, me } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

import { validateBody } from "../middleware/validate.js";
import { signupSchema, loginSchema } from "../validators/authValidator.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import "../config/passport.js";

const router = express.Router();

router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", validateBody(loginSchema), login);

router.get("/me", protect, me);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false, }));

router.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google", { session: false }, (err, user, info) => {
            if (err) {
                return res.status(500).send(`Authentication Error: ${err.message}`);
            }
            if (!user) {
                return res.status(401).send("Authentication Failed: No user returned");
            }

            // User found, generate token
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            // Redirect to frontend with token
            res.redirect(
                `http://localhost:5173/oauth-success?token=${token}`
            );
        })(req, res, next);
    }
);

// GitHub Routes
router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"], session: false })
);

router.get(
    "/github/callback",
    (req, res, next) => {
        passport.authenticate("github", { session: false }, (err, user, info) => {
            if (err) {
                return res.status(500).send(`Authentication Error: ${err.message}`);
            }
            if (!user) {
                return res.status(401).send("Authentication Failed: No user returned");
            }

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
        })(req, res, next);
    }
);

export default router;