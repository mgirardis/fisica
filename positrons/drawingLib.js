/* To use this lib, the variables stage and tc must be
 * alreagy instantiated as global variables
 */

function drawVector(p1, p2, _color, _width) {
	var stam, sang, xi, yi, xf1, yf1, xf2, yf2;
	var vang, nxi, nyi, nxf1, nyf1, nxf2, nyf2;
	var wDeltaX, wDeltaY;

	// draws the line
	drawLine(p1, p2, _color, _width);

	// drawing arrow
	
	// calculating arrow length
	// it is proportional to the smallest size of the world
	wDeltaX = tc.getWorldWidth();
	wDeltaY = tc.getWorldHeight();
	stam = wDeltaX >= wDeltaY? wDeltaY : wDeltaX;
	stam *= 0.02;

	sang = Math.PI / 8;
	xi = yi = 0;
	xf1 = xi - stam * Math.cos(sang);
	yf1 = yi - stam * Math.sin(sang);
	xf2 = xi - stam * Math.cos(sang);
	yf2 = yi + stam * Math.sin(sang);

	vang = p2[1] == p1[1]? 0 : Math.atan((p2[1] - p1[1]) / (p2[0] - p1[0])); //if (p2[1] == p1[1]) vang = 0;
	if (p2[0] < p1[0]) vang = vang + Math.PI;

	nxi = xi + p2[0];
	nyi = yi + p2[1];
	nxf1 = p2[0] + Math.cos(vang) * xf1 - Math.sin(vang) * yf1;
	nyf1 = p2[1] + Math.sin(vang) * xf1 + Math.cos(vang) * yf1;
	nxf2 = p2[0] + Math.cos(vang) * xf2 - Math.sin(vang) * yf2;
	nyf2 = p2[1] + Math.sin(vang) * xf2 + Math.cos(vang) * yf2;

	drawLine([nxi,nyi], [nxf1,nyf1], _color, _width);
	drawLine([nxi,nyi], [nxf2,nyf2], _color, _width);
}

function drawLine(p1, p2, _color, _width) {
	stage.beginPath();
	stage.moveTo(tc.cx(p1[0]), tc.cy(p1[1]));
	stage.lineTo(tc.cx(p2[0]), tc.cy(p2[1]));
	stage.lineWidth = _width;
	stage.strokeStyle = _color;
	stage.closePath();
	stage.stroke();
}

function drawPoint(p, _color, _radius) {
	stage.beginPath();
	stage.arc(tc.cx(p[0]), tc.cy(p[1]), _radius, 0, 2*Math.PI, true);
	stage.fillStyle = _color;
	stage.fill();
	stage.closePath();
	stage.stroke();
}

function drawCircle(p, _color, _radius) {
	_radius = tc.canvasDist(_radius);
	stage.beginPath();
	stage.arc(tc.cx(p[0]), tc.cy(p[1]), _radius, 0, 2*Math.PI, false);
	stage.strokeStyle = _color;
	stage.lineWidth = 2;
	stage.closePath();
	stage.stroke();
}

// bl is the bottom-left coordinate on x or y
// tr is the top-right coording on x or y
function drawAxes(bl, tr, _color, _width) {
	// x
	drawVector([bl,0], [tr,0], _color, _width);

	// y
	drawVector([0,bl], [0,tr], _color, _width);
}

// color functions
// returns a color #RRGGBB on hexadecimal characters
function colorRgbToHex(R, G, B) {
	return "#" + colorDecToHex(R) + colorDecToHex(G) + colorDecToHex(B);
}

function colorDecToHex(dec) {
	var hexChars = "0123456789ABCDEF";
	if (dec > 255) return "FF";
	if (dec < 0) return "00";
	var i = Math.floor(dec/16);
	var j = dec%16;
	return "" + hexChars.charAt(i) + hexChars.charAt(j) + "";
}