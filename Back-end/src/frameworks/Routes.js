const { Router } = require("express");
const UserController = require("../adapters/controllers/UserController");
const Authenticate = require("./AuthenticateToken");
const EventController = require("../adapters/controllers/EventController");
const SubscriptionController = require("../adapters/controllers/SubscriptionController");
const Authorize = require("./AuthorizeUser");

const routes = Router();

/* User Routes */
routes.get("/user/all", UserController.getAllUsers);
routes.post("/user/register", UserController.registerUser);
routes.post("/user/login", UserController.loginUser);
routes.post("/user/logout", UserController.logoutUser);

/* Event Routes */
routes.get("/event/all", EventController.getAllEvents);
routes.get("/event/:id", EventController.getEventById);

/* Subscription Routes */
routes.post("/subscription/signup", Authenticate,SubscriptionController.signUp);
routes.get("/subscription/all", SubscriptionController.getAllSubscriptions);
routes.get("/subscription/:id", SubscriptionController.getSubscriptionById);
routes.get("/subscription/user/:userId", SubscriptionController.getUserEvents);
routes.get("/subscription/event/:eventId", SubscriptionController.getSubscriptionsByEvent);
routes.delete("/subscription/:id", Authenticate, SubscriptionController.deleteSubscription);

/* Authenticate Routes */
routes.post(
  "/auth/profile",
  Authenticate,
  Authorize("user"),
  UserController.profileUser
);

routes.post(
  "/auth/admin",
  Authenticate,
  Authorize("admin"),
  UserController.adminUser
);

module.exports = routes;
