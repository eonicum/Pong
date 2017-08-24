CanvasRenderingContext2D.prototype.box = function(x, y, width, height) {
    this.fillRect(x - width / 2, y - height / 2, width, height);
}

CanvasRenderingContext2D.prototype.circle = function(x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, 2 * Math.PI, true);
    this.closePath();
    this.fill();
}

CanvasRenderingContext2D.prototype.line = function(fromX, fromY, toX, toY) {
    this.beginPath();
    this.moveTo(fromX, fromY);
    this.lineTo(toX, toY);
    this.stroke();
}

Math.clamp = function(value, min, max) {
    if (value > max)
        return max;

    if (value < min)
        return min;

    return value;
}