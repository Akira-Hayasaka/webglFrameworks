import * as THREE from "three";
import App from "./App";
import Globals from "./lib/Globals";
import s_log from "./lib/util/Screen_Logger";

class Main {
  constructor(container_elm, props) {
    this.props = props;

    Globals.CONTAINER = container_elm;
    Globals.APP_W = props.width;
    Globals.APP_H = props.height;

    Globals.SCENE = new THREE.Scene();
    Globals.SCENE.background = new THREE.Color("rgb(150, 150, 150)");
    Globals.CAMERA = new THREE.PerspectiveCamera(
      75,
      Globals.APP_W / Globals.APP_H,
      0.1,
      1000
    );
    Globals.CAMERA.position.z = 5;
    Globals.RENDERER = new THREE.WebGLRenderer();
    Globals.RENDERER.setSize(Globals.APP_W, Globals.APP_H);
    Globals.CANVAS = Globals.CONTAINER.appendChild(Globals.RENDERER.domElement);
    Globals.APP_X = Globals.CANVAS.getBoundingClientRect().x;
    Globals.APP_Y = Globals.CANVAS.getBoundingClientRect().y;

    this.app = new App();
    this.update();
  }

  update = () => {
    requestAnimationFrame(this.update);
    s_log.flush_scrn();
    this.app.update();
    this.app.draw();
  };

  props;
  app;
}

export default Main;
