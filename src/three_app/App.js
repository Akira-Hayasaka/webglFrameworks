import * as THREE from "three";
import * as AA from "./lib/Includer";
import test_img from "./data/img/test.png";

const test_shader = `
varying vec2 v_uv;
uniform sampler2D tex;
void main() {
  vec2 uv = v_uv;
  uv.y = 1.0 - uv.y;
   gl_FragColor = texture2D(tex, uv);
  //gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
}`;

class App {
  constructor() {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);

    geometry = new THREE.CircleBufferGeometry(1, 32);
    material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const circle = new THREE.Mesh(geometry, material);

    this.scene3d = new THREE.Scene();
    // this.scene3d.background = new THREE.Color("rgba(255, 0, 0, 0)");
    this.scene3d.add(this.cube);
    this.camera_3d = new AA.Camera3d();

    this.img = new AA.Image(
      // "https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg"
      test_img
    );
    this.img.position.set(20, 20, 0);
    this.scene2d = new THREE.Scene();
    // this.scene2d.background = new THREE.Color("rgb(255, 0, 0)");
    this.scene2d.add(this.img);

    this.camera_2d = new AA.Camera2d();

    this.rbo0 = new AA.RBO(AA.Globals.APP_W, AA.Globals.APP_H);

    const sm_settings = AA.RBO_Shader_Mat_Settings;
    sm_settings.fragmentShader = test_shader;
    this.rbo1 = new AA.RBO(
      AA.Globals.APP_W,
      AA.Globals.APP_H,
      AA.RT_Settings,
      sm_settings
    );
  }

  update = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  };

  draw = () => {
    this.rbo0.feed(this.scene3d, this.camera_3d);
    this.rbo0.draw();

    // this.rbo1.feed(this.scene2d, this.camera_2d);
    // this.rbo1.draw();

    AA.Globals.RENDERER.render(this.scene2d, this.camera_2d);
  };

  keypressed = (key) => {};
  keyreleased = (key) => {};

  rbo0;
  rbo1;

  cube;
  scene3d;
  camera_3d;

  img;
  scene2d;
  camera_2d;
}

export default App;
