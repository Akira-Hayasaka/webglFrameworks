import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import * as AA from "./lib/Includer";
import App from "./App";

class Main {
  constructor(props) {
    this.props = props;

    AA.Globals.CONTAINER = props.container;
    AA.Globals.CANVAS = props.canvas;
    AA.Globals.APP_W = AA.Globals.CANVAS.clientWidth;
    AA.Globals.APP_H = AA.Globals.CANVAS.clientHeight;
    AA.Globals.APP_X = AA.Globals.CANVAS.getBoundingClientRect().x;
    AA.Globals.APP_Y = AA.Globals.CANVAS.getBoundingClientRect().y;
    AA.Globals.APP_RECT = new AA.Rectangle(
      AA.Globals.APP_X,
      AA.Globals.APP_Y,
      AA.Globals.APP_W,
      AA.Globals.APP_H
    );
    console.log("w", AA.Globals.APP_W);
    console.log("h", AA.Globals.APP_H);

    AA.Globals.RENDERER = new THREE.WebGLRenderer({
      canvas: AA.Globals.CANVAS,
      alpha: true,
      antialias: true,
    });
    AA.Globals.RENDERER.autoClear = false;
    AA.Globals.RENDERER.setSize(AA.Globals.APP_W, AA.Globals.APP_H);

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

    this.update();
  }

  update = (time) => {
    if (this.start === undefined) this.start = time;
    else AA.Globals.ELAPSED_TIME = (time - this.start) * 0.001;
    this.stats.begin();
    AA.s_log.flush_scrn();
    this.app.update();
    this.app.draw();
    this.stats.end();
    requestAnimationFrame(this.update);
  };

  props;
  app;
  start;
  stats;
}

export default Main;
