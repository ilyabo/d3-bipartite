# d3-bipartite  

A [D3](http://d3js.org/) layout for drawing weighted bipartite graphs:

Live examples (on Observable): [simple](https://beta.observablehq.com/@ilyabo/weighted-bipartite-graph), [colored by source](https://beta.observablehq.com/@ilyabo/weighted-bipartite-graph-colored-by-source)


<img src="example.png" style="width:250px">
 
Usage:

      var bipartite = require('d3-bipartite');
    
      var layout = bipartite()
          .width(800)
          .height(600)
          .padding(10)
          .source(function(d) { return d.source })
          .target(function(d) { return d.target })
          .value(function(d) { return d.value });
  
      var result = layout(flows);
      
The input data in ```flows``` should have the following sturcture:



      [
        {
          source: 6631,
          target: 6535,
          value: 6631
        },
        {
          source: 6532,
          target: 6535,
          value: 1004
        },
        ...
      ]
      
      
The result of the layout will look like:



      {
        sources: [
           {
             key: 6631
             
             // node position and size 
             x: 0
             y: 10
             height: 91
             
             // total value of this node (sum of all outgoing flows' weights) 
             value: 48220
             
             
             // the flows starting from this node
             values: []  // refers to the same objects as in flows
             
             // max weight of the outgoing flows
             max: 26802
           }
           ...           
        ]
        
        targets: [
          // analogous to sources        
        ]
        
        flows: [
          {
            source: 6631
            target: 6535
            thickness: 51

            start: {
              height: 51
              x: 0
              y: 10
            }
            end: {
              height: 51
              x: 110
              y: 0
            }
            
            path: "M0,35.547679558566976C55,35.547679558566976 55,25.547679558566962 110,25.547679558566962"
            
            // the correspoding object from the input array of data
            original: Object
          }
          ...
        ]
        
      }
      
      
# Future work

Implement crossing minimization:
 [1](https://books.google.ch/books?id=W6hqCQAAQBAJ&lpg=PA101&ots=a5Z6eE-91k&dq=layer%20by%20layer%20sweep%20crossing&pg=PA107#v=onepage&q=layer%20by%20layer%20sweep%20crossing&f=false),
 [2](http://www2.isikun.edu.tr/personel/cesimerten/wolfsubmission_112.pdf),
 [3](http://sydney.edu.au/engineering/it/~visual/valacon/pdf/lanbo_crossing.pdf),
 [4](http://ira.informatik.uni-freiburg.de/papers/2003/1_eschbach_guenther_becker.pdf)


# Related work

* Nice [interactive bipartite example](http://bl.ocks.org/NPashaP/raw/9796212/) 
(not using this library).
* [Rendering a bipartite graph](http://pedroj.github.io/d3Network_test/d3Network_files/widget2_markup.html) 
  using [D3 sankey plugin](https://github.com/d3/d3-plugins/tree/master/sankey).
