var d3 = require('d3');
var _ = require('underscore');

function getMean(d) {
    //fill this in.
}

function getStd(d) {
    //fill this in.
}

function graph(data, title, cb) {
    //Margin, Width and height
    if (_.isFunction(cb)) {
        cb();
    }
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
    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);

    var mean = getMean(data);
    var standardDeviation = getStd(data);

    x.domain(mean.map(function(d, i) {
        return i;
    }));

    //y domain
    var y = d3.scale.linear()
        .range([height, 0]);

    // Setting up Axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(100, '%');

    //appending Axis
    var svg = d3.select('body').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var gX = svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .append('text')
        .attr('font-size', '20px')
        .attr('x', width - 6)
        .attr('y', 16)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('hour (PST)');


    var gY = svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('font-size', '20px')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text(title);


    //fill up rectangles; grows from up to bottom.
    var barPadding = 1;
    var barGraph = svg.selectAll('.bar')
        .data(mean)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d, i) {
            return i * width / mean.length;
        })
        .attr('y', function(d, i) {
            return height - height * mean[i];
        })
        .attr('width', function(d, i) {
            return width / mean.length - barPadding;
        })
        .attr('height', function(d, i) {
            return height * mean[i];
        });

    // appending confidence Interval
    var stdLine = svg.selectAll('.line')
        .data(standardDeviation)
        .enter()
        .append('line')
        .attr('class', 'line')
        .attr('x1', function(d, i) {
            return i * width / mean.length + width / mean.length / 2;
        })
        .attr('x2', function(d, i) {
            return i * width / mean.length + width / mean.length / 2;
        })
        .attr('y1', function(d, i) {
            return height - height * mean[i] + standardDeviation[i] * height;
        })
        .attr('y2', function(d, i) {
            return height - height * mean[i] - standardDeviation[i] * height;
        })
        .attr('stroke-width', 3)
        .attr('stroke', 'orange');

    var interpMean = d3.svg.line()
        .x(function(d, i) {
            return i * width / mean.length + width / mean.length / 2;
        })
        .y(function(d, i) {
            return height - (height * mean[i]);
        })
        .interpolate("linear");

    var interpUp = d3.svg.line()
        .x(function(d, i) {
            return i * width / mean.length + width / mean.length / 2;
        })
        .y(function(d, i) {
            return height - (height * (mean[i] + d));
        })
        .interpolate("linear");
    var interpDown = d3.svg.line()
        .x(function(d, i) {
            return i * width / mean.length + width / mean.length / 2;
        })
        .y(function(d, i) {
            return height - (height * (mean[i] - d));
        })
        .interpolate("linear");

    var interpolation = svg.append("g");

    interpolation.append("path")
        .attr('d', interpMean(mean))
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', 'red');

    interpolation.append("path")
        .attr('d', interpUp(standardDeviation))
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', 'orange');
    interpolation.append("path")
        .attr('d', interpDown(standardDeviation))
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', 'orange');
}

module.exports.graph = graph;
