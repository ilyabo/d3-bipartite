const definition = require("./package.json");
const dependencies = Object.keys(definition.dependencies || {});

export default {
  input: 'src/index.js',
  external: dependencies,
  output: {
    extend: true,
    file: 'dist/d3-bipartite.js',
    format: 'umd',
    globals: dependencies.reduce((p, v) => (p[v] = "d3", p), {}),
    name: 'd3bipartite'
  }
};