const Disposable = (Disposable) =>
  class extends Disposable {
    dispose = () => {
      if (this.mat) this.mat.dispose();
      if (this.geom) this.geom.dispose();
      if (this.tex) this.tex.dispose();
    };

    geom = null;
    mat = null;
    tex = null;
  };

export default Disposable;
