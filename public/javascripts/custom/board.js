var COLORS = ["blue", "green", "purple", "red", "yellow"];

function Board(width) {
  this.width = width;
  this.dots = [];
  this.score = 0;
}

Board.prototype.randomColor = function() {
  var color = COLORS[Math.floor(Math.random()*COLORS.length)];
  return color;
}

Board.prototype.makeBoard = function() {
  var html = this.makeHTML();
  $("#board").html(html);
}

Board.prototype.makeHTML = function() {
  var html = "<table class=\"table\">";
  var htmlEnd = "</table>";
  for (var yAxis = 0; yAxis < this.width; yAxis++ ) {
    html += this.makeRow(yAxis);
  }
  return html + htmlEnd;
};

Board.prototype.makeRow = function(yAxis) {
  var html = "<tr>";
  var htmlEnd = "</tr>";
  var rowDots = [];
  for (var xAxis = 0; xAxis < this.width; xAxis++ ) {
    var dot = this.makeDot(xAxis, yAxis);
    rowDots.push(dot);
    html += dot.html();
  }
  this.dots.push(rowDots);
  return html + htmlEnd;
};

Board.prototype.makeDot = function(xAxis, yAxis) {
  var color = this.randomColor;
  var coordinates = [xAxis, yAxis];
  var dot = new Dot(coordinates, color, this);
  this.dots.push(dot);
  return dot;
};

Board.prototype.findDot = function(coordinates) {
  var xAxis = coordinates[0];
  var yAxis = coordinates[1];
  if (xAxis >= 0 && yAxis >= 0 && xAxis < this.width() && yAxis < this.width()) {
    return this.dots()[yAxis][xAxis];
  }
  return false;
};

Board.prototype.findDots = function(coords) {
  var foundDots = [];
  coords.forEach(function(coordinates) {
    var found = this.findDot(coordinates);
    if (found) foundDots.push(found);
  });
  return foundDots;
}