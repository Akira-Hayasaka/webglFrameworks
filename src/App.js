import React from "react";
import { useState, useRef, useEffect } from "react";
import Main from "./three_app/main";

let three_app = null;

function App() {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const d3_el = useRef(null);

  const init_three = () => {
    const d3_props = {
      width,
      height,
    };
    three_app = new Main(d3_el.current, d3_props);
  };

  useEffect(init_three, [width, height]);

  return (
    <>
      <div>hello from three</div>
      <div ref={d3_el} />
    </>
  );
}

export default App;
