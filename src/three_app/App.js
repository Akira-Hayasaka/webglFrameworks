import * as THREE from "three";
import * as AA from "./lib/Includer";

class App {
  constructor() {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    AA.Globals.SCENE.add(this.cube);

    const linematerial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const points = [];
    points.push(new THREE.Vector3(-1, 0, 0));
    points.push(new THREE.Vector3(0, 1, 0));
    points.push(new THREE.Vector3(1, 0, 0));

    const linegeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(linegeometry, linematerial);
    AA.Globals.SCENE.add(line);
  }

  update = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  };

  draw = () => {
    AA.Globals.RENDERER.render(AA.Globals.SCENE, AA.Globals.CAMERA);
    AA.s_log.draw_string("this is from app", 50, 200);
  };

  cube;
}

export default App;
