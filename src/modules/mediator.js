export const EVENTS = {
  TODO_STATE_UPDATED: "TODO_STATE_UPDATED"
};

const listeners = {};
export const on = (event, callback) => {
  if (listeners.hasOwnProperty(event)) {
    listeners[event].push(callback);
    return;
  }
  listeners[event] = [].concat(callback);
};

export const off = event => {
  if (!listeners.hasOwnProperty(event)) {
    console.error(`${event} not registered`);
    return;
  }
  delete listeners[event];
};

export const emit = (event, ...params) => {
  if (!listeners.hasOwnProperty(event)) {
    console.error(`${event} not registered`);
    return;
  }
  // console.log("params", params);
  for (const fn of listeners[event]) {
    fn.apply(this, params);
  }
};

// EventEmitter.on("e1", () => console.log("ev1 called"));
// EventEmitter.on("e1", () => console.log("ev1.1 called"));
// EventEmitter.on("e2", () => console.log("ev2 called"));
// EventEmitter.on("e3", (param1, param2, param3) =>
//   console.log("ev3 called", param1, param2, param3)
// );

// EventEmitter.off("e3");

// EventEmitter.emit("e3", "a", "b", "c");
// EventEmitter.emit("e1");
