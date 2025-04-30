const database = require("../../frameworks/PgDatabase");
const SubscriptionService = require("../../services/SubscriptionService");
const SubscriptionRepository = require("../repositories/SubscriptionRepository");


const subscriptionRepository = new SubscriptionRepository(database);


async function signUp(request, reply) {
  const { eventId } = request.body;
  
  const userId = request.user.userId; 

  const service = new SubscriptionService(subscriptionRepository);

  const replyService = await service.signUp({ userId, eventId });

  if (replyService.error)
    return reply.status(500).json({ error: replyService.error });

  reply.status(201).json({ status: replyService });
}

async function getAllSubscriptions(request, reply) {
  const service = new SubscriptionService(subscriptionRepository);
  const replyService = await service.getAllSubscriptions();


  if (replyService.error) {
    return reply.status(500).json({ error: replyService.error });
  }


  reply.status(200).json({ subscriptions: replyService });
}


async function getSubscriptionById(request, reply) {
  const { id } = request.params;
  const service = new SubscriptionService(subscriptionRepository);


  const replyService = await service.getSubscriptionById(id);


  if (replyService.error) {
    return reply.status(404).json({ error: replyService.error });
  }


  reply.status(200).json({ subscriptions: replyService });
}


async function getUserEvents(request, reply) {
  const { userId } = request.params;
  const service = new SubscriptionService(subscriptionRepository);


  const replyService = await service.getUserEvents(userId);


  if (replyService.error) {
    return reply.status(404).json({ error: replyService.error });
  
}
reply.status(200).json({ userEvents: replyService });
}

async function getSubscriptionsByEvent(request, reply) {
  const { eventId } = request.params;
  const service = new SubscriptionService(subscriptionRepository);


  const replyService = await service.getSubscriptionsByEvent(eventId);


  if (replyService.error) {
    return reply.status(404).json({ error: replyService.error });
    
}
reply.status(200).json({ subscriptions: replyService });
}

async function deleteSubscription(request, reply) {
  const { id } = request.params;
  const service = new SubscriptionService(subscriptionRepository);


  const replyService = await service.deleteSubscription(id);


  if (replyService.error) {
    return reply.status(404).json({ error: replyService.error });
  }


  reply.status(200).json({ subscriptions: replyService });
}



module.exports = {
  signUp,
  getAllSubscriptions,
  getSubscriptionById,
  getUserEvents,
  deleteSubscription,
  getSubscriptionsByEvent
}
