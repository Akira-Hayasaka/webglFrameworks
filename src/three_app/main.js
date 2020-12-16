import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import * as AA from "./lib/Includer";
import App from "./App";

class Main {
  constructor(props) {
    this.props = props;

    AA.Globals.CONTAINER = props.container;
    AA.Globals.CANVAS = props.canvas;

    AA.Globals.RENDERER = new THREE.WebGLRenderer({
      canvas: AA.Globals.CANVAS,
      alpha: true,
      antialias: true,
    });
    AA.Globals.RENDERER.autoClear = false;
    AA.Globals.RENDERER.setClearColor(0x000000, 0);

    this.fix_global_resolusion_params();
    this.initial_app_width = AA.Globals.APP_W;
    this.initial_app_height = AA.Globals.APP_H;

    AA.register_key_event(document);
    AA.register_mouse_event(AA.Globals.CONTAINER);

    this.app = new App();
    AA.ev.add_listener(AA.Constants.KEY_PRESSED_EVENT, this.app.on_keypressed);
    AA.ev.add_listener(
      AA.Constants.KEY_RELEASED_EVENT,
      this.app.on_keyreleased
    );
    AA.ev.add_listener(AA.Constants.MOUSE_CLICK_EVENT, this.app.on_mouseclick);
    AA.ev.add_listener(
      AA.Constants.MOUSE_DBLCLICK_EVENT,
      this.app.on_mousedblclick
    );
    AA.ev.add_listener(AA.Constants.MOUSE_DOWN_EVENT, this.app.on_mousedown);
    AA.ev.add_listener(AA.Constants.MOUSE_MOVE_EVENT, this.app.on_mousemove);
    AA.ev.add_listener(AA.Constants.MOUSE_UP_EVENT, this.app.on_mouseup);

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
    if (this.start === undefined) this.start = time;
    else AA.Globals.ELAPSED_TIME = (time - this.start) * 0.001;

    if (this.does_need_resizing()) {
      this.fix_global_resolusion_params();
      // need to debounce on reciever
      AA.ev.notify(AA.Constants.WINDOW_RESIZED_EVENT);
    }

    this.stats.begin();
    AA.s_log.flush_scrn();
    this.app.update();
    this.app.draw();
    this.stats.end();

    requestAnimationFrame(this.update);
  };

  does_need_resizing = () => {
    return (
      AA.Globals.CANVAS.width !== AA.Globals.CANVAS.clientWidth ||
      AA.Globals.CANVAS.height !== AA.Globals.CANVAS.clientHeight
    );
  };

  fix_global_resolusion_params = () => {
    const px_ratio = window.devicePixelRatio;
    AA.Globals.APP_W = (AA.Globals.CANVAS.clientWidth * px_ratio) | 0;
    AA.Globals.APP_H = (AA.Globals.CANVAS.clientHeight * px_ratio) | 0;
    AA.Globals.APP_X = AA.Globals.CANVAS.getBoundingClientRect().x;
    AA.Globals.APP_Y = AA.Globals.CANVAS.getBoundingClientRect().y;
    AA.Globals.APP_RECT = new AA.Rectangle(
      AA.Globals.APP_X,
      AA.Globals.APP_Y,
      AA.Globals.APP_W,
      AA.Globals.APP_H
    );
    AA.Globals.APP_WINRESIZE_DIFFX = AA.Globals.APP_W - this.initial_app_width;
    AA.Globals.APP_WINRESIZE_DIFFY = AA.Globals.APP_H - this.initial_app_height;
    AA.Globals.RENDERER.setSize(AA.Globals.APP_W, AA.Globals.APP_H, false);
  };

  props;
  initial_app_width;
  initial_app_height;
  app;
  start;
  stats;
}

export default Main;
