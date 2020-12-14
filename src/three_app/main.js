import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import * as AA from "./lib/Includer";
import App from "./App";

class Main {
  constructor(props) {
    this.props = props;

    AA.Globals.CONTAINER = props.container;
    AA.Globals.CANVAS = props.canvas;
    this.fix_global_resolusion_params();

    AA.Globals.RENDERER = new THREE.WebGLRenderer({
      canvas: AA.Globals.CANVAS,
      alpha: true,
      antialias: true,
    });
    AA.Globals.RENDERER.autoClear = false;
    AA.Globals.RENDERER.setSize(AA.Globals.APP_W, AA.Globals.APP_H, false);
    AA.Globals.RENDERER.setClearColor(0x000000, 0);

    this.app = new App();
    AA.ev.add_listener(AA.Constants.KEY_PRESSED, this.app.on_keypressed);
    AA.ev.add_listener(AA.Constants.KEY_RELEASED, this.app.on_keyreleased);
    AA.ev.add_listener(AA.Constants.MOUSE_CLICK, this.app.on_mouseclick);
    AA.ev.add_listener(AA.Constants.MOUSE_DBLCLICK, this.app.on_mousedblclick);
    AA.ev.add_listener(AA.Constants.MOUSE_DOWN, this.app.on_mousedown);
    AA.ev.add_listener(AA.Constants.MOUSE_MOVE, this.app.on_mousemove);
    AA.ev.add_listener(AA.Constants.MOUSE_UP, this.app.on_mouseup);

    this.stats = new Stats();
    this.stats.showPanel(0);
    AA.Globals.CONTAINER.appendChild(this.stats.dom);

    for (const [key, value] of Object.entries(AA.Globals)) {
      console.log(`${key}: ${value}`);
    }

    this.update();
  }

  update = (time) => {
    if (this.start === undefined) this.start = time;
    else AA.Globals.ELAPSED_TIME = (time - this.start) * 0.001;

    if (this.does_need_resize_canvas()) {
      console.log("should resize canvas");
      this.fix_global_resolusion_params();
      AA.Globals.RENDERER.setSize(AA.Globals.APP_W, AA.Globals.APP_H, false);
      AA.ev.notify(AA.Constants.WINDOW_RESIZE);
    }

    this.stats.begin();
    AA.s_log.flush_scrn();
    this.app.update();
    this.app.draw();
    this.stats.end();

    requestAnimationFrame(this.update);
  };

  fix_global_resolusion_params = () => {
    if (!AA.Globals.CANVAS) return;

    AA.Globals.APP_W = AA.Globals.CANVAS.getBoundingClientRect().width;
    AA.Globals.APP_H = AA.Globals.CANVAS.getBoundingClientRect().height;
    AA.Globals.APP_X = AA.Globals.CANVAS.getBoundingClientRect().x;
    AA.Globals.APP_Y = AA.Globals.CANVAS.getBoundingClientRect().y;
    AA.Globals.APP_RECT = new AA.Rectangle(
      AA.Globals.APP_X,
      AA.Globals.APP_Y,
      AA.Globals.APP_W,
      AA.Globals.APP_H
    );
  };

  does_need_resize_canvas = () => {
    return (
      AA.Globals.CANVAS.width !==
        AA.Globals.CANVAS.getBoundingClientRect().width ||
      AA.Globals.CANVAS.height !==
        AA.Globals.CANVAS.getBoundingClientRect().height
    );
  };

  props;
  app;
  start;
  stats;
}

export default Main;
