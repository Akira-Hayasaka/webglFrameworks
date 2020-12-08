import * as THREE from "three";
import * as AA from "./lib/Includer";
import App from "./App";
import Constants from "./lib/Constants";

class Main {
  constructor(container_elm, props) {
    this.props = props;

    AA.Globals.CONTAINER = container_elm;
    AA.Globals.APP_W = props.width;
    AA.Globals.APP_H = props.height;

    AA.Globals.RENDERER = new THREE.WebGLRenderer({ alpha: true });
    AA.Globals.RENDERER.setSize(AA.Globals.APP_W, AA.Globals.APP_H);
    AA.Globals.CANVAS = AA.Globals.CONTAINER.appendChild(
      AA.Globals.RENDERER.domElement
    );
    AA.Globals.APP_X = AA.Globals.CANVAS.getBoundingClientRect().x;
    AA.Globals.APP_Y = AA.Globals.CANVAS.getBoundingClientRect().y;

    this.app = new App();
    AA.ev.add_listener(Constants.KEY_PRESSED, this.app.keypressed);
    AA.ev.add_listener(Constants.KEY_RELEASED, this.app.keyreleased);

    this.update();
  }

  update = () => {
    requestAnimationFrame(this.update);
    AA.s_log.flush_scrn();
    this.app.update();
    this.app.draw();
  };

  props;
  app;
}

export default Main;
