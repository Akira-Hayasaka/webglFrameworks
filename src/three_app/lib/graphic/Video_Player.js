import * as THREE from "three";
import Globals from "../Globals";
import Constants from "../Constants";

const Video_Settings = {
  autoplay: false,
  crossOrigin: "anonymous",
  loop: true,
  muted: true,
  preload: true,
};

const Shader_Mat_Settings = {
  vertexShader: Constants.MINIMUM_VERT,
  fragmentShader: Constants.MINIMUM_FRAG_VFLIP,
  depthWrite: false,
  transparent: true,
  side: THREE.DoubleSide,
};

class Video_Player extends THREE.Object3D {
  constructor(
    path,
    width,
    height,
    video_settings = Video_Settings,
    sm_settings = Shader_Mat_Settings
  ) {
    super();

    const video_elm = document.createElement("VIDEO");
    console.log("video_elm", video_elm);
    video_elm.autoplay = video_settings.autoplay;
    video_elm.crossOrigin = video_settings.crossOrigin;
    video_elm.loop = video_settings.loop;
    video_elm.muted = video_settings.muted;
    video_elm.preload = video_settings.preload;
    video_elm.style.display = "none";
    const source_elm = document.createElement("SOURCE");
    source_elm.src = path;
    source_elm.type = `video/mp4; codecs="avc1.42E01E, mp4a.40.2"`;
    video_elm.appendChild(source_elm);
    Globals.CONTAINER.appendChild(video_elm);

    video_elm.load();
    video_elm.play();

    const texture = new THREE.VideoTexture(video_elm);
    const geom_for_quad_mesh = new THREE.PlaneBufferGeometry(width, height);
    const mat_for_quad_mesh = new THREE.ShaderMaterial({
      uniforms: { tex: { value: texture } },
      ...sm_settings,
    });
    const mesh = new THREE.Mesh(geom_for_quad_mesh, mat_for_quad_mesh);
    mesh.position.set(width / 2, height / 2, 0);
    this.add(mesh);
  }
}

export { Video_Player, Video_Settings, Shader_Mat_Settings };
