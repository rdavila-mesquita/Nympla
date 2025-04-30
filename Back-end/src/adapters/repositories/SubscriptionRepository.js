class SubscriptionRepository {
    constructor(database) {
      this.database = database;
    }


    async signUp(subscription) {
      try {
        const data = [subscription.user_id, subscription.event_id];
        const query =
          "insert into subscriptions(user_id, event_id)" +
          "values($1, $2) returning *";
  
        const reply = await this.database.query(query, data);
  
        return reply.rows;
      } catch (error) {
        return { error: error.message };
      }
    }
 
    async getAllSubscriptions() {
      try {
        const query = "select * from subscriptions";
        const reply = await this.database.query(query);
 
        return reply.rows;
      } catch (error) {
        return { error: error.message };
      }
    }


    async getSubscriptionById(id){
      try{
        const query = "select * from subscriptions where id = $1";
        const reply = await this.database.query(query, [id]);


        if(reply.rows.length === 0)
          return { error: "Subscription not found!" }
 
        return reply.rows[0];
      } catch (error) {
        return { error: error.message };
      }
     
    }


    async getUserEvents(userId) {
      try {
    
        const query = `
          select events.event_name, events.image_url, events.date, subscriptions.id
          from subscriptions
          join events ON subscriptions.event_id = events.id
          where subscriptions.user_id = $1;
        `;
    
        const reply = await this.database.query(query, [userId]);
    
    
        if (reply.rows.length === 0)
          return { error: "User events not found!" };
    
        return reply.rows;
      } catch (error) {
        return { error: error.message };
      }
    }
    

    async getSubscriptionsByEvent(eventId) {
      try{
        const query =
        `
          select events.event_name, subscriptions.id, users.name, subscriptions.check_in
          from subscriptions
          join events ON subscriptions.event_id = events.id
          join users ON subscriptions.user_id = users.id
          where subscriptions.event_id = $1;
        `
        ;
        const reply = await this.database.query(query, [eventId]);

        if(reply.rows.length === 0)
          return { error: "Events not found!" }
 
        return reply.rows;
      } catch (error) {
        return { error: error.message };
      }
    }

  async deleteSubscription(id){
    try{
      const query = "delete from subscriptions where id = $1 returning *";
      const reply = await this.database.query(query, [id]);


      if(reply.rows.length === 0)
        return { error: "Subscription not found!" }


      return reply.rows[0];
    } catch (error) {
      return { error: error.message };
    }
    }


}

 
  module.exports = SubscriptionRepository;