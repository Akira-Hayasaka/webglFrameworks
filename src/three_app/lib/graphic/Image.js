import * as THREE from "three";
import { Object3D } from "three";
import Constants from "../Constants";

const Loader_Settings = {
  imageOrientation: "none",
};

const Shader_Mat_Settings = {
  vertexShader: Constants.MINIMUM_VERT,
  fragmentShader: Constants.MINIMUM_FRAG,
  depthWrite: false,
  side: THREE.DoubleSide,
};

class Image extends Object3D {
  constructor(
    path,
    loader_settings = Loader_Settings,
    sm_settings = Shader_Mat_Settings
  ) {
    super();

    const loader = new THREE.ImageBitmapLoader();
    loader.setOptions({ ...loader_settings });
    loader.load(
      path,
      (img) => {
        const texture = new THREE.CanvasTexture(img);
        const w = texture.image.width;
        const h = texture.image.height;
        const geom_for_quad_mesh = new THREE.PlaneBufferGeometry(w, h);
        const mat_for_quad_mesh = new THREE.ShaderMaterial({
          uniforms: { tex: { value: texture } },
          ...sm_settings,
        });
        const mesh = new THREE.Mesh(geom_for_quad_mesh, mat_for_quad_mesh);
        mesh.position.set(w / 2, h / 2, 0);
        this.add(mesh);
      },
      (prog) => {},
      (err) => {
        console.log("Image loading fail", err);
      }
    );
  }
}

export { Image, Loader_Settings, Shader_Mat_Settings };
