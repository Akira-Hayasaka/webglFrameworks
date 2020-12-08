import * as THREE from "three";
import * as AA from "./lib/Includer";
import App from "./App";

class Main {
  constructor(container_elm, props) {
    this.props = props;

    AA.Globals.CONTAINER = container_elm;
    AA.Globals.APP_W = props.width;
    AA.Globals.APP_H = props.height;

    AA.Globals.SCENE = new THREE.Scene();
    AA.Globals.SCENE.background = new THREE.Color("rgb(150, 150, 150)");
    AA.Globals.CAMERA = new THREE.PerspectiveCamera(
      75,
      AA.Globals.APP_W / AA.Globals.APP_H,
      0.1,
      1000
    );
    AA.Globals.CAMERA.position.z = 5;
    AA.Globals.RENDERER = new THREE.WebGLRenderer();
    AA.Globals.RENDERER.setSize(AA.Globals.APP_W, AA.Globals.APP_H);
    AA.Globals.CANVAS = AA.Globals.CONTAINER.appendChild(
      AA.Globals.RENDERER.domElement
    );
    AA.Globals.APP_X = AA.Globals.CANVAS.getBoundingClientRect().x;
    AA.Globals.APP_Y = AA.Globals.CANVAS.getBoundingClientRect().y;

    this.app = new App();
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
