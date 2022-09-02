const postcss = require("postcss");

const plugin = require("../lib/index.cjs");

function run(input, output, opts) {
  let result = postcss([plugin(opts)]).process(input, { from: undefined });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it("rc fn selector", function () {
  run(
    `
    a {
      color: rc(A01);
      background: red;
    }
  `,
    "",
    {
      colors: {
        a: "#fff",
        b: "black"
      },
      groups: {
        A01: ["a", "b"],
        A02: ["a", "b"]
      },
      themeSelector: ["light", "dark"]
    }
  );
});
