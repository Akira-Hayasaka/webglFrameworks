import Constants from "../Constants";
import Globals from "../Globals";
import { debounce } from "../util/Util";
import ev from "../util/Event";

class Screen_Logger {
  constructor() {
    this.canvas_elm = document.createElement("CANVAS");
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
    this.canvas_elm.style.backgroundColor = "transparent";
    this.canvas_elm.style.position = "absolute";
    this.canvas_elm.style.left = `${Globals.APP_X}px`;
    this.canvas_elm.style.top = `${Globals.APP_Y}px`;
    this.canvas_elm.style.zIndex = "10";
    this.canvas_elm.width = Globals.APP_W;
    this.canvas_elm.height = Globals.APP_H;
  };

  draw_string = (str, x, y) => {
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
    console.log("msg", str);
    this.msgs.push({ born_time: Globals.ELAPSED_TIME, msg: str });
  };

  flush_scrn = () => {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.msgs.forEach((arg, i) => {
      const y = Globals.APP_H - 10 - i * 15;
      this.draw_string(arg.msg, 10, y);
    });
    this.msgs = this.msgs.filter(
      (arg) => Globals.ELAPSED_TIME - arg.born_time < this.expire_sec
    );
  };

  ctx;
  canvas_elm;

  margin = 2;

  msgs = [];
  expire_sec = 2.0;
}

let s_logger = null;

const make_new_if_necessary = () => {
  if (s_logger === null) {
    s_logger = new Screen_Logger();
  }
};

const s_log = {
  draw_string: (str, x, y) => {
    make_new_if_necessary();
    s_logger.draw_string(str, x, y);
  },
  push: (str) => {
    make_new_if_necessary();
    s_logger.push(str);
  },
  flush_scrn: () => {
    make_new_if_necessary();
    s_logger.flush_scrn();
  },
};

export default s_log;
