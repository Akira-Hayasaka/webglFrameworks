import * as THREE from "three";
import Constants from "../Constants";

const Loader_Settings = {
  imageOrientation: "none",
};

const Shader_Mat_Settings = {
  vertexShader: Constants.MINIMUM_VERT,
  fragmentShader: Constants.MINIMUM_FRAG_VFLIP,
  depthWrite: false,
  transparent: true,
  side: THREE.DoubleSide,
};

class Image extends THREE.Object3D {
  load = (
    path,
    loader_settings = Loader_Settings,
    sm_settings = Shader_Mat_Settings
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
          const mat_for_quad_mesh = new THREE.ShaderMaterial({
            uniforms: { tex: { value: this.texture } },
            ...sm_settings,
          });
          this.mesh = new THREE.Mesh(geom_for_quad_mesh, mat_for_quad_mesh);
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

  mesh = null;
  texture = null;
}

export { Image, Loader_Settings, Shader_Mat_Settings };
