const database = require("../../frameworks/PgDatabase");
const EventService = require("../../services/EventService");
const EventRepository = require("../repositories/EventRepository");

const eventRepository = new EventRepository(database);

async function getAllEvents(request, reply) {
  const service = new EventService(eventRepository);
  const replyService = await service.getAllEvents();

  if (replyService.error) {
    return reply.status(500).json({ error: replyService.error });
  }

  reply.status(200).json({ events: replyService });
}

async function getEventById(request, reply) {
  const { id } = request.params;
  const service = new EventService(eventRepository);


  const replyService = await service.getEventById(id);


  if (replyService.error) {
    return reply.status(404).json({ error: replyService.error });
  }


  reply.status(200).json({ events: replyService });
}

module.exports = {
  getAllEvents,
  getEventById,
};
