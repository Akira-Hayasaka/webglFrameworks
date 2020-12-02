import * as THREE from "three";
import App from "./app/App";

class Main {
  constructor(container_elm, props) {
    this.container_elm = container_elm;
    this.props = props;
    const { width, height } = props;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.container_elm.appendChild(this.renderer.domElement);
    this.camera.position.z = 5;

    this.app = new App(this.scene);

    this.update();
  }

  update = () => {
    requestAnimationFrame(this.update);
    this.app.update();
    this.renderer.render(this.scene, this.camera);
  };

  container_elm;
  props;

  scene;
  camera;
  renderer;

  app;
}

export default Main;
