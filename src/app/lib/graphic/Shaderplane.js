import * as THREE from "three";
import Disposable from "./Disposable";
import { draw_img } from "../graphic/Easy_Draw";

class Shaderplane extends Disposable(THREE.Object3D) {
  constructor(w, h, vertexShader, fragmentShader) {
    super();
    this.geom = new THREE.PlaneBufferGeometry(w, h);
    this.mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.position.set(w / 2, h / 2, 0);
    this.add(this.mesh);
  }

  set_uniforms = (uniforms) => {
    this.mat.uniforms = { ...this.mat.uniforms, ...uniforms };
  };

  set_res = (w, h) => {
    if (w !== this.get_width() || h !== this.get_height()) {
      this.geom.dispose();
      this.geom = new THREE.PlaneBufferGeometry(w, h);
      this.remove(this.mesh);
      this.mesh = new THREE.Mesh(this.geom, this.mat);
      this.mesh.position.set(w / 2, h / 2, 0);
      this.add(this.mesh);
    }
  };

  draw = (
    x,
    y,
    z = 0,
    sx = 1.0,
    sy = 1.0,
    {
      rot = new THREE.Euler(0, 0, 0, "XYZ"),
      opacity = 1.0,
      blending = THREE.NormalBlending,
    } = {}
  ) => {
    draw_img(this, x, y, z, sx, sy, { rot, opacity, blending });
  };

  get_width = () => {
    if (this.geom) return this.geom.parameters.width;
  };

  get_height = () => {
    if (this.geom) return this.geom.parameters.height;
  };

  set_anchor = (x, y) => {
    if (this.mesh) this.mesh.position.set(x, y);
  };

  mesh = null;
}

export default Shaderplane;