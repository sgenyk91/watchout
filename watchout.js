var initializeEnemies = function(enemyCount) {
  var boardHeight = d3.select('svg').attr('height');
  var boardWidth = d3.select('svg').attr('width');

  //Create enemies
  var enemyData = _.range(0, 30).map(function() {
    return {
      cx: clamp((Math.random() * boardWidth), 10, boardWidth - 10),
      cy: clamp((Math.random() * boardHeight), 10, boardHeight - 10)
    };
  });

  d3.select('svg')
    .selectAll('circle')
    .data(enemyData)
    .enter()
    .append('circle')
    .attr('cx', function(d) { return d.cx; } )
    .attr('cy', function(d) { return d.cy; } )
    .attr('r', 0)
    .transition().duration(1000)
    .attr('r', 10);

};

var clamp = function(x, min, max) {
  return x > max ? max : x < min ? min : x;
};

initializeEnemies(30);




