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
    .append('image')
    .attr('x', function(d) { return d.cx; } )
    .attr('y', function(d) { return d.cy; } )
    .attr('xlink:href', 'asteroid.png')
    .attr('height', 0)
    .attr('width', 0)
    // .attr('r', 0)
    // .attr('fill', 'url(#image)')
    .attr('class', 'enemy')
    // .attr('stroke', 'white')
    // .attr('stroke-width', 2)
    .transition().duration(1000)
    // .attr('r', 10);
    .attr('height', 25)
    .attr('width', 25);
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
    .attr('x', function(d) { return d.cx; } )
    .attr('y', function(d) { return d.cy; } );
};

var initializePlayer = function() {
  d3.select('#player')
    .attr('cx', boardWidth / 2)
    .attr('cy', boardHeight / 2)
    .attr('r', 8)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('fill', 'white');
    // .call(drag);

  d3.select('svg').on('mousemove', function() {
    var coor = d3.mouse(this);
    d3.select('#player').attr('cx', coor[0]).attr('cy', coor[1]);;
  });
};

var isColliding = function() {
  var enemies = d3.selectAll('.enemy');
  var player = d3.select('#player');

  var playerX = player.attr('cx');
  var playerY = player.attr('cy');
  var playerRadius = Number(player.attr('r') );

  var hasCollided = false;

  enemies.each(function(d, i) {
    var enemyX = this.getAttribute('x');
    var enemyY = this.getAttribute('y');
    var enemyRadius = 10;

    var distance = Math.sqrt(Math.pow((playerX - enemyX), 2) + Math.pow((playerY - enemyY), 2));
    var combinedRadii = playerRadius + enemyRadius;
    if (distance < (combinedRadii) ) hasCollided = true;
  });
  if (hasCollided) incrementCollisions();
  return hasCollided;
};

var incrementCollisions = function() {
  var span = document.getElementById('collisions').children[0];
  var catcher = Number(span.innerHTML);
  span.innerHTML = (catcher + 1).toString();
  updateHighScore();
};

var incrementCurrentScore = function() {
  var spanHigh = document.getElementById('high').children[0];
  var spanCurrent = document.getElementById('current').children[0];

  var catcherCurrent = Number(spanCurrent.innerHTML);
  spanCurrent.innerHTML = (catcherCurrent + 1).toString();

  if (catcherCurrent > Number(spanHigh.innerHTML) ) {
    spanHigh.innerHTML = spanCurrent.innerHTML;
  }
};

var updateHighScore = function() {
  var spanHigh = document.getElementById('high').children[0];
  var spanCurrent = document.getElementById('current').children[0];
  if (Number(spanCurrent.innerHTML) > Number(spanHigh.innerHTML)) {
    spanHigh.innerHTML = Number(spanCurrent.innerHTML);
  }
  spanCurrent.innerHTML = 0;
};

initializeEnemies(30);
initializePlayer();
setInterval(isColliding, 50);
setInterval(updateEnemies.bind(null, 30), 2000);
setInterval(incrementCurrentScore, 1);





