/* rc-roadparts.js --- реализация участков дорог для реализации 
 * игры гонки.
 * Автор: Матвеенко Е.А.
 * Дата: 22.01.2017  - 25.01.2017
 * 
 * Каждый участок состоит из одного или нескольких тайлов, опредленных
 * в текстурном атласе в img (mraces.json, mraces.png). Участок дороги - 
 * представляет либо прямой участок - вертикальный или горизонтальный, либо
 * под углом тангес которого равен -2.0, -0.5, 0.5, 2.0.
 * 
 * Каждый участок представляет из себя либо одно полосную дорогу, ширина которой
 * определяется одним тайлом, либо двуполосную, либо треполосную.
 * Повороты дороги могут быть либо на 90 градусов, дибо планый в два этапа.
 * 
 * Также предусмотрены рассширения и сужения  дороги.
 *  
 */

"use strict";



(function() {
    window.Roadparts = {};



    
/*Один участок дороги состоящий из нескольких тайлов.
 * Параметр:
 *    tileNames - двумерный массив тайлов, удобвно задавать в виде
 * [["<tile11>.png"," <tile21>.png", ..., "<tileM1>.png"],
 *  ["<tile12>.png", "<tile22>.png", ....,"<tileM2>.png"],
 *  ...
 *  ["<tile1N>.png", "<tile2N>.png", ..., "<tileMM>.png"]];
 *  
 *    
 * */    
    Roadparts.OneRoadPart = function (tileNames, distance){
        this.tileNames = tileNames;      
        this.distance = distance;      
    };                     
    
    
/* Roadparts.RoadTiles - задан массив тайлов и функции сравнения границ дорог */    
    

    Roadparts.roadParts = [
        
           
// 0 - участок дороги вертикальный ограниченный слева и справа шириной 1 тайл.
        new  Roadparts.OneRoadPart(
                [["01_lr_vert.png"]], 1.0),

// 1 - участок дороги горизонтальный ограниченный сверху и снизу шириной 1 тайл.
        new  Roadparts.OneRoadPart(
                [["02_tb_hor.png"]], 1.0),

// 2 - участок дороги вертикальный ограниченный слева и справа шириной 1 тайл
//c возможностью расширения вверху
        new  Roadparts.OneRoadPart(
                [["03_lr_u3.png"]], 1.0),
            
// 3 - участок дороги вертикальный ограниченный слева и справа шириной 1 тайл
//c возможностью расширения внизу
        new  Roadparts.OneRoadPart(
                [["03_lr_d3.png"]], 1.0),

            
// 4 - участок дороги вертикальный ограниченный слева и справа шириной 1 тайл
//c возможностью расширения внизу
        new  Roadparts.OneRoadPart(
                [["04_lr_d3.png"]], 1.0),

// 5 - участок дороги горизонтальный ограниченный сверху и снизу шириной 1 тайл
//с расщирением слева
        new  Roadparts.OneRoadPart(
                [["05_tb_l3.png"]], 1.0),
           

// 6 - участок дороги горизонтальный ограниченный сверху и снизу шириной 1 тайл
//с расщирением слева
        new  Roadparts.OneRoadPart(
                [["06_tb_r3.png"]], 1.0),
           
// 7 - поворот снизу направо или справо вниз
        new  Roadparts.OneRoadPart(
                [["65_to_right_1.png"]], 1.0),
            
// 8 - поворот снизу налева или слева вниз
        new  Roadparts.OneRoadPart(
                [["66_to_left_1.png"]], 1.0),

// 9 - поворот сверху направо или справо наверх
        new  Roadparts.OneRoadPart(
                [["67_to_right_2.png"]],  1.0),
            
// 10 - поворот сверху налево или слева наверх
        new  Roadparts.OneRoadPart(
                [["68_to_left_2.png"]], 1.0),

// 11 - вертикальный участок шириной два тайла  
        new  Roadparts.OneRoadPart(
                [["07_l_vert.png", "08_r_vert.png"]], 1.0),

            
// 12 - горизонтальный участок шириной два тайла имеет 
        new  Roadparts.OneRoadPart(
                [["09_t_hor.png"], 
                 ["10_b_hor.png"]],  1.0 ),
            
            
// 13 - поворот снизу направо дороги шириной 2
        new  Roadparts.OneRoadPart(
                [["39_lt_315.png", "40_lt_337.png"], 
                 ["50_lt_292.png", "55_an_315.png"]], 1.2  ),

// 14 - поворот снизу налево дороги шириной 2
        new  Roadparts.OneRoadPart(
                [["41_rt_22.png", "42_rt_45.png"], 
                 ["56_an_45.png", "43_rt_67.png"]], 1.2 ),

// 15 - поворот сверху направо дороги шириной 2
        new  Roadparts.OneRoadPart(
                [["49_lb_247.png", "58_an_225.png"], 
                 ["48_lb_225.png", "47_lb_202.png"]], 1.2 ),

// 16 - поворот сверху налево дороги шириной 2
        new  Roadparts.OneRoadPart(
                [["57_an_135.png", "44_rb_112.png"], 
                 ["46_rb_158.png", "45_rb_135.png"]], 1.2),


// 17 - снизу направо по отношению dy/dx = -2. ширина дороги 2.
        new  Roadparts.OneRoadPart(
                [["12_l_30_2.png", "13_l_30_3.png", "19_r_30_3.png"], 
                 ["11_l_30_1.png", "17_r_30_1.png", "18_r_30_2.png"]], 2.2 ),


// 18 - снизу налево по отношени dy/dx = 2 ширина дороги 2
        new  Roadparts.OneRoadPart(
                [["31_l_330_3.png", "26_r_330_1.png", "28_r_330_3.png"], 
                 ["30_l_330_2.png", "29_l_330_1.png", "27_r_330_2.png"]], 2.2 ),
            
            
// 19 - снизу направо по отношению dy/dx = -0.5. ширина дороги 2.
        new  Roadparts.OneRoadPart(
                [["15_l_60_2.png", "16_l_60_3.png"], 
                 ["14_l_60_1.png", "22_r_60_3.png"],
                 ["20_r_60_1.png", "21_r_60_2.png"]], 2.2 ),

            
// 20 - снизу налево по отношению dy/dx = 0.5. ширина дороги 2.            
        new  Roadparts.OneRoadPart(
                [["25_r_300_3.png", "24_r_300_2.png"], 
                 ["34_l_300_3.png", "23_r_300_1.png"],
                 ["33_l_300_2.png", "32_l_300_1.png"]], 2.2),
            
// 21 - плавный поворот с направление снизу на лево dy/dx = 2 на снизу налево
//dy/dx = 0.5
        new  Roadparts.OneRoadPart(
                [[null,         "15_l_60_2.png", "16_l_60_3.png" ], 
                 ["12_l_30_2.png",   "35_lt.png", "22_r_60_3.png"],
                 ["11_l_30_1.png", "17_r_30_1.png", "69_tune_d_r.png"]], 4.4),
            

 // 22 - плавный поворот с направление снизу направо dy/dx = 2 на снизу-направо
//dy/dx = 0.5
        new  Roadparts.OneRoadPart(
                [["25_r_300_3.png", "24_r_300_2.png", null ], 
                 ["34_l_300_3.png",   "36_rt.png", "22_r_60_3.png"],
                 ["70_tune_d_l.png", "29_l_330_1.png", "27_r_330_2.png"]], 4.4),
           
            
 // 23 - плавный поворот с направление с направления сверху направо dy/dx=2 на 
 //сверху направо dy/dx = 0.5
        new  Roadparts.OneRoadPart(
                [["31_l_330_3.png", "26_r_330_1.png", "71_tune_u_r.png" ], 
                 ["30_l_330_2.png",   "38_lb.png", "23_r_300_1.png"],
                 [null,            "33_l_300_2.png", "32_l_300_1.png"]], 4.4),
           
 // 24 - плавный поворот  с направления сверху налево dy/dx=2 на 
 //сверху налево dy/dx = 0.5
        new  Roadparts.OneRoadPart(
                [["72_tune_u_l.png",  "13_l_30_3.png",  "19_r_30_3.png" ], 
                 ["14_l_60_1.png",   "37_rb.png", "18_r_30_2.png"],
                 ["20_r_60_1.png",  "21_r_60_2.png", null]], 4.4),            
            
// 25 - три полосная дорога вертикальная
        new Roadparts.OneRoadPart(
                [["07_l_vert.png",  "00_no_border.png",  "08_r_vert.png" ]], 1 ),
 
// 26 - три полосная дорога горизонтальная
        new Roadparts.OneRoadPart(
                [["09_t_hor.png"],  
                 ["00_no_border.png"],  
                 ["10_b_hor.png" ]], 1 ),
             
// 27 - поворот снизу и направо трех полосной дороги.
        new Roadparts.OneRoadPart(
                [["51_315.png", "09_t_hor.png", "09_t_hor.png"],  
                 ["07_l_vert.png", "00_no_border.png", "00_no_border.png"],  
                 ["07_l_vert.png", "00_no_border.png", "55_an_315.png"]], 3 ),

            
// 28 - поворот снизу и налево трех полосной дороги.
        new Roadparts.OneRoadPart(
                [["09_t_hor.png", "09_t_hor.png", "52_45.png"],  
                 ["00_no_border.png", "00_no_border.png", "08_r_vert.png"],  
                 ["56_an_45.png", "00_no_border.png", "08_r_vert.png"]], 3),
            
// 29 - поворот сверху и направо трех полосной дороги.
        new Roadparts.OneRoadPart(
                [["07_l_vert.png", "00_no_border.png", "58_an_225.png"],  
                 ["07_l_vert.png", "00_no_border.png", "00_no_border.png"],  
                 ["54_225.png",     "10_b_hor.png",     "10_b_hor.png"]], 3),            
    
 // 30 - поворот сверху и налево трех полосной дороги.
        new Roadparts.OneRoadPart(
                [["57_an_135.png", "00_no_border.png", "08_r_vert.png"],  
                 ["00_no_border.png", "00_no_border.png", "08_r_vert.png"],  
                 ["10_b_hor.png",     "10_b_hor.png",     "53_135.png"]], 3 ),    
    
//Сужения и расширения
 // 31 - один внизу узкий на 1, вверху на 3
        new Roadparts.OneRoadPart(
                [["31_l_330_3.png", "00_no_border.png", "19_r_30_3.png"],  
                 ["30_l_330_2.png", "73_d_1_to_u_3.png", "18_r_30_2.png"]], 2),                

 // 32 - один вверху узкий на 1, внизу на 3
        new Roadparts.OneRoadPart(
                [["12_l_30_2.png", "75_t_1_to_b_3.png", "28_r_330_3.png"],  
                 ["11_l_30_1.png", "00_no_border.png", "27_r_330_2.png"]], 2 ),                
            
 // 33 - один слева узкий на 1, справа на 3
        new Roadparts.OneRoadPart(
                [["15_l_60_2.png",     "16_l_60_3.png"],  
                 ["74_l_1_to_r_3.png", "00_no_border.png" ],
                ["33_l_300_2.png",     "32_l_300_1.png"]], 2 ),                

 // 34 - один справа узкий на 1, слева на 3
        new Roadparts.OneRoadPart(
                [["25_r_300_3.png",     "24_r_300_2.png"],  
                 ["00_no_border.png", "76_r_1_to_l_3.png" ],
                ["20_r_60_1.png",     "21_r_60_2.png"]], 2 ),                

//35 - снизу ширина две полосы, сверху 3, расширение справа
        new Roadparts.OneRoadPart(
                [["07_l_vert.png", "00_no_border.png", "19_r_30_3.png"],  
                 ["07_l_vert.png", "17_r_30_1.png", "18_r_30_2.png"]], 2),                
            
//36 - сизу ширина две полосы, сверху 3, расширение слева
        new Roadparts.OneRoadPart(
                [["31_l_330_3.png", "00_no_border.png", "08_r_vert.png"],  
                 ["30_l_330_2.png", "29_l_330_1.png", "08_r_vert.png"]], 2),                

//37 - сверху ширина две полосы, снизу 3, расширение справа
        new Roadparts.OneRoadPart(
                [["07_l_vert.png", "26_r_330_1.png", "28_r_330_3.png"],  
                 ["07_l_vert.png", "00_no_border.png", "27_r_330_2.png"]], 2),                

//38 - сверху ширина две полосы, снизу 3, расширение слева
        new Roadparts.OneRoadPart(
                [["12_l_30_2.png", "13_l_30_3.png", "08_r_vert.png"],  
                 ["11_l_30_1.png", "00_no_border.png", "08_r_vert.png"]], 2),          
            
//39 - слева ширина две полосы, справа 3 - расширение внизу
        new Roadparts.OneRoadPart(
                [["09_t_hor.png", "09_t_hor.png"],  
                 ["34_l_300_3.png", "00_no_border.png"],
                 ["33_l_300_2.png", "32_l_300_1.png"]], 2),
    
//40 - слева ширина две полосы, справа 3 - расширение вверху
        new Roadparts.OneRoadPart(
                [["15_l_60_2.png", "16_l_60_3.png"],  
                 ["14_l_60_1.png", "00_no_border.png"],
                 ["10_b_hor.png", "10_b_hor.png"]], 2 ),
    
//41 - справа ширина две полосы, слева 3 - расширение внизу
        new Roadparts.OneRoadPart(
                [["09_t_hor.png", "09_t_hor.png"],  
                 ["00_no_border.png", "22_r_60_3.png"],
                 ["20_r_60_1.png", "21_r_60_2.png"]], 2),

//42 - справа ширина две полосы, слева 3 - расширение вверху
        new Roadparts.OneRoadPart(
                [["25_r_300_3.png", "24_r_300_2.png"],  
                 ["00_no_border.png", "23_r_300_1.png"],
                 ["10_b_hor.png", "10_b_hor.png"]], 2),
            
    
//43 - стартовая часть горизонтальная. Ширина участка 3
        new Roadparts.OneRoadPart(
                [["59_l_start.png", "61_hor_start.png", "60_r_start.png"]], 1),
    
//44 - стартовая часть вертикальная.  Ширина участка 3
        new Roadparts.OneRoadPart(
                [["62_t_start.png"], 
                 ["64_vert_start.png"], 
                 ["63_b_start.png"]], 1)    
    ];
}());