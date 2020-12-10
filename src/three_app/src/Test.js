import { ev } from "../lib/Includer";

class Test {
  update = () => {};

  put_log = () => {
    console.log("hey, this is test");
  };

  emit_event = () => {
    ev.notify("test", "yo");
  };
}

export default Test;
