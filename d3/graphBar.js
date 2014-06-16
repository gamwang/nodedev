global._ = require('underscore');
var d3 = require('d3');

var ci = require('../statistics/confidenceInterval').ci;
var stddev = require('../statistics/stddev').stddev;

function graph(data, title) {
    //Margin, Width and height
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    };
    var width = 500 - margin.left - margin.right;
    var height = 1000 - margin.top - margin.bottom;

    //x domain 
    //oridnal means discrete domain
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
    x.domain(data.map(function(d, i) {
        return i;
    }));

    //y domain
    var y = d3.scale.linear()
        .range([height, 0]);

    // Setting up Axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(100, "%");

    //appending Axis
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr('font-size', '20px')
        .attr("x", width - 6)
        .attr("y", 16)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text('hour (PST)');


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr('font-size', '20px')
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(title);


    //fill up rectangles; grows from up to bottom.
    var barPadding = 1;
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) {
            return i * width / data.length;
        })
        .attr("y", function(d, i) {
            return height - height * d;
        })
        .attr("width", function(d, i) {
            return width / data.length - barPadding;
        })
        .attr("height", function(d, i) {
            return height * d;
        })
    // appending confidence Interval

    svg.selectAll(".line")
        .data(data)
        .enter()
        .append('line')
        .attr('class', "line")
        .attr('x1', function(d, i) {
            return i * width / data.length + width / data.length / 2;
        })
        .attr('x2', function(d, i) {
            return i * width / data.length + width / data.length / 2;
        })
        .attr('y1', function(d, i) {
            return height - height * d + stddev(d, 1000) * height;
        })
        .attr('y2', function(d, i) {
            return height - height * d - stddev(d, 1000) * height;
        })
        .attr('stroke-width', 2)
        .attr('stroke', "black");
}
module.exports.graph = graph;
