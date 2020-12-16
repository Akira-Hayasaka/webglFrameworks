import Hammer from "hammerjs";

const dothat = () => {
  var myElement = document.getElementById("myElement");

  // create a simple instance
  // by default, it only adds horizontal recognizers
  var mc = new Hammer(myElement);

  console.log("elm", myElement);
  console.log("mc", mc);

  // listen to events...
  mc.on("panleft panright tap press", function (ev) {
    myElement.textContent = ev.type + " gesture detected.";
    console.log(ev.type + " gesture detected.");
  });

  console.log("hammer testetetetest");
};

export default dothat;
