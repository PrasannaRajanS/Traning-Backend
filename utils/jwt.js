const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ id:userId}, process.env.JWT_SECRET, process.env.COOKIE_EXPIRES_TIME); // expires in 1 days

};

const options = (userId,res) => {
  token = generateToken(userId)
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
    httpOnly:true,
    sameSite:'none',
    secure:true,
    maxAge:24*60*60*1000
}

res.status(200)
      .cookie("token",token,options)
      .json({
        message: 'Login successful',
      });
}

module.exports = options;
