import * as d3 from "d3";
console.log("d3", d3);

var tokyo =
[
 [ "2014/05/21", "20", "16" ],
 [ "2014/05/22", "24", "16" ],
 [ "2014/05/23", "25", "16" ],
 [ "2014/05/24", "25", "16" ],
 [ "2014/05/25", "28", "19" ],
 [ "2014/05/16", "25", "19" ],
 [ "2014/05/27", "23", "18" ]
];
// const w = 1000;
// const h = 500;
// var svg = d3.select("#container")
//             .append("svg")
//             .attr("width", w)
//             .attr("height", h);

// const xAxisPadding = 10;
// const padding = 10;
// var xScale = d3.time.scale()
//   .domain([
//         new Date(2014, 4, 21),
//         new Date(2014, 4, 27)
//     ])
//     .range([padding, w - xAxisPadding - padding]);

// var yScale = d3.scale.linear()
//   .domain([30, 0])
//   .range([padding, h - yAxisPadding - padding]);

const svg = d3.select("body")
  .append("div")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 500);

var dataset =
  [ [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88] ];
svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", function(d) { return d[0]; })
  .attr("cy", function(d) { return d[1]; })
  .attr("r", 4);
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", function(d) { return d[0]; })
    .attr("y", function(d) { return d[1]; })
    .attr("fill", "red")
    .text(function(d) {
      return d[0] + "," + d[1];
    });
var width = 400;
var height = 300;
var xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d){return d[0];})])
  .range([0, width]);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d){return d[1];})])
  .range([height, 0]);

svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", function(d) { return xScale(d[0]); })
  .attr("cy", function(d) { return yScale(d[1]); })
  .attr("r", 4);

var dataset = [ 5, 10, 15, 20, 25 ];
d3.select("body").selectAll("p")
  .data(dataset)
  .enter()
  .append("p")
  .text(d => {
    return d;
  });
