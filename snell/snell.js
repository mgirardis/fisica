/*
Author: Mauricio Girardi-Schappo, PhD.
Distributed under GNU License v3.0

9th of November, 2013
*/

window.onload = function()
{
    var snell = new VisualizaLeiDeSnell();
    
    document.getElementById("emissorAngulo").oninput = function()
    {
        snell.GiraEmissor(this.value);
        snell.AjustaValoresGUI(this.value);
    }
    document.getElementById("emissorAngulo").onchange = function()
    {
        snell.GiraEmissor(this.value);
        snell.AjustaValoresGUI(this.value);
    }
    document.getElementById("emissorAnguloValue").onchange = function()
    {
        snell.GiraEmissor(this.value);
        snell.AjustaValoresGUI(this.value);
    }
    document.getElementById("meio1Composicao").onchange = function()
    {
        snell.AtualizaMeios();
    }
    document.getElementById("meio2Composicao").onchange = function()
    {
        snell.AtualizaMeios();
    }
}

function VisualizaLeiDeSnell()
{
    // constantes de conversao
    this.toDegrees = 180.0 / Math.PI;
    this.toRadians = Math.PI / 180.0;

    // instanciando o this.canvas
    this.canvas = new fabric.Canvas('canvas', { centerTransform: true, selection: false });

    // definindo valores das coordenadas do mundo para a transformação de coordenadas
    var mEsqBai = -1,
        mDirTop = 1;
        
    // definindo uma transformacao de coordenadas de tal modo
    // que
    // esquerda-centro: (mx,my) = (-1,0)
    // direita-centro: (mx,my) = (+1,0)
    // topo-centro: (mx,my) = (0,+1)
    // topo-baixo: (mx,my) = (0,-1)
    this.tc = new TransCoord(this.canvas.width, this.canvas.height, mEsqBai, mEsqBai, mDirTop, mDirTop);
    
    // centro do mundo em coordenadas do this.canvas:
    this.origemX = this.tc.cx(0);
    this.origemY = this.tc.cy(0);

    // raio da circunferencia descrita pelo emissor em coordenadas do mundo:
    var raioCircEm = 0.875;
    
    // define o angulo inicial do emissor (em graus)
    this.emissorAngIni = 20;
    var emissorLarg = 50,
        emissorAlt = 25; // valores para iniciar o emissor deitado em theta = 0
    
    // define a largura dos feixes
    var feixeLarg = 5;
    var feixeCor = '#cc0000';

    // coloca um circulo no centro do this.canvas para auxiliar o desenvolvimento
    //var centro = new fabric.Circle({ left: this.origemX, top: this.origemY, radius: 4, fill: '#000' });
    
    // traca a linha normal à interface para melhor visualização dos angulos
    var eixoX = new fabric.Line([ this.origemX, this.tc.cy(mDirTop), this.origemX, this.tc.cy(mEsqBai) ], { stroke: '#000000', strokeWidth: 1 })

    // emissor é de onde o feixe de luz é emitido
    this.emissor = new fabric.Rect({ left: this.origemX, top: this.tc.cy(raioCircEm), width: emissorAlt, height: emissorLarg, fill: '#666666', selectable: false });
    this.emissor.hasControls = this.emissor.hasBorders = false;
    
    // criando feixes
    var feixeInc = new Feixe(feixeCor, this.origemX, this.emissor.top+ this.emissor.height/2, feixeLarg, this.origemY-this.emissor.height, 'center', 'top');
    var feixeRefl = new Feixe(feixeCor, this.origemX, this.origemY, feixeLarg, this.canvas.width / Math.sqrt(2), 'center', 'bottom');
    var feixeRefr = new Feixe(feixeCor, this.origemX, this.origemY, feixeLarg, this.canvas.width / Math.sqrt(2), 'center', 'top');
    
    // grupo de incidencia
    // contem o feixe incidente e o emissor
    var grupoInc = new fabric.Group([ this.emissor, feixeInc.rect ], { left: this.origemX, top: this.origemY, originX: 'center', originY: 'bottom' } );
    grupoInc.hasControls = grupoInc.hasBorders = false;
    
    // evento quando move o grupo de incidencia (emissor + feixe incidente)
    //console.log(this.canvas);
    var parent = this;
    //var pointerXToAngle = new LinearTransform(this.canvas.width, 0, 180, -180); // leva um valor entre (0,canvas.height) para um valor entre (90,-90), nesta ordem, linearmente de maneira bijetora
    // grupoInc.on(
        // 'moving', function (obj)
        // {
            // //console.log(emissor);
            // //restringir o movimento do emissor a uma circunferencia de raio raioCircEm com centro em (mx,my) = (0,0)
            // //console.log(obj.e);
            // parent.grupoInc.top = parent.origemY;
            // parent.grupoInc.left = parent.origemX;
            // var p = fabric.util.getPointer();
            // var c = parent.grupoInc.getCenterPoint();
            // c.y = parent.tc.my(c.y);
            // c.x = parent.tc.mx(c.x);
            // //console.log("c.x = " + c.x + ", c.y = " + c.y + ", t = " + Math.atan(-c.y/c.x) * parent.toDegrees);
            // var theta1 = pointerXToAngle.transform(p.x);//Math.atan(-c.y/c.x) * parent.toDegrees;//
            // if (theta1 > 180)
                // theta1 = 180;
            // else if (theta1 < -180)
                // theta1 = -180;
            // //console.log("x = " + p.x + ", y = " + p.y + ", t = " + theta1);
            // parent.GiraEmissor((isNaN(theta1) ? parent.grupoInc.angle : theta1));
            // parent.AjustaValoresGUI(theta1);
        // }
    // );
    this.center = { x: this.tc.cx(0) + this.canvas._offset.left, y: this.tc.cy(0) + this.canvas._offset.top };
    this.canvas.on(
        'mouse:move', function (obj)
        {
            var p = fabric.util.getPointer();
            var hoverObj = parent.canvas.findTarget(obj.e);
            if (hoverObj)
            {
                if (hoverObj.isMoving)
                {
                    var alpha = -Math.atan((p.y - parent.center.y)/ (p.x - parent.center.x)) * parent.toDegrees;
                    parent.GiraEmissor(alpha);
                }
            }
            // restringir o movimento do emissor a uma circunferencia de raio raioCircEm com centro em (mx,my) = (0,0)
            //console.log(obj.e);
            // parent.grupoInc.top = parent.origemY;
            // parent.grupoInc.left = parent.origemX;
            // var p = fabric.util.getPointer();
            // var c = parent.grupoInc.getCenterPoint();
            // c.y = parent.tc.my(c.y);
            // c.x = parent.tc.mx(c.x);
            //console.log("c.x = " + c.x + ", c.y = " + c.y + ", t = " + Math.atan(-c.y/c.x) * parent.toDegrees);
            // var theta1 = pointerXToAngle.transform(p.x);//Math.atan(-c.y/c.x) * parent.toDegrees;//
            // if (theta1 > 180)
                // theta1 = 180;
            // else if (theta1 < -180)
                // theta1 = -180;
            //console.log("x = " + p.x + ", y = " + p.y + ", t = " + theta1);
            // parent.GiraEmissor((isNaN(theta1) ? parent.grupoInc.angle : theta1));
            // parent.AjustaValoresGUI(theta1);
        }
    );
    
    // guardando referencias dos objetos a serem girados
    // em this.GiraEmissor
    this.grupoInc = grupoInc;
    this.feixeRefl = feixeRefl.rect;
    this.feixeRefr = feixeRefr.rect;
    
    // criando meios 1 e 2
    // iniciando a lei de Snell
    //console.log("atualiza parametros");
    this.AtualizaMeios();
    
    this.canvas.add(this.meio1.rect);
    this.canvas.add(this.meio2.rect);
    //canvas.add(centro); // apenas para auxiliar
    this.canvas.add(eixoX);
    this.canvas.add(feixeRefl.rect);
    this.canvas.add(grupoInc);
    //this.canvas.add(this.emissor);
    //this.canvas.add(feixeInc.rect);
    this.canvas.add(feixeRefr.rect);
    
    // ajustando condição inicial
    this.AjustaCondIniciais();
    this.GiraEmissor(this.emissorAngIni);
    this.AjustaValoresGUI(this.emissorAngIni);
}
VisualizaLeiDeSnell.prototype.AjustaValoresGUI = function(theta1)
{
    document.getElementById("emissorAngulo").value = theta1;
    document.getElementById("emissorAnguloValue").value = theta1;
    document.getElementById("anguloRefracao").value = this.feixeRefr.angle;
}
/**
 */
VisualizaLeiDeSnell.prototype.GiraEmissor = function(angulo)
{
    var greaterThan90 = Math.abs(angulo) > 90;
    if (greaterThan90)
    {
        this.leiDeSnell.toggleMedia(this.meio2.n, this.meio1.n);
    }
    else
    {
        this.leiDeSnell.toggleMedia(this.meio1.n, this.meio2.n);
    }

    // transforma angulo em radianos
    anguloRad = angulo * this.toRadians;
    
    var angRefl = this.leiDeSnell.thetaReflex(anguloRad) * this.toDegrees;
    var theta2 = this.leiDeSnell.theta2(anguloRad);
    if (greaterThan90)
    {
        //angRefl = 180 - angRefl;
        theta2 = Math.PI - theta2;
    }

    // ajusta angulo do emissor
    this.grupoInc.angle = angulo;
    
    // ajusta angulo do raio refletido
    this.DefVisibFeixeRefl();
    this.feixeRefl.angle = angRefl;
    
    // ajusta angulo do raio refratado
    this.DefVisibFeixeRefr(angulo, theta2);
    this.feixeRefr.angle = theta2 * this.toDegrees;
    //console.log("theta2 = " + this.feixeRefr.angle);

    // renderiza o canvas
    this.canvas.renderAll();
}
VisualizaLeiDeSnell.prototype.DefVisibFeixeRefr = function(theta1, theta2)
{
    if ((Math.abs(theta1) == 90) || isNaN(theta2))
    {
        this.feixeRefr.visible = false;
        this.feixeRefl.visible = true;
    }
    else
    {
        this.feixeRefr.visible = true;
    }
    //console.log("refratado: \n  vis = " + this.feixeRefr.visible + "\n  ang = " + this.feixeRefr.angle + "\n  top = " + this.feixeRefr.top + "\n  left = " + this.feixeRefr.left);
}
VisualizaLeiDeSnell.prototype.DefVisibFeixeRefl = function()
{
    if (this.meio1.n == this.meio2.n)
        this.feixeRefl.visible = false;
    else
        this.feixeRefl.visible = true;
    //console.log("refletido: \n  vis = " + this.feixeRefl.visible + "\n  ang = " + this.feixeRefl.angle + "\n  top = " + this.feixeRefl.top + "\n  left = " + this.feixeRefl.left);
}
/** Coleta dados e cria a lei de snell
 */
VisualizaLeiDeSnell.prototype.AtualizaMeios = function()
{
    var dados = this.ColetaDados();
    try
    {
        //console.log("trocando");
        //console.log("n1 = " + dados.n1 + ", n2 = " + dados.n2);
        this.meio1.mudaMeio(dados.n1);
        this.meio2.mudaMeio(dados.n2);
    }
    catch (err)
    {
        if (err.name.toString() == "TypeError")
        {
            //console.log("criando meio 1");
            this.meio1 = new Meio(dados.n1,0,0,this.canvas.width,this.canvas.height/2);
            //console.log("criando meio 2");
            this.meio2 = new Meio(dados.n2,0,this.origemY,this.canvas.width,this.canvas.height/2);
        }
    }
    
    try
    {
        this.leiDeSnell.n1 = dados.n1;
        this.leiDeSnell.n2 = dados.n2;
    }
    catch (err)
    {
        if (err.name.toString() == "TypeError")
        {
            this.leiDeSnell = new LeiDeSnell(dados.n1, dados.n2);
        }
    }
    
    this.GiraEmissor(dados.theta1);
    this.AjustaValoresGUI(dados.theta1);
    
    this.canvas.renderAll();
}
/* Coleta os dados da interface e retorna os valores no SI
 *
 * return: objeto anonimo com valores dos dados no SI
 */
VisualizaLeiDeSnell.prototype.ColetaDados = function()
{
    return { 'n1': parseFloat(document.getElementById("meio1Composicao").value), 'n2': parseFloat(document.getElementById("meio2Composicao").value), 'theta1': parseFloat(document.getElementById("emissorAngulo").value) };
}
VisualizaLeiDeSnell.prototype.AjustaCondIniciais = function()
{
    document.getElementById("emissorAngulo").value = Math.abs(this.emissorAngIni);
    document.getElementById("emissorAnguloValue").value = Math.abs(this.emissorAngIni);
}


/** Cria um feixe
 * @param x float: posicao x (canvas) do centro do retangulo que representa o feixe
 * @param y float: posicao y (canvas) do centro do retangulo que representa o feixe
 * @param w float: largura do retangulo que representa o feixe
 * @param h float: altura do retangulo que representa o feixe
 * @param oX string: (left | center | right) centro de rotacao para o X
 * @param oY string: (top | center | bottom) centro de rotacao para o Y
 */
function Feixe(cor, x, y, w, h, oX, oY)
{
    this.rect = new fabric.Rect({
        left: x,
        top: y,
        width: w,
        height: h,
        originX: oX,
        originY: oY,
        fill: cor,
        selectable: false
    });
}

/** Cria um meio (no canvas) com indice de refracao n
 * @param n float: indice de refracao
 * @param x float: posicao x (canvas) do centro do retangulo que representa o meio
 * @param y float: posicao y (canvas) do centro do retangulo que representa o meio
 * @param w float: largura do retangulo que representa o meio
 * @param h float: altura do retangulo que representa o meio
 */
function Meio(n, x, y, w, h)
{
    this.n = n;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.rect = new fabric.Rect({
        left: this.x,
        top: this.y,
        width: this.w,
        height: this.h,
        originX: 'left',
        originY: 'top',
        selectable: false,
        fill: this.calculaTomDeCinza(n)
    });
}    
/** Muda o indice de refracao desse meio
 * @param n float: indice de refracao do meio
 */
Meio.prototype.mudaMeio = function(n)
{
    this.n = n;
    this.rect.fill = this.calculaTomDeCinza(n);
}
/** calcula um novo tom de cinza para o meio, baseado no indice de refracao
 * @param n float: indice de refracao do meio
 */
Meio.prototype.calculaTomDeCinza = function(n)
{
    var a = n/(1+n); // a eh uma funcao logistica (a = 0 se n = 0 e a = 1 se n -> infinito)
    a = (1-a*a*a*a)*255; // levando a para o intervalo entre 0 e 255, de tras para frente (1 - a^4)
    a = parseInt(a).toString(16); // convertendo para hexadecimal a parte inteira de a
    if (a.length == 1) // se a tiver soh 1 digito, entao ele deve ser repetido
    {
        a = a + a;
    }
    return '#' + a + a + a; // retorna o tom de cinza definido por a
}

/* Objeto que representa uma lei de Snell
 * de um feixe com ângulo de incidência theta1, vindo de um meio com n1 para um meio com n2
 *
 * float n1: refringencia do meio 1 (de onde o feixe incide)
 * float n2: refringencia do meio 2 (onde o feixe refrata)
 */
function LeiDeSnell(n1, n2)
{
    this.n1 = n1;
    this.n2 = n2;
}
/* calcula o angulo de reflexao (eh SEMPRE igual a -theta1)
 * float theta1: angulo (em radianos) entre o feixe e a normal à interface no meio 1
 */
LeiDeSnell.prototype.thetaReflex = function(theta1)
{
    return -theta1;
}
/* calcula o angulo de refracao
 * o angulo de refracao so existe se a expressao sen(theta2) = n1 sen(theta1) / n2 < 1
 * caso contrario, pode ocorrer reflexao total (reflexao total so é possível quando n1 > n2)
 * em caso de reflexao total, theta2 = NaN
 * float theta1: angulo (em radianos) entre o feixe e a normal à interface no meio 1
 * return float: angulo de refracao (em radianos, em relacao a normal da interface no meio 2)
 */
LeiDeSnell.prototype.theta2 = function(theta1)
{
    return Math.asin(this.n1 * Math.sin(theta1) / this.n2);
}
LeiDeSnell.prototype.toggleMedia = function(newN1, newN2)
{
    this.n1 = newN1;
    this.n2 = newN2;
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