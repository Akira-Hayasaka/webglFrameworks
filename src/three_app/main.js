import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import * as aa from "./lib/Includer";
import App from "./App";

class Main {
  constructor(props) {
    this.props = props;

    aa.Globals.DPR = window.devicePixelRatio;
    aa.Globals.CONTAINER = props.container;
    aa.Globals.CANVAS = props.canvas;

    aa.Globals.RENDERER = new THREE.WebGLRenderer({
      canvas: aa.Globals.CANVAS,
      alpha: true,
      antialias: true,
    });
    aa.Globals.RENDERER.autoClear = false;
    aa.Globals.RENDERER.setClearColor(0x000000, 0);

    this.fix_global_resolusion_params();
    this.initial_app_width = aa.Globals.APP_W;
    this.initial_app_height = aa.Globals.APP_H;

    aa.init_easy_draw_env();
    aa.init_screen_logger(true);
    aa.register_key_event(document);
    aa.register_mouse_event(aa.Globals.CONTAINER);
    aa.register_touch_event(aa.Globals.CONTAINER);

    this.app = new App();
    aa.ev.add_listener(aa.Constants.EVENT.KEY.PRESSED, this.app.on_keypressed);
    aa.ev.add_listener(
      aa.Constants.EVENT.KEY.RELEASED,
      this.app.on_keyreleased
    );
    aa.ev.add_listener(aa.Constants.EVENT.MOUSE.CLICK, this.app.on_mouseclick);
    aa.ev.add_listener(
      aa.Constants.EVENT.MOUSE.DBLCLICK,
      this.app.on_mousedblclick
    );
    aa.ev.add_listener(aa.Constants.EVENT.MOUSE.DOWN, this.app.on_mousedown);
    aa.ev.add_listener(aa.Constants.EVENT.MOUSE.MOVE, this.app.on_mousemove);
    aa.ev.add_listener(aa.Constants.EVENT.MOUSE.UP, this.app.on_mouseup);
    aa.ev.add_listener(aa.Constants.EVENT.TOUCH.TAP, this.app.on_tap);
    aa.ev.add_listener(aa.Constants.EVENT.TOUCH.DBLTAP, this.app.on_dbltap);
    aa.ev.add_listener(aa.Constants.EVENT.TOUCH.PAN, this.app.on_pan);
    aa.ev.add_listener(aa.Constants.EVENT.TOUCH.SWIPE, this.app.on_swipe);
    aa.ev.add_listener(aa.Constants.EVENT.TOUCH.PRESS, this.app.on_press);
    aa.ev.add_listener(aa.Constants.EVENT.TOUCH.PINCH, this.app.on_pinch);
    aa.ev.add_listener(aa.Constants.EVENT.TOUCH.ROTATE, this.app.on_rotate);

    this.stats = new Stats();
    this.stats.showPanel(0);
    Object.assign(this.stats.dom.style, {
      position: "fixed",
      height: "max-content",
      left: "auto",
      right: 0,
    });
    aa.Globals.CONTAINER.appendChild(this.stats.dom);

    for (const [key, value] of Object.entries(aa.Globals)) {
      console.log(`${key}: ${value}`);
    }

    this.update();
  }

  update = (time) => {
    this.stats.begin();

    aa.TWEEN.update(time);
    if (this.start_time === undefined) this.start_time = time;
    else aa.Globals.ELAPSED_TIME = (time - this.start_time) * 0.001;

    if (this.does_need_resizing()) {
      this.fix_global_resolusion_params();
      // need to debounce on reciever
      aa.draw_canvas_string.push("resizing"); // <= dangerously put
      aa.ev.notify(aa.Constants.WINDOW_RESIZED_EVENT);
    }

    aa.draw_canvas_string.flush_scrn();
    aa.Globals.RENDERER.clear();
    aa.reset_easy_draw_loop();
    this.put_screen_related_log_on_screen();
    this.app.update();
    this.app.draw();
    aa.render_easy_draw_scene();

    this.stats.end();

    requestAnimationFrame(this.update);
  };

  does_need_resizing = () => {
    return (
      aa.Globals.CANVAS.width !==
        Math.round(aa.Globals.CANVAS.clientWidth * aa.Globals.DPR) ||
      aa.Globals.CANVAS.height !==
        Math.round(aa.Globals.CANVAS.clientHeight * aa.Globals.DPR)
    );
  };

  fix_global_resolusion_params = () => {
    aa.Globals.APP_W = Math.round(
      aa.Globals.CANVAS.clientWidth * aa.Globals.DPR
    );
    aa.Globals.APP_H = Math.round(
      aa.Globals.CANVAS.clientHeight * aa.Globals.DPR
    );
    aa.Globals.APP_X = aa.Globals.CANVAS.getBoundingClientRect().x;
    aa.Globals.APP_Y = aa.Globals.CANVAS.getBoundingClientRect().y;
    aa.Globals.APP_RECT = new aa.Rectangle(
      aa.Globals.APP_X,
      aa.Globals.APP_Y,
      aa.Globals.APP_W,
      aa.Globals.APP_H
    );
    aa.Globals.APP_DEVICE_W = aa.Globals.CANVAS.clientWidth;
    aa.Globals.APP_DEVICE_H = aa.Globals.CANVAS.clientHeight;
    aa.Globals.APP_DEVICE_RECT = new aa.Rectangle(
      aa.Globals.APP_X,
      aa.Globals.APP_Y,
      aa.Globals.APP_DEVICE_W,
      aa.Globals.APP_DEVICE_H
    );
    aa.Globals.APP_WINRESIZE_DIFFX = aa.Globals.APP_W - this.initial_app_width;
    aa.Globals.APP_WINRESIZE_DIFFY = aa.Globals.APP_H - this.initial_app_height;
    aa.Globals.RENDERER.setSize(aa.Globals.APP_W, aa.Globals.APP_H, false);
  };

  put_screen_related_log_on_screen = () => {
    aa.draw_canvas_string.draw_string(
      "client w:" +
        aa.Globals.CANVAS.clientWidth +
        " client h:" +
        aa.Globals.CANVAS.clientHeight,
      10,
      20
    );
    aa.draw_canvas_string.draw_string(
      "canvas w:" +
        aa.Globals.CANVAS.width +
        " canvas h:" +
        aa.Globals.CANVAS.height,
      10,
      35
    );
    aa.draw_canvas_string.draw_string(
      "px ratio:" + window.devicePixelRatio,
      10,
      50
    );
    aa.draw_canvas_string.draw_string(
      "APP_W:" + aa.Globals.APP_W + " APP_H:" + aa.Globals.APP_H,
      10,
      65
    );
  };

  props;
  initial_app_width;
  initial_app_height;
  app;
  start_time;
  stats;
}

export default Main;
