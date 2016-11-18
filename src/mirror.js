const EVENT_TYPES = [
  "CLICK", "DBLCLICK", "KEYDOWN", "KEYUP", "KEYPRESS", "DRAGDROP", "FOCUS", "BLUR", "SELECT", "CHANGE"
];

const MOUSE_EVENTS = [
  "MOUSEDOWN", "MOUSEUP", "MOUSEOVER", "MOUSEOUT", "MOUSEMOVE", "MOUSEDRAG",
];

let socket;
let id = 0;

window.onload = () => {
  init();
};

const init = () => {
  recurseAllDomElements(document.body, visitNode);
  socket = io('http://localhost:3000/');
  socket.on('event', (event) => {
    console.log('Event from another client', event);

    const newEvent = new CustomEvent(event.type.toLowerCase());
    document.getElementById(event.id).dispatchEvent(newEvent);
  });

  console.log(socket);
  listenForEvents();
};

const listenForEvents = () => {
  console.log('Listening for events');

  EVENT_TYPES.forEach( type => {
    console.log(type);
    document.body.addEventListener(type.toLowerCase(), eventHandler.bind(null, type));
  });
};

const eventHandler = (type, e) => {
  console.log('[MIRROR]', type);
  console.log(e.target);

  // We can only send if it has an id
  if (e.target.id) {
    socket.emit('event', { type, target: e.target.tagName, id: e.target.id });
  }
};

/**
 * Recurse through all DOM elements and perform some function on them
 */
const recurseAllDomElements = (node, func) => {
  const children = Array.from(node.children);

  // Perform function
  func(node);

  if (children) {
    children.forEach( child => {
      recurseAllDomElements(child, func);
    });
  }
};

const visitNode = (node) => {
  if (node.tagName === 'BUTTON' ||
      node.tagName === 'A') {
    node.id = generateUniqueId(node);
  }
};

const generateUniqueId = (node) => {
  return id++;
};












