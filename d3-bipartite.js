var d3 = require('d3');

function defaultSource(d) { return d.source; }
function defaultTarget(d) { return d.target; }
function defaultValue(d) { return d.value; }
function nodeValue(d) { return d.value }

function nodeTotals(flows, accessor) {
  var nodes = d3.nest()
    .key(accessor)
    .entries(flows);

  nodes.forEach(function(node) {
    node.value = d3.sum(node.values, nodeValue);
    node.max = d3.max(node.values, nodeValue);
  });

  // sort nodes by their max flow values
  nodes.sort(function(a, b) { return d3.descending(a.max, b.max) });

  return nodes;
}

function layout(nodes, padding, x, height, side, y0, k) {
  var i, node, h,
      y = y0 + (height - padding * (nodes.length - 1) - d3.sum(nodes, nodeValue) * k)/2;

  for (i = 0; i < nodes.length; i++) {
    node = nodes[i];
    h = nodeValue(node) * k;
    if (side) {
      node[side] = { x: x, y: y, height: h };
    } else {
      node.x = x; node.y = y; node.height = h;
    }
    y += h + padding;
  }
}

function scaleK(nodes, height, padding) {
  return (height - padding * (nodes.length - 1)) / d3.sum(nodes, nodeValue);
}

function link(d, curvature) {
   var x0 = d.start.x,
       x1 = d.end.x,
       xi = d3.interpolateNumber(x0, x1),
       x2 = xi(curvature),
       x3 = xi(1 - curvature),
       y0 = d.start.y + d.thickness / 2,
       y1 = d.end.y + d.thickness / 2;
   return "M" + x0 + "," + y0
        + "C" + x2 + "," + y0
        + " " + x3 + "," + y1
        + " " + x1 + "," + y1;
}

module.exports = function() {

  var source = defaultSource,
      target = defaultTarget,
      value = defaultValue,
      wrap = function(d) {
        return {
          source: source(d),
          target: target(d),
          value: value(d),
          original: d
        } 
      },
      padding = 5,
      width = 100, height = 100, k,
      curvature = .5;

  var bipartite = function(_flows) {

    var flows = _flows.map(wrap),
        sources = nodeTotals(flows, defaultSource),
        targets = nodeTotals(flows, defaultTarget);

    k = Math.min(scaleK(sources, height, padding), scaleK(targets, height, padding));

    layout(sources, padding, 0, height, null, 0, k);
    sources.forEach(function(node) {
      layout(node.values, 0, 0, node.height, 'start', node.y, k);
    });

    layout(targets, padding, width, height, null, 0, k);
    targets.forEach(function(node) {
      layout(node.values, 0, width, node.height, 'end', node.y, k);
    });

    flows.forEach(function(flow) {
      flow.thickness = k * flow.value;
      flow.path = link(flow, curvature);
    });

    return {
      flows: flows,
      sources: sources,
      targets: targets
    };
  };
    
  bipartite.width = function(_) {
    return arguments.length ? (width = _, bipartite) : width;
  };
  bipartite.height = function(_) {
    return arguments.length ? (height = _, bipartite) : height;
  };
  bipartite.source = function(_) {
    return arguments.length ? (source = _, bipartite) : source;
  };
  bipartite.target = function(_) {
    return arguments.length ? (target = _, bipartite) : target;
  };
  bipartite.value = function(_) {
    return arguments.length ? (value = _, bipartite) : value;
  };
  bipartite.padding = function(_) {
    return arguments.length ? (padding = _, bipartite) : padding;
  };




  return bipartite;

};