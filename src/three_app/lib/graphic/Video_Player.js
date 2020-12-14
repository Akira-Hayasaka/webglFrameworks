import * as THREE from "three";
import Globals from "../Globals";
import Constants from "../Constants";
import s_logger from "../util/Screen_Logger";
import { map } from "../util/Util";

const Ready_State = {
  0: "HAVE_NOTHING",
  1: "HAVE_METADATA",
  2: "HAVE_CURRENT_DATA",
  3: "HAVE_FUTURE_DATA",
  4: "HAVE_ENOUGH_DATA",
};

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

    this.video_elm = document.createElement("VIDEO");
    this.video_elm.autoplay = video_settings.autoplay;
    this.video_elm.crossOrigin = video_settings.crossOrigin;
    this.video_elm.loop = video_settings.loop;
    this.video_elm.muted = video_settings.muted;
    this.video_elm.preload = video_settings.preload;
    this.video_elm.style.display = "none";
    const source_elm = document.createElement("SOURCE");
    source_elm.src = path;
    source_elm.type = `video/mp4; codecs="avc1.42E01E, mp4a.40.2"`;
    this.video_elm.appendChild(source_elm);
    Globals.CONTAINER.appendChild(this.video_elm);

    this.video_elm.load();

    this.texture = new THREE.VideoTexture(this.video_elm);
    const geom_for_quad_mesh = new THREE.PlaneBufferGeometry(width, height);
    const mat_for_quad_mesh = new THREE.ShaderMaterial({
      uniforms: { tex: { value: this.texture } },
      ...sm_settings,
    });
    const mesh = new THREE.Mesh(geom_for_quad_mesh, mat_for_quad_mesh);
    mesh.position.set(width / 2, height / 2, 0);
    this.add(mesh);
  }

  debug_draw = () => {
    const x = this.position.x + 5;
    const y = this.position.y + 20;
    s_logger.draw_string(
      "state: " + Ready_State[this.video_elm.readyState],
      x,
      y
    );
    s_logger.draw_string("dur: " + this.video_elm.duration + " sec", x, y + 15);
    s_logger.draw_string(
      "cur: " + this.video_elm.currentTime + " sec",
      x,
      y + 30
    );
  };

  get_state = () => {
    return Ready_State[this.video_elm.readyState];
  };

  play = () => {
    this.video_elm.play();
  };

  pause = () => {
    this.video_elm.pause();
  };

  set_position = (pct) => {
    this.video_elm.currentTime = map(
      pct,
      0.0,
      1.0,
      0.0,
      this.video_elm.duration,
      true
    );
  };

  get_tex = () => {
    return this.texture;
  };

  video_elm;
  texture;
}

export { Video_Player, Video_Settings, Shader_Mat_Settings };
