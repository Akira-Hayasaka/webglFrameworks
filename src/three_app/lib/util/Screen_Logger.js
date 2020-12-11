import Globals from "../Globals";

class Screen_Logger {
  constructor() {
    const canvas_elm = document.createElement("CANVAS");
    canvas_elm.style.backgroundColor = "transparent";
    canvas_elm.style.position = "absolute";
    canvas_elm.style.left = `${Globals.APP_X}px`;
    canvas_elm.style.top = `${Globals.APP_Y}px`;
    canvas_elm.style.zIndex = "10";
    canvas_elm.width = Globals.APP_W;
    canvas_elm.height = Globals.APP_H;
    Globals.CONTAINER.appendChild(canvas_elm);
    this.ctx = canvas_elm.getContext("2d");
  }
  ctx;
}

let s_logger = null;

const make_new_if_necessary = () => {
  if (s_logger === null) {
    s_logger = new Screen_Logger();
  }
};

const margin = 2;

const s_log = {
  draw_string: (str, x, y) => {
    make_new_if_necessary();
    const met = s_logger.ctx.measureText(str);
    const width = met.actualBoundingBoxRight - met.actualBoundingBoxLeft;
    const height = met.actualBoundingBoxAscent + met.actualBoundingBoxDescent;
    s_logger.ctx.fillStyle = "#000000";
    s_logger.ctx.fillRect(
      x - margin,
      y - margin - height,
      width + margin * 2,
      height + margin * 2
    );
    s_logger.ctx.fillStyle = "#ffffff";
    s_logger.ctx.fillText(str, x, y);
    s_logger.ctx.fillStyle = "#000000";
  },
  flush_scrn: () => {
    make_new_if_necessary();
    s_logger.ctx.clearRect(
      0,
      0,
      s_logger.ctx.canvas.width,
      s_logger.ctx.canvas.height
    );
  },
};

export default s_log;
