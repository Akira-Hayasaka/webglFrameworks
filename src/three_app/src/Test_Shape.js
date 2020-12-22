import * as three from "three";
import * as aa from "../lib/Includer";

class Test_Shape {
  constructor() {
    this.scene = new three.Scene();
    this.camera = new aa.Camera_Orho();
  }

  update = () => {
    if (this.geometry) this.geometry.dispose();
    if (this.material) this.material.dispose();
    if (this.mesh) this.scene.remove(this.mesh);

    const shape = new three.Shape(
      (this.pts = this.gen_circle_pts(
        200,
        new three.Vector2(aa.Globals.APP_W / 2, aa.Globals.APP_H / 2),
        100
      ))
    );
    shape.closePath();

    this.geometry = new three.ShapeBufferGeometry(shape);
    this.material = new three.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      side: three.DoubleSide,
      wireframe: true,
    });
    this.mesh = new three.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  };

  draw = () => {
    aa.Globals.RENDERER.render(this.scene, this.camera);
    this.pts.forEach((p) => {
      aa.draw_circle(p.x, p.y, 0, 3, { col: new aa.RGBA(0, 0, 0, 255) });
    });
  };

  gen_circle_pts = (rad, cen, div) => {
    const ang = (Math.PI * 2.0) / div;
    let rtn = [];
    for (let i = 0; i < div; i++) {
      const the_rad = aa.map(
        aa.noise(aa.Globals.ELAPSED_TIME * 0.5, ang * i),
        0.0,
        1.0,
        rad * 0.5,
        rad * 1.5
      );
      rtn.push(
        new three.Vector3(
          cen.x + the_rad * Math.cos(ang * i),
          cen.y + the_rad * Math.sin(ang * i),
          0
        )
      );
    }
    return rtn;
  };

  scene;
  camera;
  pts;
  mesh;

  geometry;
  material;
  mesh;
}

export default Test_Shape;
