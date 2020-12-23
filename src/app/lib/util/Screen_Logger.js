import Constants from "../Constants";
import Globals from "../Globals";
import { debounce } from "../util/Util";
import ev from "../event/Event";

class Screen_Logger {
  constructor(b_debug) {
    this.b_debug = b_debug;
    if (!this.b_debug) return;

    this.canvas_elm = document.createElement("CANVAS");
    this.canvas_elm.id = "screen_logger";
    this.setup_elm_style();
    Globals.CONTAINER.appendChild(this.canvas_elm);
    this.ctx = this.canvas_elm.getContext("2d");

    ev.add_listener(
      Constants.WINDOW_RESIZED_EVENT,
      debounce(() => {
        this.setup_elm_style();
      }, Constants.DEFAULT_WINDOW_RESIZE_DEBOUNCE_MSEC)
    );
  }

  setup_elm_style = () => {
    if (!this.b_debug) return;
    this.canvas_elm.style.backgroundColor = "transparent";
    this.canvas_elm.style.position = "absolute";
    this.canvas_elm.style.left = `${Globals.APP_X / Globals.DPR}px`;
    this.canvas_elm.style.top = `${Globals.APP_Y / Globals.DPR}px`;
    this.canvas_elm.style.zIndex = "10";
    this.canvas_elm.width = Globals.APP_W / Globals.DPR;
    this.canvas_elm.height = Globals.APP_H / Globals.DPR;
  };

  draw_string = (str, x, y) => {
    if (!this.b_debug) return;
    const met = this.ctx.measureText(str);
    const width = met.actualBoundingBoxRight - met.actualBoundingBoxLeft;
    const height = met.actualBoundingBoxAscent + met.actualBoundingBoxDescent;
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(
      x - this.margin,
      y - this.margin - height,
      width + this.margin * 2,
      height + this.margin * 2
    );
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillText(str, x, y);
    this.ctx.fillStyle = "#000000";
  };

  push = (str) => {
    if (!this.b_debug) return;
    this.msgs.push({ born_time: Globals.ELAPSED_TIME, msg: str });
  };

  flush_scrn = () => {
    if (!this.b_debug) return;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.msgs.forEach((arg, i) => {
      const y = Globals.APP_H / Globals.DPR - 10 - i * 15;
      this.draw_string(arg.msg, 10, y);
    });
    this.msgs = this.msgs.filter(
      (arg) => Globals.ELAPSED_TIME - arg.born_time < this.expire_sec
    );
  };

  b_debug;

  ctx;
  canvas_elm;

  margin = 2;

  msgs = [];
  expire_sec = 2.0;
}

let s_logger = null;

const log = {
  draw_string: (str, x, y) => {
    s_logger.draw_string(str, x, y);
  },
  push: (str) => {
    s_logger.push(str);
  },
  flush_scrn: () => {
    s_logger.flush_scrn();
  },
};

const init_screen_logger = (b_debug = true) => {
  s_logger = new Screen_Logger(b_debug);
};

export { init_screen_logger, log };
