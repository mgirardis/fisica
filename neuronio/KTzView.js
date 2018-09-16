/*
Author: Mauricio Girardi-Schappo, PhD.
Distributed under GNU License v3.0

12th of July, 2016
*/
Math.sign = function(x)
{
    if (x > 0) return 1;
    if (x < 0) return -1;
    return 0;
}
Math.tanh = function(x)
{
	return (Math.exp(2.0 * x) - 1.0) / (Math.exp(2.0 * x) + 1.0);
}
Math.atanh = function(x)
{
	return Math.log((1.0 + x) / (1.0 - x)) / 2.0;
}
Math.logistic = function(x)
{
	return x / (1 + Math.abs(x));
}
Math.invlogistic = function(x)
{
	return x / (1 - Math.abs(x));
}
Math.maxInArray = function(x)
{
    var mxm = x[0];
    var i = 0, n = x.length;
    while (i < n) {
        if (x[i] > mxm) {
            mxm = x[i];
        }
        i++;
    }
    return mxm;
}
Math.minInArray = function(x)
{
    var mn = x[0];
    var i = 0, n = x.length;
    while (i < n) {
        if (x[i] < mn) {
            mn = x[i];
        }
        i++;
    }
    return mn;
}

function TransCoord(cLrg,cAlt,mxi,myi,mxf,myf)
{
    this.Bx = cLrg/(mxf-mxi);
    this.Ax = - this.Bx * mxi;
    this.By = cAlt/(myi-myf);
    this.Ay = - this.By * myf;
}
TransCoord.prototype.cx = function(mx)
{
    return this.Ax + this.Bx * mx;
}
TransCoord.prototype.cy = function(my)
{
    return this.Ay + this.By * my;
}

function Graphic2D(xMin, yMin, xMax, yMax, cnv)
{
	this.cnv = cnv;
	this.width = cnv.width;
	this.height = cnv.height;
	this.xMin = xMin;
	this.yMin = yMin;
	this.xMax = xMax;
	this.yMax = yMax;
	this.reset();
}
Graphic2D.prototype.reset = function()
{
    // creating transcoord object
    this.tc = new TransCoord(this.width, this.height, this.xMin, this.yMin, this.xMax, this.yMax);
    this.ctx = this.cnv.getContext("2d");
	this.clear();
}
Graphic2D.prototype.clear = function()
{
	this.ctx.clearRect(0, 0, this.width, this.height);
	this.drawAxes();
}
Graphic2D.prototype.drawAxes = function()
{
    this.drawLine(0,this.yMin,0,this.yMax,"black",1);
    this.drawLine(this.xMin,0,this.xMax,0,"black",1);
}
Graphic2D.prototype.plotGraphic = function(x, y, colorLine, withPoints, withLines, colorPoints, resetAxisValue)
{
    if ((!withPoints) && (!withLines))
        withLines = true;

    if (resetAxisValue)
    {
        this.xMin = Math.minInArray(x);
        this.xMax = Math.maxInArray(x);
        this.yMin = Math.minInArray(y);
        this.yMax = Math.maxInArray(y);
        this.reset();
    }

	var	n = x.length;
	var i;
	if (withPoints)
	{
		i = 0
		while (i < n)
		{
			this.drawPoint(x[i], y[i], colorPoints, 3);
			i++;
		}
	}
    if (withLines)
    {
        n--;
        i = 0;
        while (i < n)
        {
            this.drawLine(x[i],y[i],x[i+1],y[i+1],colorLine,1);
            i++;
        }
    }
}
Graphic2D.prototype.plotColoredPoints = function(x, y, colorLine, withPoints, withLines, colorPoints, resetAxisValue)
{
    if ((!withPoints) && (!withLines))
        withLines = true;

    if (resetAxisValue)
    {
        this.xMin = Math.minInArray(x);
        this.xMax = Math.maxInArray(x);
        this.yMin = Math.minInArray(y);
        this.yMax = Math.maxInArray(y);
        this.reset();
    }

	var	n = x.length;
	var i;
	if (withPoints)
	{
		i = 0
		while (i < n)
		{
			this.drawPoint(x[i], y[i], colorPoints[i], 3);
			i++;
		}
	}
    if (withLines)
    {
        n--;
        i = 0;
        while (i < n)
        {
            this.drawLine(x[i],y[i],x[i+1],y[i+1],colorLine,1);
            i++;
        }
    }
}
Graphic2D.prototype.drawPoint = function(x, y, color, rad)
{
    this.ctx.beginPath();
    this.ctx.arc(this.tc.cx(x),this.tc.cy(y),rad,0,2*Math.PI,0);
    this.ctx.fillStyle = color;
    this.ctx.fill();
}
Graphic2D.prototype.drawLine = function(x1, y1, x2, y2, color, width)
{
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.moveTo(this.tc.cx(x1),this.tc.cy(y1));
    this.ctx.lineTo(this.tc.cx(x2),this.tc.cy(y2));
    this.ctx.stroke();
}

function Output(txtArea)
{
	this.txt = txtArea;
	this.clear();
}
Output.prototype.printLn = function(txt)
{
	this.txt.value += txt + "\r\n";
}
Output.prototype.clear = function()
{
	this.txt.value = "";
}
Output.prototype.print3ColData = function(x, y, z)
{
	var n = x.length;
	var i = 0;
	while (i < n)
	{
		this.printLn(x[i] + "\t" + y[i] + "\t" + z[i]);
		i++;
	}
}

var FStimulus = function() {}
FStimulus.getStimulusType = function(type)
{
	if (type == "Delta")
	{
		return new DeltaStimulus();
	}
	else if (type == "Cos")
	{
		return new CosineStimulus();
	}
	else if (type == "Neu")
	{
		return new NeuronStimulus();
	}
	else if (type == "2Neu")
	{
		return new NeuronStimulusLoop();
	}
    else if (type == "Noi")
	{
		return new NoisyNeuronStimulus();
	}
    else if (type == "Lin")
    {
        return new LinearVaryingStimulus();
    }
    else if (type == "DelSeries")
    {
        return new DeltaSeriesStimulus();
    }
    else if (type == "FreeDel")
    {
        return new FreeDeltaStimulus();
    }
	throw "unrecognized stimulus";
}

function FreeDeltaStimulus()
{
	this.refreshToPage();
}
FreeDeltaStimulus.prototype.refreshToPage = function()
{
	this.I = new Array();
	this.sStim = new Array();
    var els = document.getElementsByName("FreeDel_I");
    for (var i = 0; i < els.length; i++)
    {
        this.I.push(parseFloat(els[i].value));
    }
    els = document.getElementsByName("FreeDel_t");
    for (var i = 0; i < els.length; i++)
    {
        this.sStim.push(parseInt(els[i].value));
    }
    this.paramSort();
    if (this.removeDuplicates())
    {
        alert("Found duplicates in FreeDeltaStimulus!\nOnly first entry of each duplicated t will be used.");
    }
}
FreeDeltaStimulus.prototype.getAmp = function()
{
	return Math.abs(Math.maxInArray(this.I));
}
FreeDeltaStimulus.prototype.getData = function (nSteps)
{
	var Iext = new Array();
    var i = 0;
    var j = 0;
    while (i < this.sStim.length)
    {
        while (j < this.sStim[i])
        {
            Iext[j] = 0.0;
            j++;
        }
        Iext[j] = this.I[i];
        j++;
        i++;
    }
    while (j < nSteps)
    {
        Iext[j] = 0.0;
        j++;
    }
	return Iext;
}
FreeDeltaStimulus.prototype.removeDuplicates = function()
{
    var hasDup = false;
    var temp = this.sStim[0];
    for (var i = 1; i < this.sStim.length; i++)
    {
        if (temp == this.sStim[i])
        {
            this.sStim.splice(i, 1);
            this.I.splice(i, 1);
            hasDup = true;
        }
        else
        {
            temp = this.sStim[i];
        }
    }
    return hasDup;
}
FreeDeltaStimulus.prototype.paramSort = function() {
    if (this.sStim.length != this.I.length)
    {
        throw "Arrays should be the same length!";
    }
    var i, j;
    var newarray = this.sStim.slice(0);
    var newarrayB = this.I.slice(0);
    var swap = function(j, k) {
      var temp = newarray[j];
      newarray[j] = newarray[k];
      newarray[k] = temp;
      var tempP = newarrayB[j];
      newarrayB[j] = newarrayB[k];
      newarrayB[k] = tempP;
      return(true);
    }
    var swapped = false;
    for(i=1; i<newarray.length; i++) {
      for(j=0; j<newarray.length - i; j++) {
        if (newarray[j+1] < newarray[j]) {
          swapped = swap(j, j+1, this.I);
        }
      }
      if (!swapped) break;
    }
    this.sStim = newarray;
    this.I = newarrayB;
}

function DeltaSeriesStimulus()
{
	this.refreshToPage();
}
DeltaSeriesStimulus.prototype.refreshToPage = function()
{
	this.I = parseFloat(document.getElementById("DelSeries_I").value);
	this.nStim = parseInt(document.getElementById("DelSeries_nStim").value);
	this.sStim = parseInt(document.getElementById("DelSeries_sStim").value);
	this.dt = parseInt(document.getElementById("DelSeries_dt").value);
    this.osc = parseInt(document.getElementById("DelSeries_osc").value);
    this.oscPulse = parseInt(document.getElementById("DelSeries_oscPulse").value);
    this.dtS = parseInt(document.getElementById("DelSeries_dtS").value);
    this.nSer = parseInt(document.getElementById("DelSeries_nSer").value);
}
DeltaSeriesStimulus.prototype.getAmp = function()
{
	return Math.abs(this.I);
}
DeltaSeriesStimulus.prototype.setParams = function(I, nStim, sStim, dt, osc, dtS, nSer)
{
	this.I = I;
	this.nStim = nStim;
	this.sStim = sStim;
	this.dt = dt;
    this.osc = osc;
    this.dtS = dtS;
    this.nSer = nSer;
}
DeltaSeriesStimulus.prototype.getData = function (nSteps)
{
	var Iext = new Array();
	
	// setting the values of the external current during all simulation interval
	var j = 0;
    var nextStimulus = this.sStim;
    var i = 0;
    while (i < this.nSer)
    {
        var k = 0;
        while (k < this.nStim)
        {
            while (j < nextStimulus)
            {
                Iext[j] = 0.0;
                j++;
            }
            Iext[j] = Math.pow(this.oscPulse, i) * Math.pow(this.osc, k) * this.I;
            j++;
            nextStimulus += this.dt;
            k++;
        }
        nextStimulus += Math.abs(this.dtS - this.dt);
        i++;
    }
	while (j < nSteps)
	{
		Iext[j] = 0.0;
		j++;
	}
	return Iext;
}

function NoisyNeuronStimulus()
{
	this.refreshToPage();
}
NoisyNeuronStimulus.prototype.refreshToPage = function()
{
	/*var K = parseFloat(document.getElementById("K").value);
	var T = parseFloat(document.getElementById("T").value);
	var d = parseFloat(document.getElementById("d").value);
	var l = parseFloat(document.getElementById("l").value);
	var xR = parseFloat(document.getElementById("xR").value);
	var x0 = parseFloat(document.getElementById("x0").value);
	var y0 = parseFloat(document.getElementById("y0").value);
	var z0 = parseFloat(document.getElementById("z0").value);*/
	var I = parseFloat(document.getElementById("Noi_I").value);
	var nStim = parseFloat(document.getElementById("Noi_nStim").value);
	var sStim = parseFloat(document.getElementById("Noi_sStim").value);
	var dt = parseFloat(document.getElementById("Noi_dt").value);
	var J = parseFloat(document.getElementById("Noi_J").value);
    var R = parseFloat(document.getElementById("Noi_R").value);
	var tauf = parseFloat(document.getElementById("Noi_tauf").value);
	var taug = parseFloat(document.getElementById("Noi_taug").value);
	//this.setParams(K, T, d, l, xR, x0, y0, z0, I, nStim, sStim, dt, J, R, tauf, taug);
	this.setParams(I, nStim, sStim, dt, J, R, tauf, taug);
}
NoisyNeuronStimulus.prototype.setParams = function(I, nStim, sStim, dt, J, R, tauf, taug)
{
	//this.neuron = new KTzNeuron(x0, y0, z0, K, T, d, l, xR);
	this.neuron = FNeuron.getNeuronType(document.getElementById("neuronTypeCbx").value);
	this.synapse = new KTNoisyChemicalSynapse(tauf, taug, J, R);
	this.stimulus = FStimulus.getStimulusType("Delta");
	this.stimulus.setParams(I, nStim, sStim, dt);
}
NoisyNeuronStimulus.prototype.getAmp = function()
{
	return Math.abs(this.synapse.tauf * this.synapse.taug * this.synapse.J) / 4;
}
NoisyNeuronStimulus.prototype.getData = function(nSteps)
{
	var Iext = new Array(nSteps);
	var Itemp = this.stimulus.getData(nSteps);
	var i = 0;
	while (i < nSteps)
	{
		this.synapse.evaluate(this.neuron.get_x());
		this.neuron.evaluate(Itemp[i]);
		Iext[i] = this.synapse.get_f();
		i++;
	}
	return Iext;
}

function NeuronStimulus()
{
	this.refreshToPage();
}
NeuronStimulus.prototype.refreshToPage = function()
{
	/*var K = parseFloat(document.getElementById("K").value);
	var T = parseFloat(document.getElementById("T").value);
	var d = parseFloat(document.getElementById("d").value);
	var l = parseFloat(document.getElementById("l").value);
	var xR = parseFloat(document.getElementById("xR").value);
	var x0 = parseFloat(document.getElementById("x0").value);
	var y0 = parseFloat(document.getElementById("y0").value);
	var z0 = parseFloat(document.getElementById("z0").value);*/
	var I = parseFloat(document.getElementById("Neu_I").value);
	var nStim = parseFloat(document.getElementById("Neu_nStim").value);
	var sStim = parseFloat(document.getElementById("Neu_sStim").value);
	var dt = parseFloat(document.getElementById("Neu_dt").value);
	var J = parseFloat(document.getElementById("Neu_J").value);
	var tauf = parseFloat(document.getElementById("Neu_tauf").value);
	var taug = parseFloat(document.getElementById("Neu_taug").value);
	//this.setParams(K, T, d, l, xR, x0, y0, z0, I, nStim, sStim, dt, J, tauf, taug);
	this.setParams(I, nStim, sStim, dt, J, tauf, taug);
}
//NeuronStimulus.prototype.setParams = function(K, T, d, l, xR, x0, y0, z0, I, nStim, sStim, dt, J, tauf, taug)
NeuronStimulus.prototype.setParams = function(I, nStim, sStim, dt, J, tauf, taug)
{
	//this.neuron = new KTzNeuron(x0, y0, z0, K, T, d, l, xR);
	this.neuron = FNeuron.getNeuronType(document.getElementById("neuronTypeCbx").value);
	this.synapse = new KTChemicalSynapse(tauf, taug, J);
	this.stimulus = FStimulus.getStimulusType("Delta");
	this.stimulus.setParams(I, nStim, sStim, dt);
}
NeuronStimulus.prototype.getAmp = function()
{
	return Math.abs(this.synapse.tauf * this.synapse.taug * this.synapse.J) / 4;
}
NeuronStimulus.prototype.getData = function(nSteps)
{
	var Iext = new Array(nSteps);
	var Itemp = this.stimulus.getData(nSteps);
	var i = 0;
	while (i < nSteps)
	{
		this.synapse.evaluate(this.neuron.get_x());
		this.neuron.evaluate(Itemp[i]);
		Iext[i] = this.synapse.get_f();
		i++;
	}
	return Iext;
}

function NeuronStimulusLoop()
{
	this.refreshToPage();
}
NeuronStimulusLoop.prototype.refreshToPage = function()
{
	/*var K = parseFloat(document.getElementById("K").value);
	var T = parseFloat(document.getElementById("T").value);
	var d = parseFloat(document.getElementById("d").value);
	var l = parseFloat(document.getElementById("l").value);
	var xR = parseFloat(document.getElementById("xR").value);
	var x0 = parseFloat(document.getElementById("x0").value);
	var y0 = parseFloat(document.getElementById("y0").value);
	var z0 = parseFloat(document.getElementById("z0").value);*/
	var I = parseFloat(document.getElementById("2Neu_I").value);
	var nStim = parseFloat(document.getElementById("2Neu_nStim").value);
	var sStim = parseFloat(document.getElementById("2Neu_sStim").value);
	var dt = parseFloat(document.getElementById("2Neu_dt").value);
	var J = parseFloat(document.getElementById("2Neu_J").value);
	var tauf = parseFloat(document.getElementById("2Neu_tauf").value);
	var taug = parseFloat(document.getElementById("2Neu_taug").value);
	//this.setParams(K, T, d, l, xR, x0, y0, z0, I, nStim, sStim, dt, J, tauf, taug);
	this.setParams(I, nStim, sStim, dt, J, tauf, taug);
}
//NeuronStimulusLoop.prototype.setParams = function(K, T, d, l, xR, x0, y0, z0, I, nStim, sStim, dt, J, tauf, taug)
NeuronStimulusLoop.prototype.setParams = function(I, nStim, sStim, dt, J, tauf, taug)
{
	//this.neuron = new KTzNeuron(x0, y0, z0, K, T, d, l, xR);
	this.neuron = new Array(
		FNeuron.getNeuronType(document.getElementById("neuronTypeCbx").value), // neuron[0]
		FNeuron.getNeuronType(document.getElementById("neuronTypeCbx").value)); // neuron[1]
	this.synapse = new Array(
		new KTChemicalSynapse(tauf, taug, J), // synapse generated by neuron[0]
		new KTChemicalSynapse(tauf, taug, J)); // synapse generated by neuron[1]
	this.stimulus = FStimulus.getStimulusType("Delta");
	this.stimulus.setParams(I, nStim, sStim, dt);
}
NeuronStimulusLoop.prototype.getAmp = function()
{
	return this.stimulus.getAmp() + Math.abs(this.synapse.tauf * this.synapse.taug * this.synapse.J) / 4;
}
NeuronStimulusLoop.prototype.getData = function(nSteps)
{
	var Iext = new Array(nSteps);
	var Itemp = this.stimulus.getData(nSteps);
	var i = 0;
	while (i < nSteps)
	{
		this.synapse[0].evaluate(this.neuron[0].get_x());
		this.synapse[1].evaluate(this.neuron[1].get_x());
		
		this.neuron[0].evaluate(Itemp[i] + this.synapse[1].get_f());
		this.neuron[1].evaluate(this.synapse[0].get_f());

		Iext[i] = Itemp[i] + this.synapse[1].get_f();
		i++;
	}
	return Iext;
}

function LinearVaryingStimulus()
{
	this.refreshToPage();
}
LinearVaryingStimulus.prototype.refreshToPage = function()
{
	this.I0 = parseFloat(document.getElementById("Lin_I0").value);
	this.a = parseFloat(document.getElementById("Lin_a").value);
	this.ti = parseInt(document.getElementById("Lin_t0").value);
	this.tf = parseInt(document.getElementById("Lin_t1").value);
}
LinearVaryingStimulus.prototype.getAmp = function()
{
	return Math.abs(this.I0 + this.a*(this.tf - this.ti));
}
LinearVaryingStimulus.prototype.setParams = function(I0, a, t0, t1)
{
	this.I0 = I0;
	this.a = a;
	this.ti = t0;
	this.tf = t1;
}
LinearVaryingStimulus.prototype.getData = function(nSteps)
{
	var Iext = new Array(nSteps);
	var i = 0;
	while (i < this.ti)
	{
		Iext[i] = 0.0;
		i++;
	}
	while (i < this.tf)
	{
		Iext[i] = this.a * (i - this.ti) + this.I0;
		i++;
	}
	while (i < nSteps)
	{
		Iext[i] = 0.0;
		i++;
	}
	return Iext;
}

function CosineStimulus()
{
	this.refreshToPage();
}
CosineStimulus.prototype.refreshToPage = function()
{
	this.I = parseFloat(document.getElementById("Cos_I").value);
	this.omega = parseFloat(document.getElementById("Cos_omega").value);
	this.phi = parseFloat(document.getElementById("Cos_phi").value);
	this.ti = parseInt(document.getElementById("Cos_ti").value);
	this.tf = parseInt(document.getElementById("Cos_tf").value);
}
CosineStimulus.prototype.getAmp = function()
{
	return Math.abs(this.I);
}
CosineStimulus.prototype.setParams = function(I, omega, phi, ti, tf)
{
	this.I = I;
	this.omega = omega;
	this.phi = phi;
	this.ti = ti;
	this.tf = tf;
}
CosineStimulus.prototype.getData = function(nSteps)
{
	var Iext = new Array(nSteps);
	var i = 0;
	while (i < this.ti)
	{
		Iext[i] = 0.0;
		i++;
	}
	while (i < this.tf)
	{
		Iext[i] = this.I * Math.cos(this.omega * i - this.phi);
		i++;
	}
	while (i < nSteps)
	{
		Iext[i] = 0.0;
		i++;
	}
	return Iext;
}

function DeltaStimulus()
{
	this.refreshToPage();
}
DeltaStimulus.prototype.refreshToPage = function()
{
	this.I = parseFloat(document.getElementById("Delta_I").value);
	this.nStim = parseInt(document.getElementById("Delta_nStim").value);
	this.sStim = parseInt(document.getElementById("Delta_sStim").value);
	this.dt = parseInt(document.getElementById("Delta_dt").value);
    this.osc = parseInt(document.getElementById("Delta_osc").value);
}
DeltaStimulus.prototype.getAmp = function()
{
	return Math.abs(this.I);
}
DeltaStimulus.prototype.setParams = function(I, nStim, sStim, dt, osc)
{
	this.I = I;
	this.nStim = nStim;
	this.sStim = sStim;
	this.dt = dt;
    this.osc = osc;
}
DeltaStimulus.prototype.getData = function (nSteps)
{
	var Iext = new Array(nSteps - nStart);
	
	// setting the values of the external current during all simulation interval
	var j = 0;
	var i = 0;
	var nextStimulus = this.sStim;
	while (i < this.nStim)
	{
		while (j < nextStimulus)
		{
			Iext[j] = 0.0;
			j++;
		}
		Iext[j] = Math.pow(this.osc,i) * this.I;
		j++;
		nextStimulus += this.dt;
		i++;
	}
	while (j < nSteps)
	{
		Iext[j] = 0.0;
		j++;
	}
	return Iext;
}

function KTNoisyChemicalSynapse(tauf, taug, J, R)
{
	this.tauf = tauf;
	this.taug = taug;
	this.J = J;
    this.R = Math.abs(R) * Math.sign(J);
	this.f = 0.0;
	this.g = 0.0;
	this.theta = 0;
}
KTNoisyChemicalSynapse.prototype.evaluate = function(x)
{
    //Jtemp = this.J + this.R * Math.random();//(2.0 * Math.random() - 1.0);
    //JValues.push(Jtemp);
	this.theta = (x > 0.0 ? this.J + this.R * Math.random() : 0.0);
	this.f = this.f - (this.f/this.tauf) + this.g;
	this.g = this.g - (this.g/this.taug) + this.theta
}
KTNoisyChemicalSynapse.prototype.get_f = function()
{
	return this.f;
}

function KTChemicalSynapse(tauf, taug, J)
{
	this.tauf = tauf;
	this.taug = taug;
	this.J = J;
	this.f = 0.0;
	this.g = 0.0;
	this.theta = 0;
}
KTChemicalSynapse.prototype.evaluate = function(x)
{
	this.theta = (x > 0.0 ? this.J : 0.0);
	this.f = this.f - (this.f/this.tauf) + this.g;
	this.g = this.g - (this.g/this.taug) + this.theta
}
KTChemicalSynapse.prototype.get_f = function()
{
	return this.f;
}

var NeuronPar = function() { }
NeuronPar.refreshToPage = function()
{
	this.type = document.getElementById("neuronTypeCbx").value;
	this.K = parseFloat(document.getElementById("K").value);
	this.T = parseFloat(document.getElementById("T").value);
	this.d = parseFloat(document.getElementById("d").value);
	this.l = parseFloat(document.getElementById("l").value);
	this.xR = parseFloat(document.getElementById("xR").value);
	this.H = parseFloat(document.getElementById("H").value);
	this.x0 = parseFloat(document.getElementById("x0").value);
	this.y0 = parseFloat(document.getElementById("y0").value);
	this.z0 = parseFloat(document.getElementById("z0").value);
}
NeuronPar.getParameters = function()
{
	NeuronPar.refreshToPage();
	return {
		type: this.type,
		K: this.K,
		T: this.T,
		d: this.d,
		l: this.l,
		xR: this.xR,
		H: this.H,
		x0: this.x0,
		y0: this.y0,
		z0: this.z0 };
}

var FNeuron = function() {}
FNeuron.getNeuronType = function(type)
{
	if (type == "KTNeuron")
	{
		//return new KTNeuron(NeuronPar.x0, NeuronPar.y0, NeuronPar.K, NeuronPar.T, NeuronPar.z0);
		return new KTNeuron(NeuronPar.getParameters());
	}
	else if (type == "KTzNeuron")
	{
		//return new KTzNeuron(NeuronPar.x0, NeuronPar.y0, NeuronPar.z0, NeuronPar.K, NeuronPar.T, NeuronPar.d, NeuronPar.l, NeuronPar.xR);
		return new KTzNeuron(NeuronPar.getParameters());
	}
	else if (type == "KTNeuronSig")
	{
		//return new KTNeuronSig(NeuronPar.x0, NeuronPar.y0, NeuronPar.K, NeuronPar.T, NeuronPar.z0);
		return new KTNeuronSig(NeuronPar.getParameters());
	}
    else if (type == "KTzNeuronSig")
	{
		//return new KTzNeuronSig(NeuronPar.x0, NeuronPar.y0, NeuronPar.z0, NeuronPar.K, NeuronPar.T, NeuronPar.d, NeuronPar.l, NeuronPar.xR);
		return new KTzNeuronSig(NeuronPar.getParameters());
	}
	throw "unrecognized neuron";
}

//function KTzNeuron(x0, y0, z0, K, T, d, l, xR)
function KTzNeuron(neuPar)
{
	/*this.x = x0;
	this.y = y0;
	this.z = z0;
	this.K = K;
	this.T = T;
	this.d = d;
	this.l = l;
	this.xR = xR;*/
	this.x = neuPar.x0;
	this.y = neuPar.y0;
	this.z = neuPar.z0;
	this.K = neuPar.K;
	this.T = neuPar.T;
	this.d = neuPar.d;
	this.l = neuPar.l;
	this.xR = neuPar.xR;
	this.H = neuPar.H;
	this.xAux = this.x;
}
KTzNeuron.prototype.evaluate = function(I)
{
	this.xAux = this.x;
	this.x = Math.tanh((this.x - this.K * this.y + this.z + I + this.H) / this.T);
	this.y = this.xAux;
	this.z = (1.0 - this.d) * this.z - this.l * (this.xAux - this.xR);
}
KTzNeuron.prototype.get_x = function()
{
	return this.x;
}

//function KTNeuron(x0, y0, K, T, H)
function KTNeuron(neuPar)
{
	/*this.x = x0;
	this.y = y0;
	this.H = H;
	this.K = K;
	this.T = T;*/
	this.x = neuPar.x0;
	this.y = neuPar.y0;
	this.H = neuPar.H;
	this.K = neuPar.K;
	this.T = neuPar.T;
	this.xAux = this.x;
}
KTNeuron.prototype.evaluate = function(I)
{
	this.xAux = this.x;
	this.x = Math.tanh((this.x - this.K * this.y + this.H + I) / this.T);
	this.y = this.xAux;
}
KTNeuron.prototype.get_x = function()
{
	return this.x;
}

//function KTzNeuronSig(x0, y0, z0, K, T, d, l, xR)
function KTzNeuronSig(neuPar)
{
	/*this.x = x0;
	this.y = y0;
	this.z = z0;
	this.K = K;
	this.T = T;
	this.d = d;
	this.l = l;
	this.xR = xR;*/
	this.x = neuPar.x0;
	this.y = neuPar.y0;
	this.z = neuPar.z0;
	this.K = neuPar.K;
	this.T = neuPar.T;
	this.d = neuPar.d;
	this.l = neuPar.l;
	this.xR = neuPar.xR;
	this.H = neuPar.H;
	this.xAux = this.x;
}
KTzNeuronSig.prototype.evaluate = function(I)
{
	this.xAux = this.x;
    var temp = (this.x - this.K * this.y + this.z + I + this.H) / this.T;
	this.x = temp / (1.0 + (temp>0?temp:-temp));
	this.y = this.xAux;
	this.z = (1.0 - this.d) * this.z - this.l * (this.xAux - this.xR);
}
KTzNeuronSig.prototype.get_x = function()
{
	return this.x;
}

//function KTNeuronSig(x0, y0, K, T, H)
function KTNeuronSig(neuPar)
{
	/*this.x = x0;
	this.y = y0;
	this.H = H;
	this.K = K;
	this.T = T;*/
	this.x = neuPar.x0;
	this.y = neuPar.y0;
	this.H = neuPar.H;
	this.K = neuPar.K;
	this.T = neuPar.T;
	this.xAux = this.x;
}
KTNeuronSig.prototype.evaluate = function(I)
{
	this.xAux = this.x;
    var temp = (this.x - this.K * this.y + this.H + I) / this.T;
	this.x = temp / (1.0 + (temp>0?temp:-temp));
	this.y = this.xAux;
}
KTNeuronSig.prototype.get_x = function()
{
	return this.x;
}



/*
 *
*   Variaveis globais
*
*
*
*
*/

var graphicNeu, graphicCur, outputTxt, stimulusTypeCbx;
var debugTxt;

// parameters for the simulation
// var K, T, d, l, xR, x0, y0, z0;
var nSteps, nStart, stimulus;

var x, t, Iext;

var freeDeltaCount, freeDeltaId;

window.onload = function()
{
    freeDeltaCount = 0;
    freeDeltaId = 0;
	stimulusTypeCbx = document.getElementById("stimulusTypeCbx");
	stimulus = FStimulus.getStimulusType(stimulusTypeCbx.value);

	changeStimulusType();
	changeNeuronType();
	getParameters();
	prepareGraphics();
	prepareOutput();
    
    document.getElementById("stiWithLines").checked = true;
    document.getElementById("neuWithLines").checked = true;
    
    document.getElementById("animarBtn").onclick = function()
    {
        animar();
    }

	document.getElementById("pararBtn").onclick = function()
    {
        parar();
    }

    document.getElementById("calculateBtn").onclick = function()
    {
        calculateAndPlot();
    }
    
    document.getElementById("clearBtn").onclick = function()
    {
        clearGraphic();
    }
    
    document.getElementById("addFreeDeltaBtn").onclick = function()
    {
        addFreeDeltaStimulus();
    }
    
    document.getElementById("getSilentZBtn").onclick = function()
    {
        calcQuiescentIC();
    }
    
    document.getElementById("stiWithLines").onclick = function()
    {
        if ((!document.getElementById("stiWithPoints").checked) && (!document.getElementById("stiWithLines").checked))
            document.getElementById("stiWithPoints").checked = true;
    }

    document.getElementById("stiWithPoints").onclick = function()
    {
        if ((!document.getElementById("stiWithLines").checked) && (!document.getElementById("stiWithPoints").checked))
            document.getElementById("stiWithLines").checked = true;
    }

    document.getElementById("neuWithLines").onclick = function()
    {
        if ((!document.getElementById("neuWithPoints").checked) && (!document.getElementById("neuWithLines").checked))
            document.getElementById("neuWithPoints").checked = true;
    }

    document.getElementById("neuWithPoints").onclick = function()
    {
        if ((!document.getElementById("neuWithLines").checked) && (!document.getElementById("neuWithPoints").checked))
            document.getElementById("neuWithLines").checked = true;
    }

}

function getParameters()
{
	NeuronPar.refreshToPage();

	// getting time parameters
	nSteps = parseInt(document.getElementById("nSteps").value);
	nStart = parseInt(document.getElementById("nStart").value);
	
	// validating Delta stimulus
	if (stimulusTypeCbx.value == "Delta")
	{
        var oscilate = parseInt(document.getElementById("Delta_osc").value);
		var sStim = parseInt(document.getElementById("Delta_sStim").value);
		if (sStim <= nStart)
		{
			sStim = (nSteps + nStart) / 2;
			alert("Delta stimulus: t_0 must be > t_start, using t_stim = " + sStim);
			document.getElementById("Delta_sStim").value = sStim;
		}
		var nStim = parseInt(document.getElementById("Delta_nStim").value);
		var dt = parseFloat(document.getElementById("Delta_dt").value);
		if ((sStim + (nStim - 1) * dt) >= nSteps)
		{
			nStim = 1;
			alert("Delta stimulus: t_0 + (N_sti - 1) * dt should be < than t_max, using N_sti = " + nStim);
			document.getElementById("Delta_nStim").value = nStim;
		}
	}
    else if (stimulusTypeCbx.value == "DelSeries")
	{
        var oscilate = parseInt(document.getElementById("DelSeries_osc").value);
		var sStim = parseInt(document.getElementById("DelSeries_sStim").value);
		if (sStim <= nStart)
		{
			sStim = (nSteps + nStart) / 2;
			alert("DelSeries stimulus: t_0 must be > t_start, using t_stim = " + sStim);
			document.getElementById("DelSeries_sStim").value = sStim;
		}
		var nStim = parseInt(document.getElementById("DelSeries_nStim").value);
		var dt = parseFloat(document.getElementById("DelSeries_dt").value);
		if ((sStim + (nStim - 1) * dt) >= nSteps)
		{
			nStim = 1;
			alert("DelSeries stimulus: t_0 + (N_sti - 1) * dt should be < than t_max, using N_sti = " + nStim);
			document.getElementById("DelSeries_nStim").value = nStim;
		}
	}
	else if (stimulusTypeCbx.value == "Neu")
	{
		// validating other KTz neuron with Chemical Synapse Map
		var sStim = parseInt(document.getElementById("Neu_sStim").value);
		if (sStim <= nStart)
		{
			sStim = (nSteps + nStart) / 2;
			alert("another Neuron stimulus: t_0 must be > t_start, using t_stim = " + sStim);
			document.getElementById("Neu_sStim").value = sStim;
		}
		var nStim = parseInt(document.getElementById("Neu_nStim").value);
		var dt = parseFloat(document.getElementById("Neu_dt").value);
		if ((sStim + (nStim - 1) * dt) >= nSteps)
		{
			nStim = 1;
			alert("another Neuron stimulus: t_0 + (N_sti - 1) * dt should be < than t_max, using N_sti = " + nStim);
			document.getElementById("Neu_nStim").value = nStim;
		}
	}
	else if (stimulusTypeCbx.value == "2Neu")
	{
		// validating other KTz neuron with Chemical Synapse Map
		var sStim = parseInt(document.getElementById("2Neu_sStim").value);
		if (sStim <= nStart)
		{
			sStim = (nSteps + nStart) / 2;
			alert("another Neuron stimulus: t_0 must be > t_start, using t_stim = " + sStim);
			document.getElementById("2Neu_sStim").value = sStim;
		}
		var nStim = parseInt(document.getElementById("2Neu_nStim").value);
		var dt = parseFloat(document.getElementById("2Neu_dt").value);
		if ((sStim + (nStim - 1) * dt) >= nSteps)
		{
			nStim = 1;
			alert("another Neuron stimulus: t_0 + (N_sti - 1) * dt should be < than t_max, using N_sti = " + nStim);
			document.getElementById("2Neu_nStim").value = nStim;
		}
	}
	else if (stimulusTypeCbx.value == "Noi")
	{
		// validating other KTz neuron with Chemical Synapse Map
		var sStim = parseInt(document.getElementById("Noi_sStim").value);
		if (sStim <= nStart)
		{
			sStim = (nSteps + nStart) / 2;
			alert("another Neuron stimulus: t_0 must be > t_start, using t_stim = " + sStim);
			document.getElementById("Noi_sStim").value = sStim;
		}
		var nStim = parseInt(document.getElementById("Noi_nStim").value);
		var dt = parseFloat(document.getElementById("Noi_dt").value);
		if ((sStim + (nStim - 1) * dt) >= nSteps)
		{
			nStim = 1;
			alert("another Neuron stimulus: t_0 + (N_sti - 1) * dt should be < than t_max, using N_sti = " + nStim);
			document.getElementById("Noi_nStim").value = nStim;
		}
	}
	else if (stimulusTypeCbx.value == "Cos")
	{
		var ti = parseInt(document.getElementById("Cos_ti").value);
		var tf = parseInt(document.getElementById("Cos_tf").value);
		if (ti <= nStart)
		{
			ti = nStart + 1;
			alert("cosine stimulus: t_i must be > t_start, using ti = " + ti);
			document.getElementById("Cos_ti").value = ti;
		}
		if (tf >= nSteps)
		{
			tf = nSteps - 2;
			alert("cosine stimulus: t_f must be < t_max, using t_f = " + tf);
			document.getElementById("Cos_tf").value = tf;
		}
	}
    else if (stimulusTypeCbx.value == "Lin")
    {
        var t0 = parseInt(document.getElementById("Lin_t0").value);
        var t1 = parseInt(document.getElementById("Lin_t1").value);
        if (t0 <= nStart)
        {
            t0 = nStart + 1;
            alert("linear varying current: t_0 must be > t_start, using t_0 = " + t0);
            document.getElementById("Lin_t0").value = t0;
        }
        if (t1 >= nSteps)
        {
            t1 = nSteps - 2;
			alert("linear varying current: t_1 must be < t_max, using t_1 = " + t1);
			document.getElementById("Lin_t1").value = tMax;
        }
    }
}

function prepareOutput()
{
	outputTxt = new Output(document.getElementById("outputTxt"));
    //debugTxt = new Output(document.getElementById("debugTxt"));
}

function prepareGraphics()
{
	graphicNeu = new Graphic2D(nStart, -1.1, nSteps, 1.1, document.getElementById("cnvNeu"));
	graphicCur = new Graphic2D(nStart, -1.1*stimulus.getAmp(), nSteps, 1.1*stimulus.getAmp(), document.getElementById("cnvCur"));
}

function calculateAndPlot()
{
	getParameters();
	prepareGraphics();
	calculate();
    var plotNeuWithPoints = document.getElementById("neuWithPoints").checked;
    var plotStiWithPoints = document.getElementById("stiWithPoints").checked;
    var plotNeuWithLines = document.getElementById("neuWithLines").checked;
    var plotStiWithLines = document.getElementById("stiWithLines").checked;
	graphicNeu.plotGraphic(t, x, "blue", plotNeuWithPoints, plotNeuWithLines, "#6bb9ea", false);
	graphicCur.plotGraphic(t, Iext, "red", plotStiWithPoints, plotStiWithLines, "#ed9696", true);
	printData();
}

function printData()
{
	outputTxt.clear();
	var header = "# KTz stimuli simulation " + (new Date()).toString("dd/mm/YYYY HH:ss") + "\r\n";
	header += "#-\r\n";
	header += "# parameters:\r\n";
	header += "# K = " + NeuronPar.K + "\r\n";
	header += "# T = " + NeuronPar.T + "\r\n";
	header += "# d = " + NeuronPar.d + "\r\n";
	header += "# l = " + NeuronPar.l + "\r\n";
	header += "# xR = " + NeuronPar.xR + "\r\n";
	header += "# H = " + NeuronPar.H + "\r\n";
	header += "#-\r\n";
	header += "# initial conditions:\r\n";
	header += "# x0 = " + NeuronPar.x0 + "\r\n";
	header += "# y0 = " + NeuronPar.y0 + "\r\n";
	header += "# z0 = " + NeuronPar.z0 + "\r\n";
	header += "#-\r\n";
	header += "# data:\r\n";
	header += "# t\tx\tIext";
	outputTxt.printLn(header);
	outputTxt.print3ColData(t, x, Iext);
    //debugTxt.clear();
    //debugTxt.print3ColData(t,JValues,JValues);
}

function clearGraphic()
{
	graphicNeu.clear();
	graphicCur.clear();
}

function calculate()
{
	x = new Array(nSteps);
	t = new Array(nSteps);
	stimulus = FStimulus.getStimulusType(stimulusTypeCbx.value);
	Iext = stimulus.getData(nSteps);
	
	//generateStimuliData();
	
	//instanciating the neuron
	var neuron = FNeuron.getNeuronType(document.getElementById("neuronTypeCbx").value);
	//var neuron = new KTzNeuron(x0, y0, z0, K, T, d, l, xR);
    //var neuron = new KTzNeuronSig(x0, y0, z0, K, T, d, l, xR);
	
	// calculating the dynamics
	var i = 0;
	while (i < nSteps)
	{
		neuron.evaluate(Iext[i]);
		x[i] = neuron.get_x();
		t[i] = i;
		i++;
	}
}

function calcQuiescentIC()
{
	getParameters();
	var func;
	if ((NeuronPar.type == "KTNeuron") || (NeuronPar.type == "KTzNeuron"))
	{
		func = Math.atanh;
	}
	else
	{
		func = Math.invlogistic;
	}
	document.getElementById("y0").value = NeuronPar.x0;
	document.getElementById("z0").value = NeuronPar.T * func(NeuronPar.x0) + (NeuronPar.K - 1.0) * NeuronPar.x0; // x0 = y0
	NeuronPar.refreshToPage();
}

function changeStimulusType()
{
	jQuery(".stimulusType").hide();
	jQuery("#stimulusType" + stimulusTypeCbx.value).show("fast");
    if (stimulusTypeCbx.value == "FreeDel")
    {
        if (freeDeltaCount == 0)
        {
            addFreeDeltaStimulus();
        }
    }
}

function changeNeuronType()
{
	var neuType = document.getElementById("neuronTypeCbx").value;
	showHideNeuronFeaturesOf(neuType);
	if (neuType.indexOf("KTz") != -1)
	{
		//document.getElementById("neuThirdVar").innerHTML = 'z<sub>0</sub>';
		jQuery(".ktz").show("fast");
	}
	else
	{
		//document.getElementById("neuThirdVar").innerHTML = 'H';
		jQuery(".ktz").hide();
	}
}

function showHideNeuronFeaturesOf(neuType)
{
	var opts = document.getElementById("neuronTypeCbx").options;
	for (var i = 0; i < opts.length; i++)
	{
		if (opts[i].value == neuType)
		{
			jQuery("."+neuType).show("fast");
		}
		else
		{
			jQuery("."+opts[i].value).hide();
		}
	}
}

function addFreeDeltaStimulus()
{
    freeDeltaCount++;
    freeDeltaId++;
    var divId = "freeDelta" + freeDeltaId;
    var remBtnId = "remFreeDeltaBtn" + freeDeltaId;
    jQuery("#stimulusTypeFreeDelAddSpace").append(newFreeDeltaHTML(divId, remBtnId));
    jQuery("#" + remBtnId).click(function()
    {
        freeDeltaCount--;
        jQuery("#" + divId).remove();
        //alert("clicked: " + remBtnId + "\nremoved: " + divId + "\nfreeDeltaCount = " + freeDeltaCount + "\nfreeDeltaId = " + freeDeltaId);
    });
}

function newFreeDeltaHTML(divId, remBtnId)
{
    var str = "<div id='" + divId + "' class='controlPanelLine'>";
       str += "    <div class='freeDeltaLeftColumn'>";
       str += "        <div class='colLeftColumn'>";
       str += "            <div class='paramLeftColumn'><label for='FreeDel_I" + freeDeltaId + "'>I<sub>"+freeDeltaCount+"</sub> =</label></div>";
       str += "            <div class='paramRightColumn'><input type='text' name='FreeDel_I' id='FreeDel_I"+freeDeltaId+"' value='0.1' /></div>";
       str += "        </div>";
       str += "        <div class='colRightColumn'>";
       str += "            <div class='paramLeftColumn'><label for='FreeDel_t"+freeDeltaId+"'>t<sub>"+freeDeltaCount+"</sub> =</label></div>";
       str += "            <div class='paramRightColumn'><input type='text' name='FreeDel_t' id='FreeDel_t"+freeDeltaId+"' value='"+freeDeltaCount*10+"' /></div>";
       str += "        </div>";
       str += "    </div>";
       str += "    <div class='freeDeltaRightColumn'><input type='button' name='" + remBtnId + "' id='" + remBtnId + "' value='X' /></div>";
       str += "</div>";
    return str;
}

jQuery(document).keyup(
    function (e)
    {
        if (e.keyCode == 27) // esc
        {
            clearGraphic();
        }
        else if (e.keyCode == 13) // enter
        {
            calculateAndPlot();
        }
    }
);

////////////////////////////////////////////////////////////
//
//
// modificado a partir daqui
//
//
////////////////////////////////////////////////////////////

var xAnim, tAnim, IextAnim, stimAnim;
var neuronAnim;
var idAnima;
var corNeuronio;
var nNeurons;
var condContornoLivre = { x: 0, xAux: 0 };
var JPulse;
var indParaEstimulo;
var animaTipo;

function animar()
{
	getParameters();
	animaTipo = document.getElementById("animaTipo").value;
	var intervaloAnim = parseInt(document.getElementById("intervaloAnim").value);
	if (animaTipo == "singleNeuron")
	{
		prepareGraphics();
	    plotNeuWithPointsAnim = document.getElementById("neuWithPoints").checked;
	    plotStiWithPointsAnim = document.getElementById("stiWithPoints").checked;
	    plotNeuWithLinesAnim = document.getElementById("neuWithLines").checked;
	    plotStiWithLinesAnim = document.getElementById("stiWithLines").checked;

	    // aqui chamar setInterval na funcao que vai desenhar e limpar o grafico
	    xAnim = new Array(nSteps);
		tAnim = new Array(nSteps);
		neuronAnim = FNeuron.getNeuronType(document.getElementById("neuronTypeCbx").value);

		calculaGraficoInicial(animaTipo, 0);

		idAnima = setInterval(animaSingleNeuron, intervaloAnim);
	}
	else
	{
		var N = parseInt(document.getElementById("numeroNeu").value);
		var J = parseFloat(document.getElementById("JPulse").value);
		var indStimulus = parseFloat(document.getElementById("indexStimulus").value);

		// guarando quantidade de neuronios
		// e valor da interação nas variaveis globais
		nNeurons = N - 1;
		JPulse = J;
		indParaEstimulo = indStimulus;

		// começando as matrizes que guardarao as informacoes
		// de cada neuronio
		corNeuronio = new Array(N); // matriz N x nSteps: indice 1 = neuronio; indice 2 = tempo; cada elemento dessa matriz é a cor do neuronio i no tempo j
		xAnim = new Array(N); // matriz N x nSteps: indice 1 = neuroni; indice 2 = tempo; essa matriz nunca vai mudar seus valores
		neuronAnim  = new Array(N); // vetor com N neuronios (os quais devem ter sua dinamica avaliada a cada passo de animacao)
		stimAnim = FStimulus.getStimulusType(stimulusTypeCbx.value); // objeto com o estimulo externo
		tAnim = new Array(nSteps); // vetor com nSteps passos de tempo: elementos nunca mudam, devem ir de 0 a nSteps
		for (var i = 0; i < nSteps; i++)
		{
			tAnim[i] = i;
		}

		// ajustando as coordenadas do canvas
		// tempo inicial = 0
		// tempo final = nSteps
		// eixo y vai de -1 (primeiro neuronio é y = 0)
		// ateh y = N (ultimo neuronio é y = N-1)
		graphicNeu = new Graphic2D(0, -1, nSteps, N, document.getElementById("cnvNeu"));

		// inicia o grafico		
		calculaGraficoInicial(animaTipo, indStimulus);

		// começa a animação
		idAnima = setInterval(animaLinearLattice, intervaloAnim);
	}
}

function parar()
{
	clearInterval(idAnima);
}

function calculaGraficoInicial()
{
	if (animaTipo == "singleNeuron")
	{
		stimAnim = FStimulus.getStimulusType(stimulusTypeCbx.value);
		IextAnim = stimAnim.getData(nSteps);
		var i = 0;
		while (i < nSteps)
		{
			neuronAnim.evaluate(IextAnim[i]);
			xAnim[i] = neuronAnim.get_x();
			tAnim[i] = i;
			i++;
		}
	}
	else
	{
		// o primeiro for inicia as variaveis, o segundo roda
		// a dinamica por nSteps (tempo inicial plotado no grafico)
		stimAnim = FStimulus.getStimulusType(stimulusTypeCbx.value);
		N = nNeurons + 1;
		IextAnim = new Array(N);
		for (var i = 0; i < N; i++)
		{
			// começando array com as corres dos neuronios
			corNeuronio[i] = new Array(nSteps);

			// começando array com as posições de cada neuronio no grafico
			xAnim[i] = new Array(nSteps);
			for (var j = 0; j < nSteps; j++)
			{
				xAnim[i][j] = i;
			}

			// iniciando cada neuronio
			neuronAnim[i] = FNeuron.getNeuronType(document.getElementById("neuronTypeCbx").value);

			// iniciando o estimulo externo sobre o neuronio de
			// indice i = indParaEstimulo
			if (i == indParaEstimulo)
			{
				IextAnim[i] = stimAnim.getData(nSteps);
			}
			else
			{
				IextAnim[i] = new Array(nSteps);
				for (var j = 0; j < nSteps; j++)
				{
					IextAnim[i][j] = 0.0;
				}
			}
		}

		// fazendo a dinamica inicial por nSteps
		// para todos os neuronios
		for (var j = 0; j < nSteps; j++)
		{
			// separamos o neuronio 0 (primeiro neuronio) e o neuronio N-1 (ultimo neuronio)
			// pois o neuronio 0 não tem vizinho i-1
			// e o neuronio N-1 não tem vizinho i+1
			passoDeTempoNeuronio(0, j, condContornoLivre, neuronAnim[1]);
			for (var i = 1; i < nNeurons; i++)
			{
				passoDeTempoNeuronio(i, j, neuronAnim[i-1], neuronAnim[i+1]);
			}
			passoDeTempoNeuronio(i, j, neuronAnim[i-1], condContornoLivre);
		}
	}
}

function passoDeTempoNeuronio(i, j, vizAnterior, vizProximo)
{
	// xAux é o x no passo de tempo anterior
	neuronAnim[i].evaluate(IextAnim[i][j] + JPulse * vizAnterior.xAux + JPulse * vizProximo.x);
	corNeuronio[i][j] = transformaEmCor(neuronAnim[i].x);
}

function animaLinearLattice()
{
	graphicNeu.clear();
	evoluiEPlotaNeuronio(0, condContornoLivre, neuronAnim[1]);
	var i = 1;
	while (i < nNeurons)
	{
		evoluiEPlotaNeuronio(i, neuronAnim[i-1], neuronAnim[i+1]);
		i++;
	}
	evoluiEPlotaNeuronio(i, neuronAnim[i-1], condContornoLivre);
}

function evoluiEPlotaNeuronio(i, vizAnterior, vizProximo)
{
	graphicNeu.plotColoredPoints(tAnim, xAnim[i], "blue", true, false, corNeuronio[i], false);
	neuronAnim[i].evaluate(JPulse * vizAnterior.xAux + JPulse * vizProximo.x);
	//corNeuronio[i].splice(0,1);
	corNeuronio[i].shift();
	corNeuronio[i].push(transformaEmCor(neuronAnim[i].x));
}

function animaSingleNeuron()
{
	graphicNeu.clear();
	graphicNeu.plotGraphic(tAnim, xAnim, "blue", plotNeuWithPointsAnim, plotNeuWithLinesAnim, "#6bb9ea", false);
	neuronAnim.evaluate(0.0);
	xAnim.splice(0,1);
	xAnim.push(neuronAnim.get_x());
}

function transformaEmCor(x)
{
	var a = (1-x) * (1-x) * (1-x) * (1-x) * 255 / 16;//parseInt((1-x) * (1-x) * (1-x) * (1-x) * 255 / 16); // ((1-x)/2)**4
	return rgbToHex(a,a,a);
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1,7);
}