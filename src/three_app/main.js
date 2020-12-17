import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import * as AA from "./lib/Includer";
import App from "./App";

class Main {
  constructor(props) {
    this.props = props;

    AA.Globals.DPR = window.devicePixelRatio;
    AA.Globals.CONTAINER = props.container;
    AA.Globals.CANVAS = props.canvas;

    AA.Globals.RENDERER = new THREE.WebGLRenderer({
      canvas: AA.Globals.CANVAS,
      alpha: true,
      antialias: true,
    });
    AA.Globals.RENDERER.autoClear = false;

    this.fix_global_resolusion_params();
    this.initial_app_width = AA.Globals.APP_W;
    this.initial_app_height = AA.Globals.APP_H;

    AA.init_easy_draw_env();
    AA.init_screen_logger(true);
    AA.register_key_event(document);
    AA.register_mouse_event(AA.Globals.CONTAINER);
    AA.register_touch_event(AA.Globals.CONTAINER);

    this.app = new App();
    AA.ev.add_listener(AA.Constants.EVENT.KEY.PRESSED, this.app.on_keypressed);
    AA.ev.add_listener(
      AA.Constants.EVENT.KEY.RELEASED,
      this.app.on_keyreleased
    );
    AA.ev.add_listener(AA.Constants.EVENT.MOUSE.CLICK, this.app.on_mouseclick);
    AA.ev.add_listener(
      AA.Constants.EVENT.MOUSE.DBLCLICK,
      this.app.on_mousedblclick
    );
    AA.ev.add_listener(AA.Constants.EVENT.MOUSE.DOWN, this.app.on_mousedown);
    AA.ev.add_listener(AA.Constants.EVENT.MOUSE.MOVE, this.app.on_mousemove);
    AA.ev.add_listener(AA.Constants.EVENT.MOUSE.UP, this.app.on_mouseup);
    AA.ev.add_listener(AA.Constants.EVENT.TOUCH.TAP, this.app.on_tap);
    AA.ev.add_listener(AA.Constants.EVENT.TOUCH.DBLTAP, this.app.on_dbltap);
    AA.ev.add_listener(AA.Constants.EVENT.TOUCH.PAN, this.app.on_pan);
    AA.ev.add_listener(AA.Constants.EVENT.TOUCH.SWIPE, this.app.on_swipe);
    AA.ev.add_listener(AA.Constants.EVENT.TOUCH.PRESS, this.app.on_press);
    AA.ev.add_listener(AA.Constants.EVENT.TOUCH.PINCH, this.app.on_pinch);
    AA.ev.add_listener(AA.Constants.EVENT.TOUCH.ROTATE, this.app.on_rotate);

    this.stats = new Stats();
    this.stats.showPanel(0);
    Object.assign(this.stats.dom.style, {
      position: "fixed",
      height: "max-content",
      left: "auto",
      right: 0,
    });
    AA.Globals.CONTAINER.appendChild(this.stats.dom);

    for (const [key, value] of Object.entries(AA.Globals)) {
      console.log(`${key}: ${value}`);
    }

    this.update();
  }

  update = (time) => {
    this.stats.begin();

    if (this.start === undefined) this.start = time;
    else AA.Globals.ELAPSED_TIME = (time - this.start) * 0.001;

    if (this.does_need_resizing()) {
      this.fix_global_resolusion_params();
      // need to debounce on reciever
      AA.s_log.push("resizing"); // <= dangerously put
      AA.ev.notify(AA.Constants.WINDOW_RESIZED_EVENT);
    }

    AA.s_log.flush_scrn();
    AA.Globals.RENDERER.clear();
    AA.reset_easy_draw_loop();
    this.put_screen_related_log_on_screen();
    this.app.update();
    this.app.draw();
    AA.render_easy_draw_scene();
    this.stats.end();

    requestAnimationFrame(this.update);
  };

  does_need_resizing = () => {
    return (
      AA.Globals.CANVAS.width !==
        Math.round(AA.Globals.CANVAS.clientWidth * AA.Globals.DPR) ||
      AA.Globals.CANVAS.height !==
        Math.round(AA.Globals.CANVAS.clientHeight * AA.Globals.DPR)
    );
  };

  fix_global_resolusion_params = () => {
    AA.Globals.APP_W = Math.round(
      AA.Globals.CANVAS.clientWidth * AA.Globals.DPR
    );
    AA.Globals.APP_H = Math.round(
      AA.Globals.CANVAS.clientHeight * AA.Globals.DPR
    );
    AA.Globals.APP_X = AA.Globals.CANVAS.getBoundingClientRect().x;
    AA.Globals.APP_Y = AA.Globals.CANVAS.getBoundingClientRect().y;
    AA.Globals.APP_RECT = new AA.Rectangle(
      AA.Globals.APP_X,
      AA.Globals.APP_Y,
      AA.Globals.APP_W,
      AA.Globals.APP_H
    );
    AA.Globals.APP_DEVICE_W = AA.Globals.CANVAS.clientWidth;
    AA.Globals.APP_DEVICE_H = AA.Globals.CANVAS.clientHeight;
    AA.Globals.APP_DEVICE_RECT = new AA.Rectangle(
      AA.Globals.APP_X,
      AA.Globals.APP_Y,
      AA.Globals.APP_DEVICE_W,
      AA.Globals.APP_DEVICE_H
    );
    AA.Globals.APP_WINRESIZE_DIFFX = AA.Globals.APP_W - this.initial_app_width;
    AA.Globals.APP_WINRESIZE_DIFFY = AA.Globals.APP_H - this.initial_app_height;
    AA.Globals.RENDERER.setSize(AA.Globals.APP_W, AA.Globals.APP_H, false);
  };

  put_screen_related_log_on_screen = () => {
    AA.s_log.draw_string(
      "client w:" +
        AA.Globals.CANVAS.clientWidth +
        " client h:" +
        AA.Globals.CANVAS.clientHeight,
      10,
      20
    );
    AA.s_log.draw_string(
      "canvas w:" +
        AA.Globals.CANVAS.width +
        " canvas h:" +
        AA.Globals.CANVAS.height,
      10,
      35
    );
    AA.s_log.draw_string("px ratio:" + window.devicePixelRatio, 10, 50);
    AA.s_log.draw_string(
      "APP_W:" + AA.Globals.APP_W + " APP_H:" + AA.Globals.APP_H,
      10,
      65
    );
  };

  props;
  initial_app_width;
  initial_app_height;
  app;
  start;
  stats;
}

export default Main;
