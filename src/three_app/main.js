import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import * as AA from "./lib/Includer";
import App from "./App";

class Main {
  constructor(container_elm, props) {
    this.props = props;

    AA.Globals.CONTAINER = container_elm;
    AA.Globals.APP_W = props.width;
    AA.Globals.APP_H = props.height;

    AA.Globals.RENDERER = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    AA.Globals.RENDERER.setSize(AA.Globals.APP_W, AA.Globals.APP_H);
    AA.Globals.RENDERER.autoClear = false;
    AA.Globals.CANVAS = AA.Globals.CONTAINER.appendChild(
      AA.Globals.RENDERER.domElement
    );
    AA.Globals.APP_X = AA.Globals.CANVAS.getBoundingClientRect().x;
    AA.Globals.APP_Y = AA.Globals.CANVAS.getBoundingClientRect().y;

    this.app = new App();
    AA.ev.add_listener(AA.Constants.KEY_PRESSED, this.app.keypressed);
    AA.ev.add_listener(AA.Constants.KEY_RELEASED, this.app.keyreleased);

    this.stats = new Stats();
    this.stats.showPanel(0);
    AA.Globals.CONTAINER.appendChild(this.stats.dom);

    this.update();
  }

  update = () => {
    this.stats.begin();
    AA.s_log.flush_scrn();
    this.app.update();
    this.app.draw();
    this.stats.end();
    requestAnimationFrame(this.update);
  };

  props;
  app;

  stats;
}

export default Main;
