const jwt = require("jsonwebtoken");

function Authenticate(request, reply, nextStage) {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    console.error("Token not found in the request header.");
    return reply.status(401).json({ error: "Token not found!" });
  }

  try {
    const decoder = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Token decoded:", decoder);

    request.user = decoder;  

    nextStage();  
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return reply.status(401).json({ error: `Invalid Token: ${error.message}` });
  }
}

module.exports = Authenticate;
