const postcss = require("postcss");

const plugin = require("../lib/index.cjs");

function run(input, output, opts) {
  let result = postcss([plugin(opts)]).process(input, { from: undefined });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

const opts = {
  colors: {
    a: "#fff",
    b: "black"
  },
  groups: {
    A01: ["a", "b"],
    A02: ["a", "b"]
  },
  themeSelector: ["light", "dark"]
};

it("rc fn selector", function () {
  run(
    "div a {color: rc(A01); background: red;}",
    `div a {color: #fff; background: red;}
html[data-theme-rc='light'] div a {color: #fff;}
html[data-theme-rc='dark'] div a {color: black;}`,
    opts
  );
});

it("not rc fn selector", function () {
  run("div {color: red;}", "div {color: red;}", opts);
});

it("name not is rc", function () {
  run("div {color: red; background: ra(A01);}", "div {color: red; background: ra(A01);}", opts);
});

it("themeSelector is empty array", function () {
  const params = Object.assign({}, opts);
  params.themeSelector = [];
  try {
    let result = postcss([plugin(params)]).process("div {color: red;}", {
      from: undefined
    });
    expect(result.css).toEqual("div {color: red;}");
  } catch (e) {
    expect(
      e.toString().includes("params:themeSelector is not empty array")
    ).toBeTruthy();
  }
});

it("themeSelector not is array", function () {
  const params = Object.assign({}, opts);
  params.themeSelector = {};
  try {
    let result = postcss([plugin(params)]).process("div {color: red;}", {
      from: undefined
    });
    expect(result.css).toEqual("div {color: red;}");
  } catch (e) {
    expect(
      e.toString().includes("params:themeSelector must be an array")
    ).toBeTruthy();
  }
});

it("Incorrect length of groups", function () {
  const opts = {
    colors: {
      a: "#fff",
      b: "black"
    },
    groups: {
      A01: ["a"],
      A02: []
    },
    themeSelector: ["light", "dark"]
  };
  try {
    let result = postcss([plugin(opts)]).process("div {color: red;}", {
      from: undefined
    });
    expect(result.css).toEqual("div {color: red;}");
  } catch (e) {
    expect(
      e
        .toString()
        .includes(
          "params:groups The length of the array in the object must be consistent with the length of the themeSelector"
        )
    ).toBeTruthy();
  }
});

it("groups element must is a array", function () {
  const opts = {
    colors: {
      a: "#fff",
      b: "black"
    },
    groups: {
      A01: 1,
      A02: []
    },
    themeSelector: ["light", "dark"]
  };
  try {
    let result = postcss([plugin(opts)]).process("div {color: red;}", {
      from: undefined
    });
    expect(result.css).toEqual("div {color: red;}");
  } catch (e) {
    expect(
      e
        .toString()
        .includes(
          "params:groups element must is a array"
        )
    ).toBeTruthy();
  }
});
