var ISParticleQt = 1; // quantidade de tipos de partículas interestelares

// constantes globais de entrada
var sphereRadius = 0.5; // metros - raio da esfera onde o pósitron vai passear
var sphereVolume = 4 * Math.PI * sphereRadius*sphereRadius*sphereRadius / 3; // metros cúbicos

/* Pendências:
 * - arrumar unidades
 * - obter dados reais
 */

/* Correspondência de índices
 * - primeiro índice: tipo de partícula
 *   0: genérico
 * - segundo índice: tipo da seção de choque
 *   0: total
 *   1: aniquilação
 *   2: formação Ps
 *   3: elástica
 *   4: ionização
 * - terceiro índice: número do dado csXenergia
 */

var density_Dat = new Array(ISParticleQt);
/* considerando 1 mol de partículas no volume da esfera que tem 1 m de raio, a densidade fica:
 * n = 1 mol = 6,0221x10^23 partículas e o volume é v = 4/3 * pi * r^3 m³
 * portanto densidade = n/v
 */
density_Dat[0] = 6.0221E+23 / sphereVolume; // part/m³

// energy data for IS particles
var energy_xDat = new Array(ISParticleQt);
energy_xDat[0] = new Array(3);
for (var i = 0; i < 3; i++) energy_xDat[0][i] = new Array(100);

// cross section data for the IS particles
var crSect_yDat = new Array(ISParticleQt);
crSect_yDat[0] = new Array(3);
for (var i = 0; i < 3; i++) crSect_yDat[0][i] = new Array(100);

// energia em eV e seção de choque em E-16 cm²
energy_xDat[0][0][0] = 5.0000000000E-1; crSect_yDat[0][0][0] = 4.0673517130E+2;
energy_xDat[0][0][1] = 1.0000000000E+0; crSect_yDat[0][0][1] = 4.1896579900E+2;
energy_xDat[0][0][2] = 1.5000000000E+0; crSect_yDat[0][0][2] = 4.2643656930E+2;
energy_xDat[0][0][3] = 2.0000000000E+0; crSect_yDat[0][0][3] = 4.2932848060E+2;
energy_xDat[0][0][4] = 2.5000000000E+0; crSect_yDat[0][0][4] = 4.2789962390E+2;
energy_xDat[0][0][5] = 3.0000000000E+0; crSect_yDat[0][0][5] = 4.2247394530E+2;
energy_xDat[0][0][6] = 3.5000000000E+0; crSect_yDat[0][0][6] = 4.1342886750E+2;
energy_xDat[0][0][7] = 4.0000000000E+0; crSect_yDat[0][0][7] = 4.0118226680E+2;
energy_xDat[0][0][8] = 4.5000000000E+0; crSect_yDat[0][0][8] = 3.8617928760E+2;
energy_xDat[0][0][9] = 5.0000000000E+0; crSect_yDat[0][0][9] = 3.6887944940E+2;
energy_xDat[0][0][10] = 5.5000000000E+0; crSect_yDat[0][0][10] = 3.4974445120E+2;
energy_xDat[0][0][11] = 6.0000000000E+0; crSect_yDat[0][0][11] = 3.2922701620E+2;
energy_xDat[0][0][12] = 6.5000000000E+0; crSect_yDat[0][0][12] = 3.0776105150E+2;
energy_xDat[0][0][13] = 7.0000000000E+0; crSect_yDat[0][0][13] = 2.8575331950E+2;
energy_xDat[0][0][14] = 7.5000000000E+0; crSect_yDat[0][0][14] = 2.6357674310E+2;
energy_xDat[0][0][15] = 8.0000000000E+0; crSect_yDat[0][0][15] = 2.4156539020E+2;
energy_xDat[0][0][16] = 8.5000000000E+0; crSect_yDat[0][0][16] = 2.2001111870E+2;
energy_xDat[0][0][17] = 9.0000000000E+0; crSect_yDat[0][0][17] = 1.9916179790E+2;
energy_xDat[0][0][18] = 9.5000000000E+0; crSect_yDat[0][0][18] = 1.7922097910E+2;
energy_xDat[0][0][19] = 1.0000000000E+1; crSect_yDat[0][0][19] = 1.6034884470E+2;
energy_xDat[0][0][20] = 1.0500000000E+1; crSect_yDat[0][0][20] = 1.6356902618E+2;
energy_xDat[0][0][21] = 1.1000000000E+1; crSect_yDat[0][0][21] = 1.5811512970E+2;
energy_xDat[0][0][22] = 1.1500000000E+1; crSect_yDat[0][0][22] = 1.5064553160E+2;
energy_xDat[0][0][23] = 1.2000000000E+1; crSect_yDat[0][0][23] = 1.4175428606E+2;
energy_xDat[0][0][24] = 1.2500000000E+1; crSect_yDat[0][0][24] = 1.3195286338E+2;
energy_xDat[0][0][25] = 1.3000000000E+1; crSect_yDat[0][0][25] = 1.2167454716E+2;
energy_xDat[0][0][26] = 1.3500000000E+1; crSect_yDat[0][0][26] = 1.1127894756E+2;
energy_xDat[0][0][27] = 1.4000000000E+1; crSect_yDat[0][0][27] = 1.0105709147E+2;
energy_xDat[0][0][28] = 1.4500000000E+1; crSect_yDat[0][0][28] = 9.1237178469E+1;
energy_xDat[0][0][29] = 1.5000000000E+1; crSect_yDat[0][0][29] = 8.1990899248E+1;
energy_xDat[0][0][30] = 1.5500000000E+1; crSect_yDat[0][0][30] = 7.3440124690E+1;
energy_xDat[0][0][31] = 1.6000000000E+1; crSect_yDat[0][0][31] = 6.5663742161E+1;
energy_xDat[0][0][32] = 1.6500000000E+1; crSect_yDat[0][0][32] = 5.8704421013E+1;
energy_xDat[0][0][33] = 1.7000000000E+1; crSect_yDat[0][0][33] = 5.2575113526E+1;
energy_xDat[0][0][34] = 1.7500000000E+1; crSect_yDat[0][0][34] = 4.7265133632E+1;
energy_xDat[0][0][35] = 1.8000000000E+1; crSect_yDat[0][0][35] = 4.2745695561E+1;
energy_xDat[0][0][36] = 1.8500000000E+1; crSect_yDat[0][0][36] = 3.8974834974E+1;
energy_xDat[0][0][37] = 1.9000000000E+1; crSect_yDat[0][0][37] = 3.5901672293E+1;
energy_xDat[0][0][38] = 1.9500000000E+1; crSect_yDat[0][0][38] = 3.3470010639E+1;
energy_xDat[0][0][39] = 2.0000000000E+1; crSect_yDat[0][0][39] = 3.1621287032E+1;
energy_xDat[0][0][40] = 2.0500000000E+1; crSect_yDat[0][0][40] = 3.0296917202E+1;
energy_xDat[0][0][41] = 2.1000000000E+1; crSect_yDat[0][0][41] = 2.9440088188E+1;
energy_xDat[0][0][42] = 2.1500000000E+1; crSect_yDat[0][0][42] = 2.8997062728E+1;
energy_xDat[0][0][43] = 2.2000000000E+1; crSect_yDat[0][0][43] = 2.8918063896E+1;
energy_xDat[0][0][44] = 2.2500000000E+1; crSect_yDat[0][0][44] = 2.9157809024E+1;
energy_xDat[0][0][45] = 2.3000000000E+1; crSect_yDat[0][0][45] = 2.9675759289E+1;
energy_xDat[0][0][46] = 2.3500000000E+1; crSect_yDat[0][0][46] = 3.0436146651E+1;
energy_xDat[0][0][47] = 2.4000000000E+1; crSect_yDat[0][0][47] = 3.1407833511E+1;
energy_xDat[0][0][48] = 2.4500000000E+1; crSect_yDat[0][0][48] = 3.2564053139E+1;
energy_xDat[0][0][49] = 2.5000000000E+1; crSect_yDat[0][0][49] = 3.3882071561E+1;
energy_xDat[0][0][50] = 2.5500000000E+1; crSect_yDat[0][0][50] = 3.5342804144E+1;
energy_xDat[0][0][51] = 2.6000000000E+1; crSect_yDat[0][0][51] = 3.6930413239E+1;
energy_xDat[0][0][52] = 2.6500000000E+1; crSect_yDat[0][0][52] = 3.8631906933E+1;
energy_xDat[0][0][53] = 2.7000000000E+1; crSect_yDat[0][0][53] = 4.0436753480E+1;
energy_xDat[0][0][54] = 2.7500000000E+1; crSect_yDat[0][0][54] = 4.2336521410E+1;
energy_xDat[0][0][55] = 2.8000000000E+1; crSect_yDat[0][0][55] = 4.4324551511E+1;
energy_xDat[0][0][56] = 2.8500000000E+1; crSect_yDat[0][0][56] = 4.6395663569E+1;
energy_xDat[0][0][57] = 2.9000000000E+1; crSect_yDat[0][0][57] = 4.8545898973E+1;
energy_xDat[0][0][58] = 2.9500000000E+1; crSect_yDat[0][0][58] = 5.0772298099E+1;
energy_xDat[0][0][59] = 3.0000000000E+1; crSect_yDat[0][0][59] = 5.3072710532E+1;
energy_xDat[0][0][60] = 3.0500000000E+1; crSect_yDat[0][0][60] = 5.5445635374E+1;
energy_xDat[0][0][61] = 3.1000000000E+1; crSect_yDat[0][0][61] = 5.7890088283E+1;
energy_xDat[0][0][62] = 3.1500000000E+1; crSect_yDat[0][0][62] = 6.0405492484E+1;
energy_xDat[0][0][63] = 3.2000000000E+1; crSect_yDat[0][0][63] = 6.2991589599E+1;
energy_xDat[0][0][64] = 3.2500000000E+1; crSect_yDat[0][0][64] = 6.5648368109E+1;
energy_xDat[0][0][65] = 3.3000000000E+1; crSect_yDat[0][0][65] = 6.8376006295E+1;
energy_xDat[0][0][66] = 3.3500000000E+1; crSect_yDat[0][0][66] = 7.1174827076E+1;
energy_xDat[0][0][67] = 3.4000000000E+1; crSect_yDat[0][0][67] = 7.4045262482E+1;
energy_xDat[0][0][68] = 3.4500000000E+1; crSect_yDat[0][0][68] = 7.6987826323E+1;
energy_xDat[0][0][69] = 3.5000000000E+1; crSect_yDat[0][0][69] = 8.0003092910E+1;
energy_xDat[0][0][70] = 3.5500000000E+1; crSect_yDat[0][0][70] = 8.3091680974E+1;
energy_xDat[0][0][71] = 3.6000000000E+1; crSect_yDat[0][0][71] = 8.6254241334E+1;
energy_xDat[0][0][72] = 3.6500000000E+1; crSect_yDat[0][0][72] = 8.9491447752E+1;
energy_xDat[0][0][73] = 3.7000000000E+1; crSect_yDat[0][0][73] = 9.2803990060E+1;
energy_xDat[0][0][74] = 3.7500000000E+1; crSect_yDat[0][0][74] = 9.6192569054E+1;
energy_xDat[0][0][75] = 3.8000000000E+1; crSect_yDat[0][0][75] = 9.9657892843E+1;
energy_xDat[0][0][76] = 3.8500000000E+1; crSect_yDat[0][0][76] = 1.0320067393E+2;
energy_xDat[0][0][77] = 3.9000000000E+1; crSect_yDat[0][0][77] = 1.0682162762E+2;
energy_xDat[0][0][78] = 3.9500000000E+1; crSect_yDat[0][0][78] = 1.1052147015E+2;
energy_xDat[0][0][79] = 4.0000000000E+1; crSect_yDat[0][0][79] = 1.1430091817E+2;
energy_xDat[0][0][80] = 4.0500000000E+1; crSect_yDat[0][0][80] = 1.1816068767E+2;
energy_xDat[0][0][81] = 4.1000000000E+1; crSect_yDat[0][0][81] = 1.2210149376E+2;
energy_xDat[0][0][82] = 4.1500000000E+1; crSect_yDat[0][0][82] = 1.2612405011E+2;
energy_xDat[0][0][83] = 4.2000000000E+1; crSect_yDat[0][0][83] = 1.3022906889E+2;
energy_xDat[0][0][84] = 4.2500000000E+1; crSect_yDat[0][0][84] = 1.3441726071E+2;
energy_xDat[0][0][85] = 4.3000000000E+1; crSect_yDat[0][0][85] = 1.3868933424E+2;
energy_xDat[0][0][86] = 4.3500000000E+1; crSect_yDat[0][0][86] = 1.4304599635E+2;
energy_xDat[0][0][87] = 4.4000000000E+1; crSect_yDat[0][0][87] = 1.4748795216E+2;
energy_xDat[0][0][88] = 4.4500000000E+1; crSect_yDat[0][0][88] = 1.5201590479E+2;
energy_xDat[0][0][89] = 4.5000000000E+1; crSect_yDat[0][0][89] = 1.5663055555E+2;
energy_xDat[0][0][90] = 4.5500000000E+1; crSect_yDat[0][0][90] = 1.6133260396E+2;
energy_xDat[0][0][91] = 4.6000000000E+1; crSect_yDat[0][0][91] = 1.6612274762E+2;
energy_xDat[0][0][92] = 4.6500000000E+1; crSect_yDat[0][0][92] = 1.7100168236E+2;
energy_xDat[0][0][93] = 4.7000000000E+1; crSect_yDat[0][0][93] = 1.7597010213E+2;
energy_xDat[0][0][94] = 4.7500000000E+1; crSect_yDat[0][0][94] = 1.8102869921E+2;
energy_xDat[0][0][95] = 4.8000000000E+1; crSect_yDat[0][0][95] = 1.8617816400E+2;
energy_xDat[0][0][96] = 4.8500000000E+1; crSect_yDat[0][0][96] = 1.9141918516E+2;
energy_xDat[0][0][97] = 4.9000000000E+1; crSect_yDat[0][0][97] = 1.9675244980E+2;
energy_xDat[0][0][98] = 4.9500000000E+1; crSect_yDat[0][0][98] = 2.0217864316E+2;
energy_xDat[0][0][99] = 5.0000000000E+1; crSect_yDat[0][0][99] = 2.0769844879E+2;
energy_xDat[0][1][0] = 5.0000000000E-1; crSect_yDat[0][1][0] = 9.2366029852E+0;
energy_xDat[0][1][1] = 1.0000000000E+0; crSect_yDat[0][1][1] = 1.7681247031E+1;
energy_xDat[0][1][2] = 1.5000000000E+0; crSect_yDat[0][1][2] = 2.5290549238E+1;
energy_xDat[0][1][3] = 2.0000000000E+0; crSect_yDat[0][1][3] = 3.2032981305E+1;
energy_xDat[0][1][4] = 2.5000000000E+0; crSect_yDat[0][1][4] = 3.7889639630E+1;
energy_xDat[0][1][5] = 3.0000000000E+0; crSect_yDat[0][1][5] = 4.2854586810E+1;
energy_xDat[0][1][6] = 3.5000000000E+0; crSect_yDat[0][1][6] = 4.6934782838E+1;
energy_xDat[0][1][7] = 4.0000000000E+0; crSect_yDat[0][1][7] = 5.0149634645E+1;
energy_xDat[0][1][8] = 4.5000000000E+0; crSect_yDat[0][1][8] = 5.2530202453E+1;
energy_xDat[0][1][9] = 5.0000000000E+0; crSect_yDat[0][1][9] = 5.4118109936E+1;
energy_xDat[0][1][10] = 5.5000000000E+0; crSect_yDat[0][1][10] = 5.4964211965E+1;
energy_xDat[0][1][11] = 6.0000000000E+0; crSect_yDat[0][1][11] = 5.5127078374E+1;
energy_xDat[0][1][12] = 6.5000000000E+0; crSect_yDat[0][1][12] = 5.4671354527E+1;
energy_xDat[0][1][13] = 7.0000000000E+0; crSect_yDat[0][1][13] = 5.3666059491E+1;
energy_xDat[0][1][14] = 7.5000000000E+0; crSect_yDat[0][1][14] = 5.2182880311E+1;
energy_xDat[0][1][15] = 8.0000000000E+0; crSect_yDat[0][1][15] = 5.0294516575E+1;
energy_xDat[0][1][16] = 8.5000000000E+0; crSect_yDat[0][1][16] = 4.8073123358E+1;
energy_xDat[0][1][17] = 9.0000000000E+0; crSect_yDat[0][1][17] = 4.5588893136E+1;
energy_xDat[0][1][18] = 9.5000000000E+0; crSect_yDat[0][1][18] = 4.2908808868E+1;
energy_xDat[0][1][19] = 1.0000000000E+1; crSect_yDat[0][1][19] = 4.0095591432E+1;
energy_xDat[0][1][20] = 1.0500000000E+1; crSect_yDat[0][1][20] = 3.7206855597E+1;
energy_xDat[0][1][21] = 1.1000000000E+1; crSect_yDat[0][1][21] = 3.4294479935E+1;
energy_xDat[0][1][22] = 1.1500000000E+1; crSect_yDat[0][1][22] = 3.1404188009E+1;
energy_xDat[0][1][23] = 1.2000000000E+1; crSect_yDat[0][1][23] = 2.8575331042E+1;
energy_xDat[0][1][24] = 1.2500000000E+1; crSect_yDat[0][1][24] = 2.5840856269E+1;
energy_xDat[0][1][25] = 1.3000000000E+1; crSect_yDat[0][1][25] = 2.3227440499E+1;
energy_xDat[0][1][26] = 1.3500000000E+1; crSect_yDat[0][1][26] = 2.0755765078E+1;
energy_xDat[0][1][27] = 1.4000000000E+1; crSect_yDat[0][1][27] = 1.8440906416E+1;
energy_xDat[0][1][28] = 1.4500000000E+1; crSect_yDat[0][1][28] = 1.6292815530E+1;
energy_xDat[0][1][29] = 1.5000000000E+1; crSect_yDat[0][1][29] = 1.4316860432E+1;
energy_xDat[0][1][30] = 1.5500000000E+1; crSect_yDat[0][1][30] = 1.2514406542E+1;
energy_xDat[0][1][31] = 1.6000000000E+1; crSect_yDat[0][1][31] = 1.0883412475E+1;
energy_xDat[0][1][32] = 1.6500000000E+1; crSect_yDat[0][1][32] = 9.4190212564E+0;
energy_xDat[0][1][33] = 1.7000000000E+1; crSect_yDat[0][1][33] = 8.1141301200E+0;
energy_xDat[0][1][34] = 1.7500000000E+1; crSect_yDat[0][1][34] = 6.9599253420E+0;
energy_xDat[0][1][35] = 1.8000000000E+1; crSect_yDat[0][1][35] = 5.9463718692E+0;
energy_xDat[0][1][36] = 1.8500000000E+1; crSect_yDat[0][1][36] = 5.0626506815E+0;
energy_xDat[0][1][37] = 1.9000000000E+1; crSect_yDat[0][1][37] = 4.2975397692E+0;
energy_xDat[0][1][38] = 1.9500000000E+1; crSect_yDat[0][1][38] = 3.6397372165E+0;
energy_xDat[0][1][39] = 2.0000000000E+1; crSect_yDat[0][1][39] = 3.0781271044E+0;
energy_xDat[0][1][40] = 2.0500000000E+1; crSect_yDat[0][1][40] = 2.6019907564E+0;
energy_xDat[0][1][41] = 2.1000000000E+1; crSect_yDat[0][1][41] = 2.2011672421E+0;
energy_xDat[0][1][42] = 2.1500000000E+1; crSect_yDat[0][1][42] = 1.8661680359E+0;
energy_xDat[0][1][43] = 2.2000000000E+1; crSect_yDat[0][1][43] = 1.5882513510E+0;
energy_xDat[0][1][44] = 2.2500000000E+1; crSect_yDat[0][1][44] = 1.3594619515E+0;
energy_xDat[0][1][45] = 2.3000000000E+1; crSect_yDat[0][1][45] = 1.1726422637E+0;
energy_xDat[0][1][46] = 2.3500000000E+1; crSect_yDat[0][1][46] = 1.0214203905E+0;
energy_xDat[0][1][47] = 2.4000000000E+1; crSect_yDat[0][1][47] = 9.0018025921E-1;
energy_xDat[0][1][48] = 2.4500000000E+1; crSect_yDat[0][1][48] = 8.0401862919E-1;
energy_xDat[0][1][49] = 2.5000000000E+1; crSect_yDat[0][1][49] = 7.2869311451E-1;
energy_xDat[0][1][50] = 2.5500000000E+1; crSect_yDat[0][1][50] = 6.7056477193E-1;
energy_xDat[0][1][51] = 2.6000000000E+1; crSect_yDat[0][1][51] = 6.2653819565E-1;
energy_xDat[0][1][52] = 2.6500000000E+1; crSect_yDat[0][1][52] = 5.9400147835E-1;
energy_xDat[0][1][53] = 2.7000000000E+1; crSect_yDat[0][1][53] = 5.7076785890E-1;
energy_xDat[0][1][54] = 2.7500000000E+1; crSect_yDat[0][1][54] = 5.5502039358E-1;
energy_xDat[0][1][55] = 2.8000000000E+1; crSect_yDat[0][1][55] = 5.4526056792E-1;
energy_xDat[0][1][56] = 2.8500000000E+1; crSect_yDat[0][1][56] = 5.4026141194E-1;
energy_xDat[0][1][57] = 2.9000000000E+1; crSect_yDat[0][1][57] = 5.3902539197E-1;
energy_xDat[0][1][58] = 2.9500000000E+1; crSect_yDat[0][1][58] = 5.4074712391E-1;
energy_xDat[0][1][59] = 3.0000000000E+1; crSect_yDat[0][1][59] = 5.4478077978E-1;
energy_xDat[0][1][60] = 3.0500000000E+1; crSect_yDat[0][1][60] = 5.5061193488E-1;
energy_xDat[0][1][61] = 3.1000000000E+1; crSect_yDat[0][1][61] = 5.5783352019E-1;
energy_xDat[0][1][62] = 3.1500000000E+1; crSect_yDat[0][1][62] = 5.6612549584E-1;
energy_xDat[0][1][63] = 3.2000000000E+1; crSect_yDat[0][1][63] = 5.7523783994E-1;
energy_xDat[0][1][64] = 3.2500000000E+1; crSect_yDat[0][1][64] = 5.8497644647E-1;
energy_xDat[0][1][65] = 3.3000000000E+1; crSect_yDat[0][1][65] = 5.9519154074E-1;
energy_xDat[0][1][66] = 3.3500000000E+1; crSect_yDat[0][1][66] = 6.0576824587E-1;
energy_xDat[0][1][67] = 3.4000000000E+1; crSect_yDat[0][1][67] = 6.1661896563E-1;
energy_xDat[0][1][68] = 3.4500000000E+1; crSect_yDat[0][1][68] = 6.2767728434E-1;
energy_xDat[0][1][69] = 3.5000000000E+1; crSect_yDat[0][1][69] = 6.3889312036E-1;
energy_xDat[0][1][70] = 3.5500000000E+1; crSect_yDat[0][1][70] = 6.5022890540E-1;
energy_xDat[0][1][71] = 3.6000000000E+1; crSect_yDat[0][1][71] = 6.6165659544E-1;
energy_xDat[0][1][72] = 3.6500000000E+1; crSect_yDat[0][1][72] = 6.7315534939E-1;
energy_xDat[0][1][73] = 3.7000000000E+1; crSect_yDat[0][1][73] = 6.8470973952E-1;
energy_xDat[0][1][74] = 3.7500000000E+1; crSect_yDat[0][1][74] = 6.9630838161E-1;
energy_xDat[0][1][75] = 3.8000000000E+1; crSect_yDat[0][1][75] = 7.0794289373E-1;
energy_xDat[0][1][76] = 3.8500000000E+1; crSect_yDat[0][1][76] = 7.1960711024E-1;
energy_xDat[0][1][77] = 3.9000000000E+1; crSect_yDat[0][1][77] = 7.3129649243E-1;
energy_xDat[0][1][78] = 3.9500000000E+1; crSect_yDat[0][1][78] = 7.4300768958E-1;
energy_xDat[0][1][79] = 4.0000000000E+1; crSect_yDat[0][1][79] = 7.5473821418E-1;
energy_xDat[0][1][80] = 4.0500000000E+1; crSect_yDat[0][1][80] = 7.6648620314E-1;
energy_xDat[0][1][81] = 4.1000000000E+1; crSect_yDat[0][1][81] = 7.7825024328E-1;
energy_xDat[0][1][82] = 4.1500000000E+1; crSect_yDat[0][1][82] = 7.9002924470E-1;
energy_xDat[0][1][83] = 4.2000000000E+1; crSect_yDat[0][1][83] = 8.0182234928E-1;
energy_xDat[0][1][84] = 4.2500000000E+1; crSect_yDat[0][1][84] = 8.1362886512E-1;
energy_xDat[0][1][85] = 4.3000000000E+1; crSect_yDat[0][1][85] = 8.2544821965E-1;
energy_xDat[0][1][86] = 4.3500000000E+1; crSect_yDat[0][1][86] = 8.3727992638E-1;
energy_xDat[0][1][87] = 4.4000000000E+1; crSect_yDat[0][1][87] = 8.4912356137E-1;
energy_xDat[0][1][88] = 4.4500000000E+1; crSect_yDat[0][1][88] = 8.6097874673E-1;
energy_xDat[0][1][89] = 4.5000000000E+1; crSect_yDat[0][1][89] = 8.7284513895E-1;
energy_xDat[0][1][90] = 4.5500000000E+1; crSect_yDat[0][1][90] = 8.8472242075E-1;
energy_xDat[0][1][91] = 4.6000000000E+1; crSect_yDat[0][1][91] = 8.9661029544E-1;
energy_xDat[0][1][92] = 4.6500000000E+1; crSect_yDat[0][1][92] = 9.0850848286E-1;
energy_xDat[0][1][93] = 4.7000000000E+1; crSect_yDat[0][1][93] = 9.2041671659E-1;
energy_xDat[0][1][94] = 4.7500000000E+1; crSect_yDat[0][1][94] = 9.3233474194E-1;
energy_xDat[0][1][95] = 4.8000000000E+1; crSect_yDat[0][1][95] = 9.4426231448E-1;
energy_xDat[0][1][96] = 4.8500000000E+1; crSect_yDat[0][1][96] = 9.5619919899E-1;
energy_xDat[0][1][97] = 4.9000000000E+1; crSect_yDat[0][1][97] = 9.6814516868E-1;
energy_xDat[0][1][98] = 4.9500000000E+1; crSect_yDat[0][1][98] = 9.8010000452E-1;
energy_xDat[0][1][99] = 5.0000000000E+1; crSect_yDat[0][1][99] = 9.9206349482E-1;
energy_xDat[0][2][0] = 5.0000000000E-1; crSect_yDat[0][2][0] = 2.5933310215E+2;
energy_xDat[0][2][1] = 1.0000000000E+0; crSect_yDat[0][2][1] = 2.5604481166E+2;
energy_xDat[0][2][2] = 1.5000000000E+0; crSect_yDat[0][2][2] = 2.5056294599E+2;
energy_xDat[0][2][3] = 2.0000000000E+0; crSect_yDat[0][2][3] = 2.4314076339E+2;
energy_xDat[0][2][4] = 2.5000000000E+0; crSect_yDat[0][2][4] = 2.3404804837E+2;
energy_xDat[0][2][5] = 3.0000000000E+0; crSect_yDat[0][2][5] = 2.2356329768E+2;
energy_xDat[0][2][6] = 3.5000000000E+0; crSect_yDat[0][2][6] = 2.1196632886E+2;
energy_xDat[0][2][7] = 4.0000000000E+0; crSect_yDat[0][2][7] = 1.9953151962E+2;
energy_xDat[0][2][8] = 4.5000000000E+0; crSect_yDat[0][2][8] = 1.8652184393E+2;
energy_xDat[0][2][9] = 5.0000000000E+0; crSect_yDat[0][2][9] = 1.7318382450E+2;
energy_xDat[0][2][10] = 5.5000000000E+0; crSect_yDat[0][2][10] = 1.5974347511E+2;
energy_xDat[0][2][11] = 6.0000000000E+0; crSect_yDat[0][2][11] = 1.4640326133E+2;
energy_xDat[0][2][12] = 6.5000000000E+0; crSect_yDat[0][2][12] = 1.3334006656E+2;
energy_xDat[0][2][13] = 7.0000000000E+0; crSect_yDat[0][2][13] = 1.2070411472E+2;
energy_xDat[0][2][14] = 7.5000000000E+0; crSect_yDat[0][2][14] = 1.0861877020E+2;
energy_xDat[0][2][15] = 8.0000000000E+0; crSect_yDat[0][2][15] = 9.7181113238E+1;
energy_xDat[0][2][16] = 8.5000000000E+0; crSect_yDat[0][2][16] = 8.6463172472E+1;
energy_xDat[0][2][17] = 9.0000000000E+0; crSect_yDat[0][2][17] = 7.6513687703E+1;
energy_xDat[0][2][18] = 9.5000000000E+0; crSect_yDat[0][2][18] = 6.7360273228E+1;
energy_xDat[0][2][19] = 1.0000000000E+1; crSect_yDat[0][2][19] = 5.9011855418E+1;
energy_xDat[0][2][20] = 1.0500000000E+1; crSect_yDat[0][2][20] = 5.1461266165E+1;
energy_xDat[0][2][21] = 1.1000000000E+1; crSect_yDat[0][2][21] = 4.4687885562E+1;
energy_xDat[0][2][22] = 1.1500000000E+1; crSect_yDat[0][2][22] = 3.8660241568E+1;
energy_xDat[0][2][23] = 1.2000000000E+1; crSect_yDat[0][2][23] = 3.3338490331E+1;
energy_xDat[0][2][24] = 1.2500000000E+1; crSect_yDat[0][2][24] = 2.8676717464E+1;
energy_xDat[0][2][25] = 1.3000000000E+1; crSect_yDat[0][2][25] = 2.4625016835E+1;
energy_xDat[0][2][26] = 1.3500000000E+1; crSect_yDat[0][2][26] = 2.1131318870E+1;
energy_xDat[0][2][27] = 1.4000000000E+1; crSect_yDat[0][2][27] = 1.8142954238E+1;
energy_xDat[0][2][28] = 1.4500000000E+1; crSect_yDat[0][2][28] = 1.5607950846E+1;
energy_xDat[0][2][29] = 1.5000000000E+1; crSect_yDat[0][2][29] = 1.3476072069E+1;
energy_xDat[0][2][30] = 1.5500000000E+1; crSect_yDat[0][2][30] = 1.1699611947E+1;
energy_xDat[0][2][31] = 1.6000000000E+1; crSect_yDat[0][2][31] = 1.0233968847E+1;
energy_xDat[0][2][32] = 1.6500000000E+1; crSect_yDat[0][2][32] = 9.0380228489E+0;
energy_xDat[0][2][33] = 1.7000000000E+1; crSect_yDat[0][2][33] = 8.0743441432E+0;
energy_xDat[0][2][34] = 1.7500000000E+1; crSect_yDat[0][2][34] = 7.3092602654E+0;
energy_xDat[0][2][35] = 1.8000000000E+1; crSect_yDat[0][2][35] = 6.7128092973E+0;
energy_xDat[0][2][36] = 1.8500000000E+1; crSect_yDat[0][2][36] = 6.2586045381E+0;
energy_xDat[0][2][37] = 1.9000000000E+1; crSect_yDat[0][2][37] = 5.9236338498E+0;
energy_xDat[0][2][38] = 1.9500000000E+1; crSect_yDat[0][2][38] = 5.6880141564E+0;
energy_xDat[0][2][39] = 2.0000000000E+1; crSect_yDat[0][2][39] = 5.5347186318E+0;
energy_xDat[0][2][40] = 2.0500000000E+1; crSect_yDat[0][2][40] = 5.4492911369E+0;
energy_xDat[0][2][41] = 2.1000000000E+1; crSect_yDat[0][2][41] = 5.4195595841E+0;
energy_xDat[0][2][42] = 2.1500000000E+1; crSect_yDat[0][2][42] = 5.4353572353E+0;
energy_xDat[0][2][43] = 2.2000000000E+1; crSect_yDat[0][2][43] = 5.4882585364E+0;
energy_xDat[0][2][44] = 2.2500000000E+1; crSect_yDat[0][2][44] = 5.5713340039E+0;
energy_xDat[0][2][45] = 2.3000000000E+1; crSect_yDat[0][2][45] = 5.6789269165E+0;
energy_xDat[0][2][46] = 2.3500000000E+1; crSect_yDat[0][2][46] = 5.8064531315E+0;
energy_xDat[0][2][47] = 2.4000000000E+1; crSect_yDat[0][2][47] = 5.9502242154E+0;
energy_xDat[0][2][48] = 2.4500000000E+1; crSect_yDat[0][2][48] = 6.1072932279E+0;
energy_xDat[0][2][49] = 2.5000000000E+1; crSect_yDat[0][2][49] = 6.2753218902E+0;
energy_xDat[0][2][50] = 2.5500000000E+1; crSect_yDat[0][2][50] = 6.4524674701E+0;
energy_xDat[0][2][51] = 2.6000000000E+1; crSect_yDat[0][2][51] = 6.6372874847E+0;
energy_xDat[0][2][52] = 2.6500000000E+1; crSect_yDat[0][2][52] = 6.8286602261E+0;
energy_xDat[0][2][53] = 2.7000000000E+1; crSect_yDat[0][2][53] = 7.0257191235E+0;
energy_xDat[0][2][54] = 2.7500000000E+1; crSect_yDat[0][2][54] = 7.2277990318E+0;
energy_xDat[0][2][55] = 2.8000000000E+1; crSect_yDat[0][2][55] = 7.4343926733E+0;
energy_xDat[0][2][56] = 2.8500000000E+1; crSect_yDat[0][2][56] = 7.6451156150E+0;
energy_xDat[0][2][57] = 2.9000000000E+1; crSect_yDat[0][2][57] = 7.8596783459E+0;
energy_xDat[0][2][58] = 2.9500000000E+1; crSect_yDat[0][2][58] = 8.0778641927E+0;
energy_xDat[0][2][59] = 3.0000000000E+1; crSect_yDat[0][2][59] = 8.2995119942E+0;
energy_xDat[0][2][60] = 3.0500000000E+1; crSect_yDat[0][2][60] = 8.5245026112E+0;
energy_xDat[0][2][61] = 3.1000000000E+1; crSect_yDat[0][2][61] = 8.7527485043E+0;
energy_xDat[0][2][62] = 3.1500000000E+1; crSect_yDat[0][2][62] = 8.9841857400E+0;
energy_xDat[0][2][63] = 3.2000000000E+1; crSect_yDat[0][2][63] = 9.2187679045E+0;
energy_xDat[0][2][64] = 3.2500000000E+1; crSect_yDat[0][2][64] = 9.4564615037E+0;
energy_xDat[0][2][65] = 3.3000000000E+1; crSect_yDat[0][2][65] = 9.6972425095E+0;
energy_xDat[0][2][66] = 3.3500000000E+1; crSect_yDat[0][2][66] = 9.9410937862E+0;
energy_xDat[0][2][67] = 3.4000000000E+1; crSect_yDat[0][2][67] = 1.0188003185E+1;
energy_xDat[0][2][68] = 3.4500000000E+1; crSect_yDat[0][2][68] = 1.0437962142E+1;
energy_xDat[0][2][69] = 3.5000000000E+1; crSect_yDat[0][2][69] = 1.0690964657E+1;
energy_xDat[0][2][70] = 3.5500000000E+1; crSect_yDat[0][2][70] = 1.0947006549E+1;
energy_xDat[0][2][71] = 3.6000000000E+1; crSect_yDat[0][2][71] = 1.1206084921E+1;
energy_xDat[0][2][72] = 3.6500000000E+1; crSect_yDat[0][2][72] = 1.1468197780E+1;
energy_xDat[0][2][73] = 3.7000000000E+1; crSect_yDat[0][2][73] = 1.1733343757E+1;
energy_xDat[0][2][74] = 3.7500000000E+1; crSect_yDat[0][2][74] = 1.2001521924E+1;
energy_xDat[0][2][75] = 3.8000000000E+1; crSect_yDat[0][2][75] = 1.2272731651E+1;
energy_xDat[0][2][76] = 3.8500000000E+1; crSect_yDat[0][2][76] = 1.2546972512E+1;
energy_xDat[0][2][77] = 3.9000000000E+1; crSect_yDat[0][2][77] = 1.2824244226E+1;
energy_xDat[0][2][78] = 3.9500000000E+1; crSect_yDat[0][2][78] = 1.3104546601E+1;
energy_xDat[0][2][79] = 4.0000000000E+1; crSect_yDat[0][2][79] = 1.3387879514E+1;
energy_xDat[0][2][80] = 4.0500000000E+1; crSect_yDat[0][2][80] = 1.3674242882E+1;
energy_xDat[0][2][81] = 4.1000000000E+1; crSect_yDat[0][2][81] = 1.3963636650E+1;
energy_xDat[0][2][82] = 4.1500000000E+1; crSect_yDat[0][2][82] = 1.4256060785E+1;
energy_xDat[0][2][83] = 4.2000000000E+1; crSect_yDat[0][2][83] = 1.4551515263E+1;
energy_xDat[0][2][84] = 4.2500000000E+1; crSect_yDat[0][2][84] = 1.4850000068E+1;
energy_xDat[0][2][85] = 4.3000000000E+1; crSect_yDat[0][2][85] = 1.5151515194E+1;
energy_xDat[0][2][86] = 4.3500000000E+1; crSect_yDat[0][2][86] = 1.5456060632E+1;
energy_xDat[0][2][87] = 4.4000000000E+1; crSect_yDat[0][2][87] = 1.5763636379E+1;
energy_xDat[0][2][88] = 4.4500000000E+1; crSect_yDat[0][2][88] = 1.6074242434E+1;
energy_xDat[0][2][89] = 4.5000000000E+1; crSect_yDat[0][2][89] = 1.6387878794E+1;
energy_xDat[0][2][90] = 4.5500000000E+1; crSect_yDat[0][2][90] = 1.6704545458E+1;
energy_xDat[0][2][91] = 4.6000000000E+1; crSect_yDat[0][2][91] = 1.7024242426E+1;
energy_xDat[0][2][92] = 4.6500000000E+1; crSect_yDat[0][2][92] = 1.7346969698E+1;
energy_xDat[0][2][93] = 4.7000000000E+1; crSect_yDat[0][2][93] = 1.7672727273E+1;
energy_xDat[0][2][94] = 4.7500000000E+1; crSect_yDat[0][2][94] = 1.8001515152E+1;
energy_xDat[0][2][95] = 4.8000000000E+1; crSect_yDat[0][2][95] = 1.8333333334E+1;
energy_xDat[0][2][96] = 4.8500000000E+1; crSect_yDat[0][2][96] = 1.8668181818E+1;
energy_xDat[0][2][97] = 4.9000000000E+1; crSect_yDat[0][2][97] = 1.9006060606E+1;
energy_xDat[0][2][98] = 4.9500000000E+1; crSect_yDat[0][2][98] = 1.9346969697E+1;
energy_xDat[0][2][99] = 5.0000000000E+1; crSect_yDat[0][2][99] = 1.9690909091E+1;