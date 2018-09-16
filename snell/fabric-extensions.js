/** Rotates fabric.Object around (xC,yC) by rotationAngle (clockwise)
 * @param xC float: x-coord of rotation center
 * @param yC float: y-coord of rotation center
 * @param angle float: angle of clockwise rotation (radians)
 */
fabric.Object.prototype.rotateTo = function(xC, yC, angle)
{
    this.angle = angle;
    var x = this.left;
    this.left = (x-xC) * Math.cos(angle) - (this.top-yC) * Math.sin(angle) + xC;
    this.top = (x-xC) * Math.sin(angle) + (this.top-yC) * Math.cos(angle) + yC;
}