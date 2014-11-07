var clamp = function(x, min, max) {
  return x > max ? max : x < min ? min : x;
};

var dragmove = function(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr('cx', x).attr('cy', y);
};

var drag = d3.behavior.drag().on("drag", dragmove);

var boardHeight = d3.select('svg').attr('height');
var boardWidth = d3.select('svg').attr('width');

var initializeEnemies = function(enemyCount) {
  //Create enemies
  var enemyData = _.range(0, enemyCount).map(function() {
    return {
      cx: clamp((Math.random() * boardWidth), 10, boardWidth - 10),
      cy: clamp((Math.random() * boardHeight), 10, boardHeight - 10)
    };
  });

  d3.select('svg')
    .selectAll('.enemy')
    .data(enemyData)
    .enter()
    .append('circle')
    .attr('cx', function(d) { return d.cx; } )
    .attr('cy', function(d) { return d.cy; } )
    .attr('r', 0)
    .attr('class', 'enemy')
    .transition().duration(1000)
    .attr('r', 10);
};

var updateEnemies = function(enemyCount) {
  var newPosition = _.range(0, enemyCount).map(function() {
    return {
      cx: clamp((Math.random() * boardWidth), 10, boardWidth - 10),
      cy: clamp((Math.random() * boardHeight), 10, boardHeight - 10)
    };
  });

  d3.selectAll('.enemy')
    .data(newPosition)
    .transition().duration(2000)
    .attr('cx', function(d) { return d.cx; } )
    .attr('cy', function(d) { return d.cy; } );
};

var initializePlayer = function() {
  d3.select('#player')
    .attr('cx', boardWidth / 2)
    .attr('cy', boardHeight / 2)
    .attr('r', 8)
    .attr('fill', 'red')
    .call(drag);
};




initializeEnemies(30);
initializePlayer();
setInterval(updateEnemies.bind(null, 30), 2000);



