/* rc-landscape.js --- реализация дорог для игры гонки.
 * Автор: Матвеенко Е.А.
 * Дата: 22.01.2017  - 22.01.2017
 * Назначение: cоздание поверхности, на которой будет размещаться дорога
 * в игре гонки. На момент создания игры дорога будет строга фиксированной,
 * хотя имеется возможность задания случайным образом (если, конечно, вариант
 * прокатит. 
 */

"use strict";



(function() {
    window.Roads = {};

    
/*Один тайл участка дороги. Имеет следующие параметры:
 * name, имя тайла в виде: 00_xxx.png.
 * leftBorderTest - функция ограничения слева, на вход y координата в системе
 * тайла, возаращает сколько максимально допустимо слева.
 * rightBorderTest - функция ограничения справа, на вход y координата в системе
 * тайла, возаращает сколько максимально допустимо слева.
 * , topBorderTest - 
 * , bottomBorderTest 
 * функции ограничения слева справа. 
 * */    
    Roads.OneRoadTile = function (name, 
                            leftBorderTest, 
                            rightBorderTest, 
                            topBorderTest, 
                            bottomBorderTest){
        this.name = name;
        this.leftBorderTest = leftBorderTest;
        this.rightBorderTest = rightBorderTest;
        this.topBorderTest = topBorderTest;
        this.bottomBorderTest = bottomBorderTest;
        
    };                     
    
/*  Roads.RoadTiles - задан массив тайлов и функции сравнения границ дорог */    
    

    Roads.RoadTiles = function (){
        this.roadTiles = [
// 0 - участок дороги без ограничений            
            new Roads.OneRoadTile("00_no_border.png",
                function(){
                    return -Infinity;
                },
                function(){
                    return Infinity;
                },
                function(){
                    return -Infinity;
                },
                function(){
                    return Infinity;
                }
            ),
                
 //1 - участок ограниченный слева и справа
            new Roads.OneRoadTile("01_lr_vert.png",
                function(y){
                    return (20.0 / 128.0);
                },
                function(y){
                    return (1.0 - 20.0/128.0);
                },
                function(){
                    return -Infinity;
                },
                function(){
                    return Infinity;
                }
            ),
 
//2 - участок ограниченный сверху и снизу 
            new Roads.OneRoadTile("02_tb_hor.png",
                function(){
                    return -Infinity;
                },
                function(){
                    return Infinity;
                },
                function(x){
                    return (20.0 / 128.0);
                },
                function(x){
                    return (1.0 - 20.0/128.0);
                }
            ),

//3 - участок ограниченный слева и справа - серху небольшое расхождение
//пока его учитывать не будем - потом может быть учтем
            new Roads.OneRoadTile("03_lr_u3.png",
                function(y){
                    return (20.0 / 128.0);
                },
                function(y){
                    return (1.0 - 20.0/128.0);
                },
                function(){
                    return -Infinity;
                },
                function(){
                    return Infinity;
                },
            ),

//4 - участок ограниченный слева и справа - серху небольшое расхождение
            new Roads.OneRoadTile("03_lr_u3.png",
                function(y){
                    return (20.0 / 128.0);
                },
                function(y){
                    return (1.0 - 20.0/128.0);
                },
                function(){
                    return -Infinity;
                },
                function(){
                    return Infinity;
                },
            ),


            
        ];
        
    };
    
    
    
}());