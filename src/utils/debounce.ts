export const debounce = (() => {
  let timer;

  return function (handler: TimerHandler, time: number = 200) {
    clearTimeout(timer);
    timer = window.setTimeout(handler, time);
  };
})();