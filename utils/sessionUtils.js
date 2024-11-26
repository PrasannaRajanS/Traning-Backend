const { v4: uuidv4 } = require('uuid');

class SessionGenerater {

generateSessionId = () => {
  return uuidv4(); // Generate a unique session ID
};

}

module.exports = new SessionGenerater
