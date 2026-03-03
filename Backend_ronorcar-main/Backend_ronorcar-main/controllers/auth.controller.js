import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { userService } from '../lib/simpleDatabase.js';

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
        // Check if the input matches email
        const user = await userService.findByEmail(usernameOrEmail);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Update last login
        await userService.update(user.id, { lastLogin: new Date() });

        // Create JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                isAdmin: user.isAdmin 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '7d' }
        );

        // Set HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin
            }
        });
    } catch (err) {
        console.error("Login failed:", err);
        res.status(500).json({ message: "Failed to login, please try again!" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: "Logout successful" });
    } catch (err) {
        console.error("Logout failed:", err);
        res.status(500).json({ message: "Failed to logout, please try again!" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userService.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (err) {
        console.error("Get profile failed:", err);
        res.status(500).json({ message: "Failed to get profile, please try again!" });
    }
};
