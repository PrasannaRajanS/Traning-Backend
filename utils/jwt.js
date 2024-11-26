const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: `${process.env.COOKIE_EXPIRES_TIME}d` } // Token expiration time
  );
};

const options = (user, res) => {
  const token = generateToken(user._id); // This will Generate JWT token
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  };

  // Send the response with the token and user details
  res.cookie('token', token, cookieOptions).status(200).json({
    message: 'Login successful',
    name: user.name, 
    role: user.role
  });

  return token; 
};

module.exports = options;
