import * as THREE from "three";
import App from "./app/App";
import Globals from "./app/Globals";
import s_log from "./app/util/Screen_Logger";

class Main {
  constructor(container_elm, props) {
    Globals.CONTAINER = container_elm;
    this.props = props;
    const { width, height } = props;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("rgb(150, 150, 150)");
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    const webgl_elm = Globals.CONTAINER.appendChild(this.renderer.domElement);
    this.app = new App(this.scene);

    const rect = webgl_elm.getBoundingClientRect();

    Globals.APP_W = width;
    Globals.APP_H = height;
    Globals.APP_X = rect.x;
    Globals.APP_Y = rect.y;

    this.update();
  }

  update = () => {
    requestAnimationFrame(this.update);
    s_log.flush_scrn();
    this.app.update();
    this.renderer.render(this.scene, this.camera);
    s_log.draw_string("1234556", 0, 10);
    s_log.draw_string("9876543", 0, 50);
  };

  props;

  scene;
  camera;
  renderer;

  app;
}

export default Main;
