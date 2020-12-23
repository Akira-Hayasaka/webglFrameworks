import * as THREE from "three";
import Constants from "../Constants";
import Disposable from "./Disposable";
import { draw_img } from "../graphic/Easy_Draw";

class Image extends Disposable(THREE.Object3D) {
  load = (
    path,
    {
      imageOrientation = "none",
      vertexShader = Constants.MINIMUM_VERT,
      fragmentShader = Constants.MINIMUM_FRAG_VFLIP_OPACITY,
      depthWrite = false,
      transparent = true,
      side = THREE.DoubleSide,
    } = {}
  ) => {
    const that = this;
    return new Promise((resolve, reject) => {
      // const loader = new THREE.ImageBitmapLoader(); // <= didnt work on ios
      // loader.setOptions({ ...loader_settings });
      const loader = new THREE.ImageLoader();
      loader.load(
        path,
        (img) => {
          this.tex = new THREE.CanvasTexture(img);
          this.tex.flipY = true;
          const w = this.tex.image.width;
          const h = this.tex.image.height;
          this.geom = new THREE.PlaneBufferGeometry(w, h);
          this.mat = new THREE.ShaderMaterial({
            uniforms: {
              tex: { value: this.tex },
              opacity: { value: 1.0 },
            },
            vertexShader,
            fragmentShader,
            depthWrite,
            transparent,
            side,
          });
          this.mesh = new THREE.Mesh(this.geom, this.mat);
          this.mesh.position.set(w / 2, h / 2, 0);
          this.add(this.mesh);
          resolve(that);
        },
        (prog) => {},
        (err) => {
          console.log("Image loading fail", err);
          reject(that, err);
        }
      );
    });
  };

  resize = (w, h) => {
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

  get_tex = () => {
    return this.tex;
  };

  mesh = null;
}

export default Image;
