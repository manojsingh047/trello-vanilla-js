/*Debouncing with closure */

export const debounce = (fn, delay) => {
  let timer;
  return function() {
    let args = arguments;
    let context = this;

    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

/*Crude debouncing */

// let timer;
// export const debounce = (fn, delay) => {
//   let args = arguments;
//   let context = this;

//   clearTimeout(timer);
//   timer = setTimeout(() => {
//     fn.apply(context, args);
//   }, delay);
// };
