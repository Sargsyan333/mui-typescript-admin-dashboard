import eventEmitter from 'events';

class EventEmitter extends eventEmitter {}

const Events = new EventEmitter();
// By default max size of listener (11)
Events.setMaxListeners(Infinity);

export default Events;
