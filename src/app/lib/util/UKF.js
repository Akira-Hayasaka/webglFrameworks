import {
  add,
  subtract,
  multiply,
  sqrt,
  abs,
  matrix,
  transpose,
  inv,
  size,
} from "mathjs";
import { Vector2 } from "three";

class UKF_Base {
  constructor() {
    this.Q = matrix();
    this.Q.resize([6, 6]);
    this.R = matrix();
    this.R.resize([6, 6]);
    this.P = matrix();
    this.P.resize([6, 6]);
  }

  update(target, z) {
    console.log("this.P", this.P.toString());

    const L = 2 * this.n + 1;
    const alpha = 1e-3; //default, tunable
    const ki = 0.0; //default, tunable
    const beta = 2.0; //default, tunable
    const lambda = alpha * alpha * (this.n + ki) - this.n; //scaling factor
    let c = this.n + lambda; //scaling factor

    // console.log("initial x", target.toString());
    // console.log("L", L);
    // console.log("alpha", alpha);
    // console.log("ki", ki);
    // console.log("beta", beta);
    // console.log("lambda", lambda);
    // console.log("c", c);

    /* weight equations are found in the upper part of http://www.cslu.ogi.edu/nsel/ukf/node6.html */
    const Wm = matrix();
    Wm.resize([1, L]); //weights for means
    const Wc = Wm; //weights for covariance
    Wm.set([0, 0], lambda / c);
    Wc.set([0, 0], lambda / c + (1 - alpha * alpha + beta));

    for (let k = 1; k < L; k++) {
      Wm.set([0, k], 0.5 / c);
      Wc.set([0, k], 0.5 / c);
    }
    c = sqrt(c);
    const X = this.sigma(target, this.P, c);

    const x1 = matrix();
    x1.resize([this.n, 1]);
    const X1 = matrix();
    X1.resize([this.n, L]);
    for (let k = 0; k < L; k++) {
      const Xcol = matrix();
      Xcol.resize([this.n, 1]);
      let X1col = matrix();
      X1col.resize([this.n, 1]); /* temp vectors, not used in matlab */

      for (let i = 0; i < this.n; i++) {
        Xcol.set([i, 0], X.get([i, k])); // take out a column so that state_function can take it
      }
      X1col = this.state_function(Xcol);
      for (let i = 0; i < this.n; i++) {
        x1.set([i, 0], x1.get([i, 0]) + Wm.get([0, k]) * X1col.get([i, 0]));
      }
      for (let i = 0; i < this.n; i++) {
        X1.set([i, k], X1col.get([i, 0])); // put back the output column
      }
    }
    const X2 = matrix();
    X2.resize([this.n, L]);
    for (let k = 0; k < L; k++) {
      for (let i = 0; i < this.n; i++) {
        X2.set([i, k], X1.get([i, k]) - x1.get([i, 0])); //X2.Column(k) = X1.Column(k) - x1;
      }
    }
    const diagWm = matrix();
    diagWm.resize([L, L]);
    for (let k = 0; k < L; k++) {
      diagWm.set([k, k], Wm.get([0, k]));
    }

    // console.log("this.n", this.n);
    // console.log("L", L);
    // console.log("Wm", Wm.toString());
    // console.log("Wc", Wc.toString());
    // console.log("X", X.toString());
    // console.log("x1", x1.toString());
    // console.log("X1", X1.toString());
    // console.log("X2", X2.toString());
    // console.log("transpose(X2)", transpose(X2).toString());
    // console.log("this.Q", this.Q.toString());

    const P1 = add(multiply(X2, diagWm, transpose(X2)), this.Q);

    const z1 = matrix();
    z1.resize([this.m, 1]);
    const Z1 = matrix();
    Z1.resize([this.m, L]);
    for (let k = 0; k < L; k++) {
      const X1col = matrix();
      X1col.resize([this.n, 1]);
      let Z1col = matrix();
      Z1col.resize([this.m, 1]); /* temp vectors, not used in matlab */
      for (let i = 0; i < this.n; i++) {
        X1col.set([i, 0], X1.get([i, k])); // take out a column so that measurement_function can take it
      }
      Z1col = this.measurement_function(X1col);
      for (let i = 0; i < this.m; i++) {
        z1.set([i, 0], z1.get([i, 0]) + Wm.get([0, k]) * Z1col.get([i, 0]));
      }
      for (let i = 0; i < this.m; i++) {
        Z1.set([i, k], Z1col.get([i, 0])); // put back the output column
      }
    }
    const Z2 = matrix();
    Z2.resize([this.m, L]);
    for (let k = 0; k < L; k++) {
      for (let i = 0; i < this.m; i++) {
        Z2.set([i, k], Z1.get([i, k]) - z1.get([i, 0])); //Z2.Column(k) = Z1.Column(k) - z1;
      }
    }
    const diagWc = matrix();
    diagWc.resize([L, L]);
    for (let k = 0; k < L; k++) {
      diagWc.set([k, k], Wc.get([0, k]));
    }
    const P2 = add(multiply(Z2, diagWc, transpose(Z2)), this.R);
    const P12 = multiply(X2, diagWc, transpose(Z2)); //transformed cross-covariance
    const K = multiply(P12, inv(P2));
    target = add(x1, multiply(K, subtract(z, z1))); //state update
    this.P = subtract(P1, multiply(K, transpose(P12))); //covariance update

    console.log("this.R", this.R.toString());
    // console.log("Z2", Z2.toString());
    // console.log("diagWc", diagWc.toString());
    // console.log("P2", P2.toString());
    // console.log("P12", P12.toString());
    // console.log("K", K.toString());
    // console.log("x1", x1.toString());
    // console.log("this.P", this.P.toString());
    // console.log("result UKF_Base update x", target.toString());

    return target;
  }

  sigma(x, P, c) {
    const n = size(P).valueOf()[0];
    const L = 2 * n + 1;
    const Chol = this.Cholesky(P);
    const A = multiply(c, Chol);

    console.log("x", x.toString());
    console.log("n", n);
    console.log("Chol", Chol.toString());
    console.log("A", A.toString());

    const X = matrix();
    X.resize([n, L]);
    let k = 0;
    for (let i = 0; i < n; i++) {
      X.set([i, k], x.get([i, 0]));
    }
    for (k = 1; k < n + 1; k++) {
      for (let i = 0; i < n; i++) {
        X.set([i, k], x.get([i, 0]) + A.get([i, k - 1]));
      }
    }
    for (k = n + 1; k < L; k++) {
      for (let i = 0; i < n; i++) {
        X.set([i, k], x.get([i, 0]) - A.get([i, k - 1 - n]));
      }
    }

    // console.log("X", X.toString());
    return X;
  }

  Cholesky(A) {
    const n = size(A).valueOf()[0];
    const Chol = matrix();
    Chol.resize([n, n]);
    const s = [];
    for (let i = 0; i < n; i++) {
      s.push(0.0);
    }

    console.log("before s", s.toString());

    let ss = 0.0;
    let i, j, k;
    for (j = 0; j < n; j++) {
      if (j === 0) {
        for (i = j; i < n; i++) {
          s[i] = A.get([i, j]);

          if (s[i] < 0) {
            console.log("1 s[i]", s[i]);
          }
        }
      }
      if (j !== 0) {
        for (i = j; i < n; i++) {
          ss = 0;
          for (k = 0; k <= j - 1; k++) {
            ss += Chol.get([i, k]) * Chol.get([j, k]);
          }
          s[i] = A.get([i, j]) - ss;

          // if (s[i] < 0) {
          //   console.log("A.get([i, j])", A.get([i, j]));
          //   console.log("ss", ss);
          //   console.log("2 s[i]", s[i]);
          // }
        }
      }
      if (abs(s[j]) < 0.000000001) {
        console.log(
          "ERROR: ukf Cholesky - matrix<T> not positive definite",
          j,
          "th iteration."
        );
        return A; // ERROR
      }
      for (i = j; i < n; i++) {
        console.log("s[j]", s[j]);
        Chol.set([i, j], s[i] / sqrt(s[j]));
      }
    }

    console.log("A", A.toString());
    console.log("after s", s.toString());

    return Chol;
  }

  state_function() {} // virtual
  measurement_function() {} // virtual

  n; //number of state
  m; //number of measurement
  Q; //noise covariance of process	(size must be nxn)
  R; //noise covariance of measurement (size must be mxm)
  P; //state covariance
}

class UKF extends UKF_Base {
  constructor(smoothness = 0.1, rapidness = 0.1, dimention = 2) {
    super();
    this.D = dimention;
    this.n = this.D * 2;
    this.m = this.D;

    const In = matrix();
    In.resize([this.n, this.n]); // nxn Identity Matrix
    for (let i = 0; i < this.n; i++) {
      In.set([i, i], 1);
    }
    const Im = matrix();
    Im.resize([this.m, this.m]); // mxm Identity Matrix
    for (let i = 0; i < this.m; i++) {
      Im.set([i, i], 1);
    }

    const q = smoothness; //std of process. "smoothness". lower the value, smoother the curve
    const r = rapidness; //std of measurement. "tracking". lower the value, faster the track
    this.P = In; // state covariance
    this.Q = multiply(multiply(q, q), In); // covariance of process	(size must be nxn)
    this.R = multiply(multiply(r, r), Im); // covariance of measurement (size must be mxm)

    this.x = matrix();
    this.x.resize([this.n, 1]);
  }

  update(p) {
    const z = matrix();
    z.resize([this.D, 1]);
    z.set([0, 0], p.x);
    z.set([1, 0], p.y);
    this.x = super.update(this.x, z);
    console.log("result of UKF update x", this.x.toString());
  }

  get_estimation() {
    const w = this.measurement_function(this.x);
    return new Vector2(w.get([0, 0]), w.get([1, 0]));
  }

  get_velocity() {
    const w = this.measurement_function(this.x);
    return new Vector2(w.get([0 + this.D, 0]), w.get([1 + this.D, 0]));
  }

  state_function(s) {
    const state = matrix();
    state.resize([this.n, 1]);
    // position
    for (let i = 0; i < this.D; i++) {
      state.set([i, 0], s.get([i, 0]) + s.get([i + this.D, 0]));
    }
    // velocity
    for (let i = 0; i < this.D; i++) {
      state.set([i + this.D, 0], s.get([i + this.D, 0]));
    }
    return state;
  }

  measurement_function(m) {
    let measurement = matrix();
    measurement.resize([this.D, 1]);
    measurement = m;
    return measurement;
  }

  D;
  x;
}

export default UKF;
