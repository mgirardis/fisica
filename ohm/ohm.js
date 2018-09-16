/*
Author: Mauricio Girardi-Schappo, PhD.
Distributed under GNU License v3.0

9th of November, 2013
*/

window.onload = function()
{
    // de acordo com a descrição do projeto
    // os valores abaixo devem ser fixos
    // mas os deixei livre, por enquanto
    document.getElementById("materialComprimento").value = 100000;
    document.getElementById("materialArea").value = 0.01;
    
    // adicionando eventos
    document.getElementById("materialSelect").onchange = function()
    {
        // precisao da saida de dados (algarismos significativos) é 3 porque EU quero hehehe
        calculaDados(3);
    }
    
    document.getElementById("materialComprimento").onchange = function()
    {
        // precisao da saida de dados (algarismos significativos) é 3 porque EU quero hehehe
        calculaDados(3);
    }
    
    document.getElementById("materialArea").onchange = function()
    {
        // precisao da saida de dados (algarismos significativos) é 3 porque EU quero hehehe
        calculaDados(3);
    }
    
    document.getElementById("circuitoCalculaBtn").onclick = function()
    {
        // precisao da saida de dados (algarismos significativos) é 3 porque EU quero hehehe
        calculaDados(3);
    }
    
    document.getElementById("circuitoDDP").onchange = function()
    {
        // precisao da saida de dados (algarismos significativos) é 3 porque EU quero hehehe
        calculaDados(3);
        document.getElementById("circuitoDDPValue").value = this.value;
        
    }
    document.getElementById("circuitoDDPValue").value = document.getElementById("circuitoDDP").value;
    
    //
    calculaDados(3);
}

/* Coleta os dados, calcula o valor da resistencia do material e da corrente no circuito no SI e escreve a saída de dados.
 *
 * int precision: algarismos significativos da saida
 */
function calculaDados(precision)
{
    // entrada de dados
    var dados = coletaDados();

    // saida de dados
    var R = calculaResistencia(dados.rho, dados.L, dados.A);
    document.getElementById("circuitoResistencia").value = R.toPrecision(precision);
    document.getElementById("circuitoCorrente").value = calculaCorrente(dados.V, R).toPrecision(precision);
}

/* Coleta os dados da interface e retorna os valores no SI
 *
 * return: objeto anonimo com valores dos dados no SI
 */
function coletaDados()
{
    var dados = { 'V': parseFloat(document.getElementById("circuitoDDP").value), 'rho': parseFloat(document.getElementById("materialSelect").value), 'L': parseFloat(document.getElementById("materialComprimento").value), 'A': parseFloat(document.getElementById("materialArea").value) };
    
    //conversao para o SI do L e do A (necessaria porque rho ja está no SI):
    dados.A = dados.A * 1.0e-3 * 1.0e-3; //A em metros quadrados
    dados.L = dados.L * 1.0e-3; //L em metros
    
    return dados;
}

/* Calcula o valor da resistencia do material no SI. Entrada deve estar no SI.
 *
 * float rho: resistividade do material
 * float L: comprimento do material
 * float A: area de seção reta do material
 * return float: resistencia do material
 */
function calculaResistencia(rho, L, A)
{
    return rho * L / A;
}

/* Calcula o valor da corrente no circuito (lei de Ohm) no SI. Entrada deve estar no SI.
 *
 * float V: ddp no circuito do material
 * float R: resistencia do material
 * return float: resistencia do material
 */
function calculaCorrente(V, R)
{
    return V / R;
}