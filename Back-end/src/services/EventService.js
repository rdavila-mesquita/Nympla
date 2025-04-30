class EventService {
  constructor(eventRepository) {
    this.eventRepository = eventRepository;
  }

  async getAllEvents() {
    return await this.eventRepository.getAllEvents();
  }
  async getEventById(id) {
    return await this.eventRepository.getEventById(id);
  }
}

module.exports = EventService;
