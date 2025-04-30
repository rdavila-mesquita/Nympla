const database = require("../../frameworks/PgDatabase");
const UserService = require("../../services/UserService");
const UserRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");

const userRepository = new UserRepository(database);

/* 
  Return all users from the Database 
*/
async function getAllUsers(request, reply) {
  const service = new UserService(userRepository);
  const replyService = await service.getAllUsers();

  if (replyService.error)
    return reply.status(500).json({ error: replyService.error });

  reply.status(200).json({ users: replyService });
}

/* 
  Register a user in the Database 
*/
async function registerUser(request, reply) {
  const data = request.body;

  const service = new UserService(userRepository);
  const replyService = await service.registerUser(data);

  if (replyService.error)
    return reply.status(500).json({ error: replyService.error });

  reply.status(201).json({ status: replyService });
}

async function loginUser(request, reply) {
  const dataLogin = request.body;

  const service = new UserService(userRepository);
  const replyService = await service.autenticateUser(dataLogin);

  if (replyService.error)
    return reply.status(replyService.code).json({ error: replyService.error });

  const payload = {
    userId: replyService.user.id,
    userRole: replyService.user.role,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5m" });

  let redirect = "";
  if (replyService.user.role == "admin") redirect = "admin.html";
  else redirect = "profile.html";

  reply.status(200).json({ token, redirect });
  
}

async function logoutUser(request, reply) {

  let redirect = "login.html";

  reply.status(200).json({ redirect });
}

async function profileUser(request, reply) {
  try {
    const { userId, userRole } = request.user;
    reply.status(200).json({ userId, userRole });
  } catch (error) {
    console.error("Erro no profileUser:", error);
    reply.status(500).json({ error: "Erro ao carregar perfil." });
  }
}


async function adminUser(request, reply) {
  try {
    const { userId, userRole } = request.user;
    reply.status(200).json({ userId, userRole });
  } catch (error) {
    console.error("Erro no profileUser:", error);
    reply.status(500).json({ error: "Erro ao carregar perfil." });
  }
}

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  profileUser,
  adminUser,
};
