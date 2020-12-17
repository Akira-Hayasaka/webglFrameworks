import * as THREE from "three";
import Constants from "../Constants";
import { draw_img } from "../graphic/Easy_Draw";

class Image extends THREE.Object3D {
  load = (
    path,
    loader_settings = { imageOrientation: "none" },
    sm_settings = {
      vertexShader: Constants.MINIMUM_VERT,
      fragmentShader: Constants.MINIMUM_FRAG_VFLIP,
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
    }
  ) => {
    const that = this;
    return new Promise((resolve, reject) => {
      // const loader = new THREE.ImageBitmapLoader(); // <= didnt work on ios
      // loader.setOptions({ ...loader_settings });
      const loader = new THREE.ImageLoader();
      loader.load(
        path,
        (img) => {
          this.texture = new THREE.CanvasTexture(img);
          this.texture.flipY = true;
          const w = this.texture.image.width;
          const h = this.texture.image.height;
          const geom_for_quad_mesh = new THREE.PlaneBufferGeometry(w, h);
          this.mat = new THREE.ShaderMaterial({
            uniforms: {
              tex: { value: this.texture },
              opacity: { value: 1.0 },
            },
            ...sm_settings,
          });
          this.mesh = new THREE.Mesh(geom_for_quad_mesh, this.mat);
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

  draw = (
    x,
    y,
    z,
    sx,
    sy,
    {
      rot = new THREE.Euler(0, 0, 0, "XYZ"),
      opacity = 1.0,
      blending = THREE.NormalBlending,
    } = {}
  ) => {
    draw_img(this, x, y, z, sx, sy, { rot, opacity, blending });
  };

  get_width = () => {
    if (this.texture) return this.texture.image.width;
  };

  get_height = () => {
    if (this.texture) return this.texture.image.height;
  };

  set_anchor = (x, y) => {
    if (this.mesh) this.mesh.position.set(x, y);
  };

  get_tex = () => {
    return this.texture;
  };

  mat = null;
  mesh = null;
  texture = null;
}

export default Image;
