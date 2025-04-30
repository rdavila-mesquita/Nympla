class EventRepository {
  constructor(database) {
    this.database = database;
  }

  async getAllEvents() {
    try {
      const query = "select * from events";
      const reply = await this.database.query(query);

      return reply.rows;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getEventById(id){
    try{
      const query = "select * from events where id = $1";
      const reply = await this.database.query(query, [id]);


      if(reply.rows.length === 0)
        return { error: "Event not found!" }

      return reply.rows[0];
    } catch (error) {
      return { error: error.message };
    }
   
  }
}

module.exports = EventRepository;
