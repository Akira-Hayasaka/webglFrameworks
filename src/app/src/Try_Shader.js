import * as aa from "../lib/Includer";

class Try_Shader {
  constructor() {
    const object1 = {
      name: "Flavio",
    };

    const object2 = {
      age: 35,
    };

    let object3 = object1;
    object3 = { ...object3, ...object2 };
    console.log(JSON.stringify(object3, null, 2));
  }

  update = () => {};

  draw = () => {};

  shader = null;
}

export default Try_Shader;
