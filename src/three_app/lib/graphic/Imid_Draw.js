import * as THREE from "three";
import Globals from "../Globals";
import { Camera_Orho } from "./Camera";

const circle_geom = new THREE.CircleBufferGeometry(1, 32);
const rect_geom = new THREE.PlaneBufferGeometry();

class Obj extends THREE.Mesh {
  constructor(
    geom,
    mat = new THREE.MeshBasicMaterial({
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
    }) // <= should reuse same material??
  ) {
    super(geom, mat);
    this.mat = mat;
  }
  mat;
}

class Object_Manager {
  constructor(camera) {
    this.scene = new THREE.Scene();
    this.camera = camera;
  }

  draw_circle(x, y, z, rad, { col, opacity, blending }) {
    const the_store = this.store.circle;
    this.push_and_add(the_store, this.scene, circle_geom);
    this.fix_params(
      the_store.objs[the_store.counter],
      x,
      y,
      z,
      col,
      opacity,
      blending,
      (to_draw) => {
        to_draw.scale.set(rad, rad, 1.0);
      }
    );
    the_store.counter++;
  }

  draw_rect(x, y, z, w, h, { rot, col, opacity, blending }) {
    const the_store = this.store.rect;
    this.push_and_add(the_store, this.scene, rect_geom);
    this.fix_params(
      the_store.objs[the_store.counter],
      x,
      y,
      z,
      col,
      opacity,
      blending,
      (to_draw) => {
        to_draw.scale.set(w, h, 1.0);
        to_draw.rotation.set(rot.x, rot.y, rot.z, rot.order);
      }
    );
    the_store.counter++;
  }

  reset_counter() {
    this.remove_and_pop(this.store.circle, this.scene);
    this.remove_and_pop(this.store.rect, this.scene);
  }

  render = () => {
    Globals.RENDERER.clearDepth();
    Globals.RENDERER.render(this.scene, this.camera);
  };

  fix_params = (to_draw, x, y, z, col, opacity, blending, custom_fn) => {
    to_draw.position.set(x, y, z);
    to_draw.mat.color = col;
    to_draw.mat.opacity = opacity;
    to_draw.mat.blending = blending;
    custom_fn(to_draw);
  };

  push_and_add = (_store, _scene, _geom) => {
    if (!_store.objs[_store.counter]) {
      const obj = new Obj(_geom);
      _store.objs.push(obj);
      _scene.add(obj);
    }
  };

  remove_and_pop = (_store, _scene) => {
    if (_store.objs.length > _store.counter) {
      const diff = _store.objs.length - _store.counter;
      for (let i = 0; i < diff; i++) {
        _scene.remove(_store.objs.pop());
      }
    }
    _store.counter = 0;
  };

  scene;
  camera;

  store = {
    circle: {
      counter: 0,
      objs: [],
    },
    rect: {
      counter: 0,
      objs: [],
    },
  };
}

let object_mgr = null;

const init_imid_draw_env = (camera = new Camera_Orho()) => {
  object_mgr = new Object_Manager(camera);
};

const draw_circle = (
  x,
  y,
  z,
  rad,
  {
    col = new THREE.Color(THREE.Color.NAMES.ghostwhite),
    opacity = 1.0,
    blending = THREE.NormalBlending,
  } = {}
) => {
  object_mgr.draw_circle(x, y, z, rad, { col, opacity, blending });
};

const draw_rect = (
  x,
  y,
  z,
  w,
  h,
  {
    rot = new THREE.Euler(0, 0, 0, "XYZ"),
    col = new THREE.Color(THREE.Color.NAMES.ghostwhite),
    opacity = 1.0,
    blending = THREE.NormalBlending,
  } = {}
) => {
  object_mgr.draw_rect(x, y, z, w, h, { rot, col, opacity, blending });
};

const reset_imid_draw_loop = () => {
  object_mgr.reset_counter();
};

const render_imid_scene = () => {
  object_mgr.render();
};

export {
  init_imid_draw_env,
  draw_circle,
  draw_rect,
  reset_imid_draw_loop,
  render_imid_scene,
};
