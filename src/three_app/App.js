import General_Tweak from "./src/General_Tweak";

class App {
  constructor() {
    this.gt = new General_Tweak();
  }

  update = () => {
    this.gt.update();
  };

  draw = () => {
    this.gt.draw();
  };

  on_keypressed = (arg) => {
    this.gt.on_keypressed(arg);
  };
  on_keyreleased = (arg) => {};
  on_mouseclick = (arg) => {};
  on_mousedblclick = (arg) => {};
  on_mousedown = (arg) => {};
  on_mousemove = (arg) => {};
  on_mouseup = (arg) => {};
  on_tap = (arg) => {};
  on_dbltap = (arg) => {};
  on_pan = (arg) => {};
  on_swipe = (arg) => {};
  on_press = (arg) => {};
  on_pinch = (arg) => {};
  on_rotate = (arg) => {};

  gt;
}

export default App;
