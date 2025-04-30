const Subscription = require("../entities/Subscription")

class SubscriptionService {
    constructor(subscriptionRepository) {
      this.subscriptionRepository = subscriptionRepository;
    }
 
    async signUp(data) {
      console.log(data);
  
      const subscription = new Subscription(data.userId, data.eventId);
  
      return await this.subscriptionRepository.signUp(subscription);
    }
    async getAllSubscriptions() {
      return await this.subscriptionRepository.getAllSubscriptions();
    }
    async getSubscriptionById(id) {
      return await this.subscriptionRepository.getSubscriptionById(id);
    }
    async getUserEvents(userId) {
      return await this.subscriptionRepository.getUserEvents(userId);
    }
    async getSubscriptionsByEvent(eventId) {
      return await this.subscriptionRepository.getSubscriptionsByEvent(eventId);
    }
    async deleteSubscription(id) {
      return await this.subscriptionRepository.deleteSubscription(id);
    }
  }
 
  module.exports = SubscriptionService;