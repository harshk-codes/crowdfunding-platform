// Backend Code: Express Controllers with JWT and Prisma
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Signup Controller        
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // console.log(name,email,password);
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email is already in use.',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await prisma.user.create({
            data: {
                username: name,
                email,
                password: hashedPassword
            },
        });
        // Return success response
        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong.',
        });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email},process.env.JWT_SECRET, {
            expiresIn: '2d', // Token expires in 2 days
        });

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong.',
        });
    }
};

module.exports = { login, signup };