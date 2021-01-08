import * as aa from "../lib/Includer";
import { Vector2 } from "three";
import UKF from "../lib/util/UKF";

class Try_UKF {
  constructor() {
    aa.ev.add_listener(aa.Constants.EVENT.MOUSE.MOVE, this.on_mousemove);
    this.ukf = new UKF(0.15, 0.15);
  }

  update = () => {
    // if (this.count < 10) {
    // if (this.once) {
    // if (true) {
    if (this.flag) {
      const point = new Vector2(this.mouseX, this.mouseY);
      // const point = new Vector2(300, 300);

      console.log("INPUT: ", point.x, point.y);

      this.ukf.update(point);
      this.est = this.ukf.get_estimation();

      console.log("result: ", this.est.x, this.est.y);
      console.log("");
      console.log("");
      console.log("");

      if (Number.isNaN(this.est.x) || Number.isNaN(this.est.y)) {
        this.flag = false;
      }
      this.count++;
      this.once = false;
    }
  };

  draw = () => {
    aa.draw_circle(this.est.x, this.est.y, 0, 20, {
      col: new aa.RGBA(255, 0, 0, 255),
    });

    aa.log.draw_string(
      "x:" + this.est.x + " y:" + this.est.y,
      this.mouseX,
      this.mouseY
    );
  };

  on_mousemove = (arg) => {
    this.mouseX = arg.val.canvas.x / aa.Globals.DPR;
    this.mouseY = arg.val.canvas.y / aa.Globals.DPR;
  };

  ukf;
  est = new Vector2(0, 0);
  mouseX = 0;
  mouseY = 0;

  once = true;
  count = 0;
  flag = true;
}

export default Try_UKF;
