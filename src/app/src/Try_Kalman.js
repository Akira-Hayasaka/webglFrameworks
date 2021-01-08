import * as aa from "../lib/Includer";
import { Vector2 } from "three";
import KalmanFilter from "kalmanjs";

class Try_Kalman {
  constructor() {
    aa.ev.add_listener(aa.Constants.EVENT.MOUSE.MOVE, this.on_mousemove);
    const r = 0.01;
    this.kfx = new KalmanFilter({ R: r });
    this.kfy = new KalmanFilter({ R: r });
  }

  update = () => {
    this.est = new Vector2(
      this.kfx.filter(this.mouseX),
      this.kfy.filter(this.mouseY)
    );
  };

  draw = () => {
    aa.draw_circle(this.est.x, this.est.y, 0, 20, {
      col: new aa.RGBA(255, 0, 0, 255),
    });

    aa.log.draw_string(
      "x:" + this.est.x + " y:" + this.est.y,
      this.mouseX / aa.Globals.DPR,
      this.mouseY / aa.Globals.DPR
    );
  };

  on_mousemove = (arg) => {
    this.mouseX = arg.val.canvas.x;
    this.mouseY = arg.val.canvas.y;
  };

  kfx;
  kfy;
  est = new Vector2(0, 0);
}

export default Try_Kalman;
