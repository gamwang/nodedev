var d3 = require('d3');
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
        .ticks(10, "%");

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
        .text('hour');


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
            return height - 10 * d;
        })
        .attr("width", function(d, i) {
            return width / data.length - barPadding;
        })
        .attr("height", function(d, i) {
            return 10 * d;
        })


}

