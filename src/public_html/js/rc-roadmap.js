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
    
    
    
    
}());