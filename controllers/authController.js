const bcrypt = require('bcryptjs');
const options = require('../utils/jwt');
const User = require('../models/userModel');

class AuthController {
  // Register a new user
  createUser = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }

      // Create a new user
      const newUser = new User({ name, email, password });
      await newUser.save();

      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // Admin or user login
  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Find user by email and select password
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare provided password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token
      const token = options(user._id,res);

      
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AuthController();
