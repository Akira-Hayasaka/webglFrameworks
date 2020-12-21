import Try_Transparent_RBO_2 from "./src/Try_Transparent_RBO_2";
import General_Tweak from "./src/General_Tweak";

class App {
  constructor() {
    this.gt = new General_Tweak();
    this.ttrbo = new Try_Transparent_RBO_2();
  }

  update = () => {
    this.gt.update();
    this.ttrbo.update();
  };

  draw = () => {
    // if (this.witch) {
    //   this.ttrbo.draw();
    // } else {
    //   this.gt.draw();
    // }
    this.gt.draw();
  };

  on_keypressed = (arg) => {
    if (arg.val === " ") {
      this.witch = !this.witch;
    }
  };
  on_keyreleased = (arg) => {};
  on_mouseclick = (arg) => {};
  on_mousedblclick = (arg) => {};
  on_mousedown = (arg) => {};
  on_mousemove = (arg) => {
    this.ttrbo.on_mousemove(arg);
  };
  on_mouseup = (arg) => {};
  on_tap = (arg) => {};
  on_dbltap = (arg) => {};
  on_pan = (arg) => {};
  on_swipe = (arg) => {};
  on_press = (arg) => {};
  on_pinch = (arg) => {};
  on_rotate = (arg) => {};

  witch = true;

  gt;
  ttrbo;
}

export default App;
