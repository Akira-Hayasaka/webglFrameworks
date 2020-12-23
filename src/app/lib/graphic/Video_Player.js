import * as THREE from "three";
import Globals from "../Globals";
import Constants from "../Constants";
import { draw_canvas_string } from "../util/Screen_Logger";
import { map } from "../util/Util";
import { draw_img } from "../graphic/Easy_Draw";
import Disposable from "./Disposable";

const Ready_State = {
  0: "HAVE_NOTHING",
  1: "HAVE_METADATA",
  2: "HAVE_CURRENT_DATA",
  3: "HAVE_FUTURE_DATA",
  4: "HAVE_ENOUGH_DATA",
};

class Video_Player extends Disposable(THREE.Object3D) {
  load(
    path,
    width,
    height,
    video_settings = {
      autoplay: false,
      crossOrigin: "anonymous",
      loop: true,
      muted: true,
      preload: true,
    },
    sm_settings = {
      vertexShader: Constants.MINIMUM_VERT,
      fragmentShader: Constants.MINIMUM_FRAG_VFLIP_OPACITY,
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
    }
  ) {
    const that = this;
    return new Promise((resolve, reject) => {
      try {
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

        this.tex = new THREE.VideoTexture(this.video_elm);
        this.geom = new THREE.PlaneBufferGeometry(width, height);
        this.mat = new THREE.ShaderMaterial({
          uniforms: {
            tex: { value: this.tex },
            opacity: { value: 1.0 },
          },
          ...sm_settings,
        });
        this.mesh = new THREE.Mesh(this.geom, this.mat);
        this.mesh.position.set(width / 2, height / 2, 0);
        this.add(this.mesh);
        resolve(that);
      } catch {
        console.log("error loading vid:", path);
        reject(that);
      }
    });
  }

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

  debug_draw = () => {
    if (!this.video_elm) return;

    const x = this.position.x + 5;
    const y = this.position.y + 20;
    draw_canvas_string.draw_string(
      "state: " + Ready_State[this.video_elm.readyState],
      x,
      y
    );
    draw_canvas_string.draw_string(
      "dur: " + this.video_elm.duration + " sec",
      x,
      y + 15
    );
    draw_canvas_string.draw_string(
      "cur: " + this.video_elm.currentTime + " sec",
      x,
      y + 30
    );
  };

  get_state = () => {
    if (this.video_elm) {
      return Ready_State[this.video_elm.readyState];
    } else {
      return Ready_State[0];
    }
  };

  play = () => {
    if (this.video_elm) this.video_elm.play();
  };

  pause = () => {
    if (this.video_elm) this.video_elm.pause();
  };

  set_position = (pct) => {
    if (this.video_elm)
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
    return this.tex;
  };

  get_width = () => {
    if (this.tex) return this.tex.image.width;
  };

  get_height = () => {
    if (this.tex) return this.tex.image.height;
  };

  set_anchor = (x, y) => {
    if (this.mesh) this.mesh.position.set(x, y);
  };

  video_elm = null;
  mesh = null;
}

export default Video_Player;
