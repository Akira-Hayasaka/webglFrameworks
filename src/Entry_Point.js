import React from "react";
import { useState, useRef, useEffect } from "react";
import Main from "./three_app/main";

let app_main = null;

function Entry_Point() {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const elem = useRef(null);

  const init_three = () => {
    const d3_props = {
      width,
      height,
    };
    app_main = new Main(elem.current, d3_props);
  };

  useEffect(init_three, [width, height]);

  return (
    <>
      <div>hello from three</div>
      <div ref={elem} />
    </>
  );
}

export default Entry_Point;
