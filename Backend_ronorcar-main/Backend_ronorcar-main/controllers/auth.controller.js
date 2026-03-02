import bcrypt from "bcrypt";
import { userService } from "../lib/database.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
    } = req.body;

    try {
        // Check if email already exists
        const existingUser = await userService.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        
        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user with only the required fields
        const newUser = await userService.create({
            email,
            password: hashPassword,
            firstName,
            lastName,
            isAdmin: false,
            isNormalUser: true,
            emailVerified: false,
            createdAt: new Date(),
            lastLogin: null
        });

        // Remove password from response
        const { password: userPassword, ...userInfo } = newUser;

        res.status(201).json({ message: "User created successfully", user: userInfo });
    } catch (err) {
        console.error("Registration failed:", err);
        res.status(500).json({ message: "Failed to register user, please try again!" });
    }
};

export const login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        // Check if the input matches email (we'll use email for now)
        const user = await userService.findByEmail(usernameOrEmail);

        if (!user) {
            return res.status(401).json({ message: "Invalid email." });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: "7d" } // Token expires in 7 days
        );

        // Remove sensitive information from user object
        const { password: userPassword, ...userInfo } = user;

        // Send token as an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            // secure: true, // Cookie sent only over HTTPS
            // sameSite: "strict" // Cookie is sent only for same-site requests
        }).status(200).json({
            message: "Login successful.",
            user: userInfo // Send user info without password
        });
    } catch (err) {
        console.error("Login failed:", err);
        res.status(500).json({ message: "Failed to log in." });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token").status(200).json({ message: "Logout Successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to log out!" });
    }
};