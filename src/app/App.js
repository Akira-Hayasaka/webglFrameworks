import General_Tweak from "./src/General_Tweak";
import Test_Shape from "./src/Test_Shape";
import Try_Shader from "./src/Try_Shader";
import Try_Kalman from "./src/Try_Kalman";

class App {
  constructor() {
    this.gt = new General_Tweak();
    this.ts = new Test_Shape();
    this.shder = new Try_Shader();
    this.kf = new Try_Kalman();
  }

  update = () => {
    this.gt.update();
    this.ts.update();
    this.shder.update();
    this.kf.update();
  };

  draw = () => {
    this.gt.draw();
    this.ts.draw();
    this.shder.draw();
    this.kf.draw();
  };

  on_keypressed = (arg) => {
    if (arg.val === " ") {
      this.witch = !this.witch;
    }
  };
  on_keyreleased = (arg) => {
    this.gt.on_keypressed(arg);
  };
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

  witch = true;

  gt;
  ts;
  kf;
  shder;
}

export default App;
