import React from "react";
import { useRef, useEffect } from "react";
import Main from "./app/main";

let app_main = null;

function EntryPoint() {
  const container_elm = useRef(null);
  const canvas_elem = useRef(null);

  const init_three = () => {
    const d3_props = {
      container: container_elm.current,
      canvas: canvas_elem.current,
    };
    app_main = new Main(d3_props);
  };

  useEffect(init_three, []);

  return (
    <>
      <div id="app_container" ref={container_elm}>
        <canvas id="app" ref={canvas_elem} />
      </div>
    </>
  );
}

export default EntryPoint;
