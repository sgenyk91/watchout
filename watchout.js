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
    .transition().duration(1000)
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

var isColliding = function() {
  var enemies = d3.selectAll('.enemy');
  var player = d3.select('#player');

  var playerX = player.attr('cx');
  var playerY = player.attr('cy');
  var playerRadius = Number(player.attr('r') );

  var hasCollided = false;

  enemies.each(function(d, i) {
    var enemyX = this.getAttribute('cx');
    var enemyY = this.getAttribute('cy');
    var enemyRadius = 10;

    var distance = Math.sqrt(Math.pow((playerX - enemyX), 2) + Math.pow((playerY - enemyY), 2));
    var combinedRadii = playerRadius + enemyRadius;
    if (distance < (combinedRadii) ) hasCollided = true;
  });
  return hasCollided;
};


initializeEnemies(1);
initializePlayer();
setInterval(isColliding, 50);
setInterval(  updateEnemies.bind(null, 1), 2000);





