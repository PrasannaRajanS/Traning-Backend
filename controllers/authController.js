const bcrypt = require('bcryptjs');
const options = require('../utils/jwt');
const User = require('../models/userModel');
const { sendLoginEmail, sendLogoutEmail } = require('../utils/emailService');
const { generateSessionId } = require('../utils/sessionUtils');

class AuthController {
  
  createUser = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }

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

  loginUser = async (req, res, next) => {
    try {
      const { email, password, deviceName } = req.body;
  
      const user = await User.findOne({ email }).select('+password');
      const isMatch = (await bcrypt.compare(password, user.password))

      if (!user || !isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      try {
        if (user.session && user.session.sessionId) {
          await sendLogoutEmail(user.email, user.session.deviceName);
        }
      } catch (emailError) {
        console.error('Logout email error:', emailError.message);
      }
  
      user.session = { deviceName, sessionId: generateSessionId() }; // Update session and save user
      await user.save();
  
      // Passing the user object to the options function
      options(user, res);
  
      sendLoginEmail(user.email, deviceName).catch((emailError) =>
        console.error('Login email error:', emailError.message)
      );
    } catch (error) {
      next(error);
    }
  };

}

module.exports = new AuthController();
