import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

// generate token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// Signup Controller
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if user exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const hash = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password_hash: hash,
            provider: "local",
        });

        // generate token
        const token = generateToken(user._id);

        res.status(201).json({
            message: "Signup successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                provider: user.provider,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// LOGIN Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        // find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // check if local user
        if (!user.password_hash) {
            return res.status(400).json({
                message: `This email is registered using ${user.provider}. Please login with ${user.provider}.`,
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // generate token
        const token = generateToken(user._id);

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                provider: user.provider,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ME Controller (get current logged-in user)
export const me = async (req, res) => {
    try {
        res.json({
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
