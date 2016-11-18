const EVENT_TYPES = [
  "MOUSEDOWN", "MOUSEUP", "MOUSEOVER", "MOUSEOUT", "MOUSEMOVE", "MOUSEDRAG", "CLICK", 
  "DBLCLICK", "KEYDOWN", "KEYUP", "KEYPRESS", "DRAGDROP", "FOCUS", "BLUR", "SELECT", 
  "CHANGE"
];

window.onload = () => {
  init();
};

const init = () => {
  listenForEvents();
};

const listenForEvents = () => {
  console.log('Listening for events');

  EVENT_TYPES.forEach( type => {
    document.body(type, eventHandler.bind(null, type));
  });
};

const eventHandler = (type, e) => {
  console.log('[MIRROR]', type);
  console.log(e.screenX, e.screenY, e.target);
};