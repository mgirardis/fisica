/*
Author: Mauricio Girardi-Schappo, PhD.
Distributed under GNU License v3.0

19th of July, 2014
*/
window.onload = function()
{
    
    // adicionando eventos
    document.getElementById("barraMaterial").onchange = function()
    {
        // precisao da saida de dados (algarismos significativos) é 3 porque EU quero hehehe
        calculaDados(3);
    }
    document.getElementById("barraComprimento").onchange = function()
    {
        // precisao da saida de dados (algarismos significativos) é 3 porque EU quero hehehe
        calculaDados(3);
    }
    document.getElementById("fornoCalculaBtn").onclick = function()
    {
        // precisao da saida de dados (algarismos significativos) é 3 porque EU quero hehehe
        calculaDados(3);
    }
    document.getElementById("fornoTemperatura").onchange = function ()
    {
        document.getElementById("fornoTemperaturaValue").value = this.value;
        calculaDados(3);
    }
    document.getElementById("fornoTemperaturaValue").value = document.getElementById("fornoTemperatura").value;
    
    //
    calculaDados(3);
}

/* Coleta os dados, calcula o valor da dilatacao do material e do novo comprimento da barra no SI e escreve a saída de dados em centimetros.
 */
function calculaDados()
{
    // entrada de dados
    var dados = coletaDados();

    // saida de dados
    var DeltaL = calculaDilatacao(dados.L0, dados.alpha, dados.T - 20) * 1e2; // em centimetros e considerando Tambiente = 20 graus Celsius
    document.getElementById("barraDilatacao").value = DeltaL;
    document.getElementById("barraNovoComprimento").value = dados.L0 * 1e2 + DeltaL;
}

/* Coleta os dados da interface e retorna os valores no SI
 *
 * return: objeto anonimo com valores dos dados no SI
 */
function coletaDados()
{
    var dados = { 'T': parseFloat(document.getElementById("fornoTemperatura").value), 'alpha': parseFloat(document.getElementById("barraMaterial").value), 'L0': parseFloat(document.getElementById("barraComprimento").value) };
    
    //conversao para o SI das grandezas
    // alpha esta em K^-1, mas isso é igual a oC^-1, pois alpha depende de dL/dT e dT é igual para ambas as unidades
    // L0 esta em cm -> passando para metros
    // T esta em oC e pode continuar em graus C porque a DeltaT é igual em oC e em K
    dados.L0 = dados.L0 * 1.0e-2; //L em metros
    
    return dados;
}

/* Calcula a variação no comprimento da barra de comprimento L0, devida a uma dif de temperatura DeltaT, com coef linear alpha
 *
 * float L0: resistividade do material
 * float alpha: comprimento do material
 * float DeltaT: area de seção reta do material
 * return float: variação no comprimento da barra
 */
function calculaDilatacao(L0, alpha, DeltaT)
{
    return L0*alpha*DeltaT;
}