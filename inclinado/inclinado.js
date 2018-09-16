/*
Author: Mauricio Girardi-Schappo, PhD.
Distributed under GNU License v3.0

9th of November, 2013
*/
window.onload = function()
{
    var planoIncl = new PlanoInclinadoSim();

    document.getElementById("inicioBtn").onclick = function()
    {
        planoIncl.Simula();
    };
    document.getElementById("resetaBtn").onclick = function()
    {
        planoIncl.Reseta();
    };
    document.getElementById("planoAngulo").onchange = function()
    {
        planoIncl.MudaAngulo(this.value);
        document.getElementById("planoAnguloValue").value = this.value;
    };
    document.getElementById("planoAngulo").oninput = function()
    {
        planoIncl.MudaAngulo(this.value);
        document.getElementById("planoAnguloValue").value = this.value;
    };
    document.getElementById("planoAnguloValue").onchange = function()
    {
        if (!planoIncl.MudaAngulo(this.value))
        {
            this.value = planoIncl.thetaMax;
        }
        document.getElementById("planoAngulo").value = this.value;
    };
    // document.getElementById("materialPlanoBloco").onchange = function()
    // {
        // planoIncl.MudaMaterial(this.value);
    // };
}

/**
 * cria uma simulacao do plano inclinado
 */
function PlanoInclinadoSim()
{
    // constantes de conversao de angulo
    this.toDegrees = 180.0 / Math.PI;
    this.toRadians = Math.PI / 180.0;
    
    // define variaveis fisicas do problema
    this.theta = 0; // angulo do plano
    this.mE = 0; // coef atrito estatico
    this.mD = 0; // coef atrito dinamico
    this.v0 = 0; // vel inicial
    this.a = 0; // aceleracao
    this.g = 10; // m/s^2 no SI
    this.planoLargReal = 2; // m no SI (mundo real)
    this.t0 = 0; // variavel auxiliar na hora de animar
    this.x0 = 0; // posicao inicial do bloco - variavel auxiliar na hora de animar
    // this.x = 0; // posicao atual do bloco - animacao
    this.xAnt = 0; // posicao anterior a atual - variavel auxiliar na animacao (criterio de parada)
    this.y0 = 0; // posicao inicial do bloco - variavel auxiliar na hora de animar
    // this.y = 0; // posicao atual do bloco - animacao
    this.v0x = 0; // velocidade inicial do bloco em x - variavel auxiliar na hora de animar
    this.v0y = 0; // velocidade inicial do bloco em y - variavel auxiliar na hora de animar
    this.ax = 0; // aceleracao do bloco em x - variavel auxiliar na hora de animar
    this.ay = 0; // aceleracao do bloco em y - variavel auxiliar na hora de animar
    // this.dt = 0.0001; // precisao no tempo para integrar as equações = 10^-2 s
    // this.t = 0; // tempo - animacao
    this.intervalID = 0; // variavel que guardara o setInterval()
    this.intervalT = 50; // intervalo do setInterval() em milisegundos reais

    // ajusta os valores iniciais das variaveis acima
    this.DefineValoresIniciais();

    // instanciando o canvas
    this.canvas = new fabric.Canvas('canvas', { centerTransform: true, selection: false });
    
    // definindo variaveis de interesse
    this.origem = { x: 10, y: canvas.height - 10 } ;
    this.planoLarg = 0; // calculado em this.AjustaParametrosGUI()
    this.thetaMax = 0; // definido por this.AjustaParametrosGUI()
    // this.thetaC = new Array(); // lista dos angulos criticos para cada material
    // this.material = 0; // indice do material selecionado
    this.distPlanoCron = 120; // distancia do plano aos cronometros em px
    this.planoLargSobre4 = 0;
    this.nCron = 4; // nro de cronometros
    this.posSensor = new Array(); // guarda a posicao dos sensores
    var blocoLarg = 20; // coord do canvas
    var blocoCor = '#cc0000';
    var cronLarg = 66;
    var cronAlt = 24;
    var planoCor = '#666666';
    var cronTextoCor = '#000000';
    var cronFundoCor = '#ebebeb';
    var cronLinhaCor = '#333333';
    var cronFonteFace = 'Arial';
    var cronFonteTam = 14;
    var sensorCor = '#cccccc';
    
    // ajustando os parametros da GUI
    this.AjustaParametrosGUI();
    
    // coletando os parametros da GUI para preparar o movimento
    this.ColetaDados();
    
    // instanciando o plano
    this.plano = new PlanoInclinado(this.theta, this.origem.x, this.origem.y, this.planoLarg, planoCor);
    
    // criando o bloco
    this.bloco = new Bloco(0, 0, blocoLarg, this.theta, blocoCor);
    
    // criando cronometros e sensores
    this.cron = new Array();
    this.sensor = new Array();
    for (var i = 0; i < this.nCron; i++)
    {
        // criando o cronometro
        this.cron[i] = new CaixaDeTexto(0, 0, cronLarg, cronAlt, '0.00s', cronFonteFace, cronFonteTam, cronTextoCor, cronFundoCor, cronLinhaCor);
        
        // linhas que conectam os cronometros ao plano (sensores)
        this.sensor[i] = new fabric.Line([0,0,0,this.distPlanoCron], { fill: sensorCor, strokeWidth: 1, selectable: false, hasControls: false, hasBorders: false, originX: 'center', originY: 'bottom' });
        
        // definindo os elementos desse array
        this.posSensor[i] = { x: 0, y: 0 };
    }
    
    // adicionando objetos ao canvas
    this.canvas.add(this.plano.figura);
    this.canvas.add(this.bloco.figura);
    for (var i = 0; i < this.nCron; i++)
    {
        this.canvas.add(this.cron[i].figura);
        this.canvas.add(this.sensor[i]);
    }
    
    // definindo a transformacao de coordenada que leva uma distancia do canvas em uma distancia do mundo real
    // como o plano inclinado tem this.planoLarg de comprimento (em pixels) e, no mundo real, deve ter
    // 2 metros, a transformacao leva uma coordenada dos pixels para os metros (SI)
    this.tc = new LinearTransform(0, this.planoLarg, 0, this.planoLargReal);
    
    // ajusta a posicao inicial de todos os objetos
    this.MudaAngulo(this.theta);
}
/**
 * reseta a simulacao
 */
PlanoInclinadoSim.prototype.Reseta = function()
{
    clearInterval(this.intervalID);
    this.DefineValoresIniciais();
    this.ColetaDados();
    for (var i = 0; i < this.nCron; i++)
    {
        this.cron[i].figura.label = '0.00s';
        document.getElementById("tempo" + (i+1)).value = '0.00s';
    }
    this.MudaAngulo(this.theta);
    this.LiberaGUI();
}
/**
 * realiza a simulacao
 */
PlanoInclinadoSim.prototype.Simula = function()
{
    // coleta dados para a simulacao
    this.ColetaDados();
    if (this.BlocoSeMove())
    {
        var desloc = Math.abs(this.v0 * this.v0/ (2 * this.a)); // em m (SI) -- deslocamento total, utilizado como criterio de parada
        desloc = this.tc.inverse(desloc);
        if ((this.v0 == 0) || (desloc > this.planoLarg) || (this.a > 0 && this.v0 > 0))
        {
            desloc = this.planoLarg; // se a velocidade inicial eh zero e o bloco se move, ele só para quando desceu todo o plano
        }
        this.BloqueiaGUI();
        var parent = this;
        this.xAnt = 0;
        this.x0 = this.bloco.figura.left;
        this.y0 = this.bloco.figura.top;
        // this.x = this.x0;
        // this.y = this.y0;
        this.v0x = this.tc.inverse(this.v0 * Math.cos(this.theta * this.toRadians)); // convertendo os valores das variaveis para pixels
        this.v0y = this.tc.inverse(this.v0 * Math.sin(this.theta * this.toRadians));
        this.ax = this.tc.inverse(this.a * Math.cos(this.theta * this.toRadians));
        this.ay = this.tc.inverse(this.a * Math.sin(this.theta * this.toRadians));
        //console.log("v0 = " + this.v0x + "," + this.v0y + ", " + this.tc.inverse(this.v0) + "\na = " + this.ax + "," + this.ay + ", " + this.tc.inverse(this.a));
        this.t0 = (new Date()).getTime();
        this.intervalID = setInterval(function(){ parent.Anima(desloc); }, this.intervalT);
    }
}
/**
 * anima o bloco
 * @param d <float>: deslocamento maximo do bloco (criterio de parada)
 */
PlanoInclinadoSim.prototype.Anima = function(d)
{
    var t = ((new Date()).getTime() - this.t0) / 1000; // tempo em segundos
    var x = this.v0x * t + this.ax * t * t / 2;
    var y = this.v0y * t + this.ay * t * t / 2;
    var r = Math.sqrt(x*x+y*y);
    this.AtualizaCronometros(r, t);
    this.bloco.MovePara(this.x0 + x, this.y0 + y);
    this.canvas.renderAll();
    //console.log("x,xAnt = " + x + "," + this.xAnt + "\nr,d = " + r + "," + d);
    if ((x < this.xAnt) || (r > d))
    {
        this.Para();
        return;
    }
    this.xAnt = x;
    // this.t += this.dt;
    // this.x += this.v0x + this.ax * this.t;
    // this.y += this.v0y + this.ay * this.t;
    // var dx = this.x - this.x0;
    // var dy = this.y - this.y0;
    // var r = Math.sqrt(dx*dx+dy*dy);
    // this.AtualizaCronometros(r, this.t * this.intervalT);
    // this.bloco.MovePara(this.x, this.y);
    // this.canvas.renderAll();
    // console.log(this.x + "," + this.xAnt + "\n" + r + "," + d);
    // if ((this.x < this.xAnt) || (r > d))
    // {
        // this.Para();
        // return;
    // }
    // this.xAnt = this.x;
}
PlanoInclinadoSim.prototype.DefineValoresIniciais = function()
{
    this.theta = 0; // angulo do plano
    this.mE = 0; // coef atrito estatico
    this.mD = 0; // coef atrito dinamico
    this.v0 = 0; // vel inicial
    this.a = 0; // aceleracao
    this.g = 10; // m/s^2 no SI
    this.planoLargReal = 2; // m no SI (mundo real)
    this.t0 = 0; // variavel auxiliar na hora de animar
    this.x0 = 0; // posicao inicial do bloco - variavel auxiliar na hora de animar
    // this.x = 0; // posicao atual do bloco - animacao
    this.xAnt = 0; // posicao anterior a atual - variavel auxiliar na animacao (criterio de parada)
    this.y0 = 0; // posicao inicial do bloco - variavel auxiliar na hora de animar
    // this.y = 0; // posicao atual do bloco - animacao
    this.v0x = 0; // velocidade inicial do bloco em x - variavel auxiliar na hora de animar
    this.v0y = 0; // velocidade inicial do bloco em y - variavel auxiliar na hora de animar
    this.ax = 0; // aceleracao do bloco em x - variavel auxiliar na hora de animar
    this.ay = 0; // aceleracao do bloco em y - variavel auxiliar na hora de animar
    // this.dt = 0.0001; // precisao no tempo para integrar as equações = 10^-2 s
    // this.t = 0; // tempo - animacao
    this.intervalID = 0; // variavel que guardara o setInterval()
    this.intervalT = 50; // intervalo do setInterval() em milisegundos reais
}
/**
 * Atualiza os cronometros durante a animacao
 * @param r <float>: posicao sobre o plano
 * @param t <float>: tempo a ser considerado
 */
PlanoInclinadoSim.prototype.AtualizaCronometros = function(r, t)
{
    for (var i = 0; i < this.nCron; i++)
    {
        if (r < (i+1) * this.planoLargSobre4)
            this.cron[i].MudaTexto(t.toFixed(2) + 's');
    }
}
/**
 * para animacao
 */
PlanoInclinadoSim.prototype.Para = function()
{
    clearInterval(this.intervalID);
    //this.bloco.MovePara(this.origem.x + this.planoLarg, this.origem.y);
    this.canvas.renderAll();
    for (var i = 0; i < this.nCron; i++)
    {
        document.getElementById("tempo" + (i+1)).value = this.cron[i].figura.label;
    }
}
/**
 * Bloqueia GUI enquanto a animacao tah acontecendo
 */
PlanoInclinadoSim.prototype.BloqueiaGUI = function()
{
    var entradaDados = document.getElementById("entrada");
    for (var i = 0; i < entradaDados.children.length; i++)
    {
        if (entradaDados.children[i].nodeName == "DIV")
        {
            var filhos = entradaDados.children[i].children;
            for (var j = 0; j < filhos.length; j++)
            {
                if ((filhos[j].nodeName == "INPUT") || (filhos[j].nodeName == "SELECT"))
                {
                    filhos[j].disabled = true;
                }
            }
        }
    }
    document.getElementById("inicioBtn").disabled = true;
}
/**
 * Libera GUI apos a animacao
 */
PlanoInclinadoSim.prototype.LiberaGUI = function()
{
    var entradaDados = document.getElementById("entrada");
    for (var i = 0; i < entradaDados.children.length; i++)
    {
        if (entradaDados.children[i].nodeName == "DIV")
        {
            var filhos = entradaDados.children[i].children;
            for (var j = 0; j < filhos.length; j++)
            {
                if ((filhos[j].nodeName == "INPUT") || (filhos[j].nodeName == "SELECT"))
                {
                    filhos[j].disabled = false;
                }
            }
        }
    }
    document.getElementById("inicioBtn").disabled = false;
}
/**
 * verifica se o bloco vai se mover
 * @return <boolean>: true se o bloco se movera, false caso contrario
 */
PlanoInclinadoSim.prototype.BlocoSeMove = function()
{
    var thetaC = Math.atan(this.mE) * this.toDegrees;
    if (this.v0 == 0)
    {
        if (this.theta <= thetaC)
        {
            alert("O bloco não se moverá, pois o ângulo é menor que " + thetaC + " e a velocidade inicial é 0 cm/s.");
            return false;
        }
        else
        {
            if (this.a < 0)
            {
                alert("O bloco não se moverá, pois seu peso não é suficientemente maior que a força de atrito.");
                return false;
            }
            else
            {
                return true;
            }
        }
    }
    return true;
}
/**
 */
/**
 * Ajusta o valor do angulo do plano inclinado
 * @param angulo <float>: novo angulo (graus) do plano inclinado
 * @return <boolean>: true se o angulo mudou, false se nao mudou
 */
PlanoInclinadoSim.prototype.MudaAngulo = function(angulo)
{
    if (angulo > this.thetaMax)
    {
        alert("O plano pode ser inclinado até, no máximo, " + this.thetaMax + " graus.");
        return false;
    }
    this.theta = angulo;
    var novaPosBloco = this.plano.PosicaoInicialBloco();
    this.plano.MudaAngulo(angulo);
    this.bloco.MoveGiraPara(novaPosBloco.x, novaPosBloco.y, angulo);
    this.AjustaPosicaoSensores();
    for (var i = 0; i < this.nCron; i++)
    {
        this.cron[i].MovePara(this.posSensor[i].x + this.distPlanoCron * Math.sin(angulo * this.toRadians), this.posSensor[i].y - this.distPlanoCron * Math.cos(angulo * this.toRadians));
        this.sensor[i].left = this.posSensor[i].x;
        this.sensor[i].top = this.posSensor[i].y;
        this.sensor[i].angle = this.theta;
    }
    this.CalculaAceleracao();
    this.canvas.renderAll();
    return true;
}
/**
 * Ajusta a posicao de todos os sensores
 */
PlanoInclinadoSim.prototype.AjustaPosicaoSensores = function(i)
{
    var posB = this.plano.PosicaoInicialBloco();
    for (var i = 1; i <= this.nCron; i++)
    {
        this.posSensor[i-1].x = posB.x + i * this.planoLargSobre4 * Math.cos(this.theta * this.toRadians);
        this.posSensor[i-1].y = posB.y + i * this.planoLargSobre4 * Math.sin(this.theta * this.toRadians);
    }
}
/**
 * ajusta os parametros da GUI de acordo com as propriedades do canvas e do plano
 * principalmente o angulo maximo
 */
PlanoInclinadoSim.prototype.AjustaParametrosGUI = function()
{
    // obtendo os coeficients de atrito da GUI
    // var coefAtE = new Array();
    // var opts = document.getElementById("materialPlanoBloco").options;
    // for (var i = 0; i < opts.length; i++)
    // {
        // this.thetaC[i] = Math.atan(parseFloat(opts[i].value.split(";")[0])) * this.toDegrees;
        // if (opts[i].value == document.getElementById("materialPlanoBloco").value)
        // {
            // this.material = i;
        // }
    // }

    // o angulo critico para escorregar o bloco é dado pela atan(mE)
    // por isso, pego o maior dos mE e calculo o angulo critico
    // somo 10 graus no angulo critico para poder simular acima do angulo critico
    // do material com maior mE
    //this.thetaMax = 10.0 * this.toRadians + Math.atan(Math.maxInArray(coefAtE));
    // vou ajustar thetaMax na mao, porque nao estamos mais restritos pela altura do canvas
    this.thetaMax = Math.PI / 2;
    
    // angulo inicial é a metade do angulo critico do material selecionado:
    var thetaIni = parseInt(Math.atan(parseFloat(document.getElementById("materialPlanoBloco").value.split(";")[0])) * this.toDegrees / 2);
    
    // ajusta largura do plano
    // a altura maxima é 420 - 10 - 10 = canvas.height - 2*origem.x
    this.planoLarg = this.canvas.height - 2 * this.origem.x;// Math.tan(this.thetaMax);
    this.planoLargSobre4 = this.planoLarg / 4;
    this.thetaMax *= this.toDegrees;

    // ajusta valores na GUI
    document.getElementById("planoAngulo").max = parseInt(this.thetaMax);
    document.getElementById("planoAngulo").value = thetaIni;
    document.getElementById("planoAnguloValue").value = thetaIni;
    
    for (var i = 0; i < this.nCron; i++)
    {
        document.getElementById("tempo"+(i+1)).value = (0).toFixed(2);
    }
}
/**
 * Coleta os dados da GUI e
 * instancia as variaveis: this.theta, this.mE, this.mD e this.v0
 */
PlanoInclinadoSim.prototype.ColetaDados = function()
{
    // pega valores dos coeficients de atrito; string do tipo "mE;mD"
    var coefs = document.getElementById("materialPlanoBloco").value.split(";");
    this.theta = parseFloat(document.getElementById("planoAngulo").value);
    this.mE = parseFloat(coefs[0]);
    this.mD = parseFloat(coefs[1]);
    this.v0 = Math.abs(parseFloat(document.getElementById("blocoVelIni").value)) * 1e-2; // convertendo para m/s e evitando que o user ajuste valor negativo
    this.CalculaAceleracao();
}
PlanoInclinadoSim.prototype.CalculaAceleracao = function()
{
    this.a = this.g * (Math.sin(this.theta * this.toRadians) - this.mD * Math.cos(this.theta * this.toRadians));
}

/**
 * Caixa de texto utilizada para fazer o cronometro
 */
function CaixaDeTexto(x, y, w, h, texto, fonteFace, fonteTamanho, corTexto, corFundo, corLinha)
{
    this.figura = new LabeledRect({
        label: texto,
        left: x,
        top: y,
        width: w,
        height: h,
        labelFill: corTexto,
        labelOffset: 10,
        fontSize: fonteTamanho,
        fontFamily: fonteFace,
        fill: corFundo,
        originX: 'left',
        originY: 'bottom',
        selectable: false,
        hasControls: false,
        hasBorders: false,
        rx: 5,
        ry: 5,
        stroke: corLinha
    });
}
/**
 * Move a CaixaDeTexto para a posicao especificada
 * @param x <float>: nova posicao x do bloco (unid do canvas)
 * @param y <float>: nova posicao y do bloco (unid do canvas)
 * @param angulo <float>: novo angulo do bloco (graus)
 */
CaixaDeTexto.prototype.MovePara = function(x, y)
{
    this.figura.left = x;
    this.figura.top = y;
}
/**
 * Muda o texto da figura para o texto selecionado
 */
CaixaDeTexto.prototype.MudaTexto = function(texto)
{
    this.figura.label = texto;
}

/**
 * Cria o bloco
 * @param x <float>: posicao x do bloco
 * @param y <float>: posicao y do bloco
 * @param w <float>: largura w do bloco
 * @param angulo <float>: angulo do bloco
 * @param color <string>: cor do bloco
 */
function Bloco(x, y, w, angulo, color)
{
    this.figura = new fabric.Rect({
        left: x,
        top: y,
        width: w,
        height: w,
        fill: color,
        originX: 'left',
        originY: 'bottom'
    });
    this.figura.angle = angulo;
}
/**
 * Move o bloco para a posicao especificada
 * @param x <float>: nova posicao x do bloco (unid do canvas)
 * @param y <float>: nova posicao y do bloco (unid do canvas)
 * @param angulo <float>: novo angulo do bloco (graus)
 */
Bloco.prototype.MoveGiraPara = function(x, y, angulo)
{
    this.figura.left = x;
    this.figura.top = y;
    this.figura.angle = angulo;
}
/**
 * Move o bloco para a posicao especificada
 * @param x <float>: nova posicao x do bloco (unid do canvas)
 * @param y <float>: nova posicao y do bloco (unid do canvas)
 */
Bloco.prototype.MovePara = function(x, y)
{
    this.figura.left = x;
    this.figura.top = y;
}

/**
 * Cria o plano inclinado em x,y com largura w, altura h e cor color
 * @param angulo <float>: angulo em relação a horizontal em graus
 * @param x <float>: posicao x do ponto esq. inf. do plano (coord canvas) - assumido como origem do path
 * @param y <float>: posicao y do ponto esq. inf. do plano (coord canvas) - assumido como origem do path
 * @param w <float>: largura do plano (coord canvas)
 * @param color <string>: cor do plano
 */
function PlanoInclinado(angulo, x, y, w, color)
{
    this.x = x;
    this.y = y;
    this.figura = new fabric.Polygon([
        { 'x': this.x, 'y': this.y },
        { 'x': this.x+w, 'y': this.y },
        { 'x': this.x, 'y': this.y-3 }
    ],
    {
        fill: color,
        hasControls: false,
        hasBorders: false,
        selectable: false
    });
    this.lastPoint = this.figura.points[this.figura.points.length-1];
    this.MudaAngulo(angulo);
}
/**
 * Ajusta um novo angulo para o plano inclinado
 * @param angulo <float>: novo angulo do plano inclinado (graus)
 */
PlanoInclinado.prototype.MudaAngulo = function(angulo)
{
    this.lastPoint.x = this.x + this.figura.width * (1 - Math.cos(angulo * Math.PI / 180.0));
    this.lastPoint.y = this.y - this.figura.width * Math.sin(angulo * Math.PI / 180.0);
}
/**
 * retorna o ponto inferior esquerdo do plano inclinado
 * @return <object>: ponto com as coordenadas x e y da posicao inicial do bloco
 */
PlanoInclinado.prototype.PosicaoInicialBloco = function()
{
    return this.lastPoint;
}

/* Classe que representa uma transformacao de coordenadas entre coordenadas do "mundo" (mx e my -- definidas por quem instancia o objeto)
 * e coordenadas do canvas (cx e cy -- cx da esq. pra dir. e cy de cima pra baixo)
 * float cLrg: largura do canvas (canvas.width)
 * float cAlt: altura do canvas (canvas.height)
 * float mxi: coordenada x do mundo que corresponde a cx = 0 (esquerda)
 * float myi: coordenada y do mundo que corresponde a cy = canvas.height (inferior)
 * float mxf: coordenada x do mundo que corresponde a cx = canvas.width (direita)
 * float myf: coordenada y do mundo que corresponde a cy = 0 (topo)
 */
function TransCoord(cLrg,cAlt,mxi,myi,mxf,myf)
{
    // define as constantes da transformacao de coordenadas
    this.Bx = cLrg/(mxf-mxi);
    this.Ax = - this.Bx * mxi;
    this.By = cAlt/(myi-myf);
    this.Ay = - this.By * myf;
    this.Dx = 1.0 / this.Bx;
    this.Cx = mxi;// - this.Dx * 0;
    this.Dy = 1.0 / this.By;
    this.Cy = myi - this.Dy * cAlt;

    /* retorna a coordenada x do canvas
     */
    this.cx = function(mx)
    {
        return this.Ax + this.Bx * mx;
    };

    /* retorna a coordenada y do canvas
     */
    this.cy = function(my)
    {
        return this.Ay + this.By * my;
    };
    
    // transform inversa
    this.mx = function(cx)
    {
        return this.Cx + this.Dx * cx;
    };
    
    // transform inversa
    this.my = function(cy)
    {
        return this.Cy + this.Dy * cy;
    };
}

/** Transforma coordenadas do intervalo (x1,x2) para (y1,y2) linearmente
 * @param x1 float: valor inicial do intervalo a ser transformado
 * @param x2 float: valor final do intervalo a ser transformado
 * @param y1 float: valor inicial do intervalo de saida
 * @param y2 float: valor final do intervalo de saida
 */
function LinearTransform(x1,x2,y1,y2)
{
    // define as constantes da transformacao de coordenadas
    this.bx = (y2 - y1)/(x2 - x1);
    this.ax = y1 - this.bx * x1;
    
    // define constantes da inversa
    this.by = 1.0 / this.bx;
    this.ay = x1 - this.by * y1;

    /* retorna a coordenada x do canvas
     */
    this.transform = function(x)
    {
        return this.ax + this.bx * x;
    };

    /* retorna a coordenada y do canvas
     */
    this.inverse = function(y)
    {
        return this.ay + this.by * y;
    };
}

/**
 * Metodo de suporte
 */
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