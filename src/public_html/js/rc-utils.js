/* 

 * 
 */

"use strict";
(function() {
    window.RCUtils = {};
    var temp_twoLineSegments = function(ls1, ls2){
        
        var a11 = ls1[1] - ls1[3];
        var a12 = ls1[2] - ls1[0];
        var a21 = ls2[1] - ls1[3];
        var a22 = ls2[2] - ls2[0];
        var c1 = ls1[2]*ls1[1] - ls1[3]*ls1[0]; //x2*y1 - y2*x1
        var c2 = ls2[2]*ls2[1] - ls2[3]*ls2[0]; //x2*y1 - y2*x1

//Надо рещить систему уравнений
//      a11*x+a12*y=c1
//      a21*x+a22*y=c2

        var det = a11*a22-a12*a21;
        if (det < 0.000000000001)
        {
            return null;
        }    
//Найдем определитель            
        var x = (c1*a22-a12*c2)/det;
        var y = (a11*c2-c1*a21)/det;
        
        if(Math.abs(ls1[2]-ls1[0])>Math.abs(ls1[3]-ls1[1])){
            if((ls1[2] > ls1[0]&& (x < ls1[0] || x > ls1[2]))||
               (ls1[2] < ls1[0]&& (x < ls1[2] || x > ls1[0]))){
                 return null;   
            }
        }else{
            if((ls1[3] > ls1[1]&& (y < ls1[1] || y > ls1[3]))||
               (ls1[3] < ls1[1]&& (y < ls1[3] || y > ls1[1]))){
                 return null;   
            }
        }
 
        if(Math.abs(ls2[2]-ls2[0])>Math.abs(ls2[3]-ls2[1])){
            if((ls2[2] > ls2[0]&& (x < ls2[0] || x > ls2[2]))||
               (ls2[2] < ls2[0]&& (x < ls2[2] || x > ls2[0]))){
                 return null;   
            }
        }else{
            if((ls2[3] > ls2[1]&& (y < ls2[1] || y > ls2[3]))||
               (ls2[3] < ls2[1]&& (y < ls2[3] || y > ls2[1]))){
                 return null;   
            }
        }
        return [x, y];
        
    };

    window.RCUtils.getCoefOfLineSegment = function(x1, y1, x2, y2){
    var rez = {
            a: y1 - y2,
            b: x2 - x1,
            c: x2*y1 - y2*x1
    };
    return rez;
};



/*Функция temp_lineSegmentsAndArc - решение уравнения пересения
 * прямой ls и дуги окружности crc
 * ls - задается как коэффициенты a, b, c, где a*x+b*y=c
 *  crc задется параметрами xc,yc, r, где xc, yc - центр окружности, r - радиус.
 *  Возвращаемое значение массив: 
 *  [[x1,y1],[x2, y2]] - со значениями точек пересечений, или null - если пересечений нет
 * */

    window.RCUtils.resolveLineSegmentsAndCircle = function(ls, crc){
        
        var rez = [];
        if(Math.abs(ls.a)<=0.000001)
        {
            var xr2 = crc.r * crc.r - 
                    ((ls.c / ls.b) - crc.yc)*((ls.c / ls.b) - crc.yc);
            if (xr2 < 0){
                return null;
            }
            xr2 =  Math.sqrt(xr2);       
            rez.push([crc.xc - xr2, ls.c / ls.b]);
            rez.push([crc.xc + xr2, ls.c / ls.b]);
            return rez;
        }
        
        if(Math.abs(ls.b)<=0.000001){
            var yr2 = crc.r * crc.r - 
                   ((ls.c / ls.a) - crc.xc)*((ls.c / ls.a) - crc.xc);
            
            if (yr2 < 0){
                return null;
            }
            yr2 = Math.sqrt(yr2);   
            rez.push([crc.yc - yr2, ls.c / ls.a]);
            rez.push([crc.yc + yr2, ls.c / ls.a]);
            return rez;
        } 
        
        
        var c1 = ls.c/ls.b;
        var a1 = ls.a/ls.b;
        var c2 = c1 - crc.yc;
        
        
        var k2 = 1 + a1*a1 ; 
                
        var k1 = -2 * (crc.xc + a1 * c2);
        var k0 = crc.xc*crc.xc + c2*c2 - crc.r*crc.r;
        var d = k1*k1 - 4*k0*k2;
        var xr,yr;
        if(d < 0.0){
            return null;
        }
       
        d = Math.sqrt(d);
        
        xr = (-k1 - d) / (2*k2);
        yr = (ls.c - ls.a*xr) / ls.b;
        rez.push([xr, yr]);
        
        xr = (-k1 + d) / (2*k2);
        yr = (ls.c - ls.a*xr) / ls.b;
        rez.push([xr, yr]);    
        return rez;
    };

/*Промежуточная процедура опрделяет, пересекается ли отрезок с заданным 
 * квардратом размером 1x1 или внутри лежит, или не пересекается.
 *Возвращаемое значение: 
 * массив: [f, [x1 ,y1, s1], [x2, y2, s2]] 
 * f = true, если firstPos, лежит внутри квадрата 
 * то либо [x1, y1, s1] и [x2, y2, s2] - нет, если secondPos - тоже внутри,
 * либо есть значения [x1, y1, s1], где x1,y1 - координаты перересения
 * со стороной, s1 показывает сторону которую пересекли: левое - 1, верхняя - 2,
 * правая - 3, нижняя - 4.
 * 
 * f = false, если firstPos лежит вне квадрата.
 * если точка secondPos - лежит внутри квадрата, тогда 
 * заполняется только [x1,y1,s1].
 *  если secondPos лежит вне квадрата, но при этом есть пересечение, 
 *  следователь вектор должен проходить через две стороны,
 *  заполняютя также [x1,y1,s1], [x2, y2, s2], где s1 и s2 - номера сторон
 *  1 - левая, 2 - верхняя, 3 - правая, 4 - нижняя.
 *  
 *  Если firstPos и secondPos лежа вне квадрата, и пересечения нет, то 
 *  возвращается null.
 *  
 * 
 *  * */


    var temp_testFunctSquare = function(leftTopPosSquare, 
                                   firstPos,
                                   secondPos){
        var rez=[false];
        var i = 0;
        
        if( firstPos[0] >= leftTopPosSquare[0] && 
            firstPos[1] >= leftTopPosSquare[1] &&
            firstPos[0] <= leftTopPosSquare[0]+0.9999999 &&
            firstPos[1] <= leftTopPosSquare[1]+0.9999999){
          
            rez[0] = true;

//Проверим вторую точку
            if( secondPos[0] >= leftTopPosSquare[0] && 
                secondPos[1] >= leftTopPosSquare[1] &&
                secondPos[0] <= leftTopPosSquare[0]+0.9999999 &&
                secondPos[1] <= leftTopPosSquare[1]+0.9999999){
                return rez;
            }
//Проверим пересечение с левой стороной квадрата
            var ret_xy = temp_twoLineSegments([firstPos[0], firstPos[1],
                                               secondPos[0], secondPos[1]],
                                           
                                  [leftTopPosSquare[0],leftTopPosSquare[1],
                         leftTopPosSquare[0],leftTopPosSquare[1]+0.999999]);
            if (!!ret_xy){
                rez.push([ret_xy[0],ret_xy[1], 1]);
                return rez;
            }

//Проверим пересечение с верхней стороной квадрата
            ret_xy = temp_twoLineSegments([firstPos[0], firstPos[1],
                                               secondPos[0], secondPos[1]],
                                           
                                  [leftTopPosSquare[0],leftTopPosSquare[1],
                         leftTopPosSquare[0]+0.999999,leftTopPosSquare[1]]);
            if (!!ret_xy){
                rez.push([ret_xy[0],ret_xy[1], 2]);
                return rez;
            }

//Проверим пересечение с правой стороной квадрата
            ret_xy = temp_twoLineSegments([firstPos[0], firstPos[1],
                                 secondPos[0], secondPos[1]],
                [leftTopPosSquare[0]+0.999999,leftTopPosSquare[1],
                leftTopPosSquare[0]+0.999999,leftTopPosSquare[1]+0.999999]);
            if (!!ret_xy){
                rez.push([ret_xy[0],ret_xy[1], 3]);
                return rez;
            }
            
//Проверим пересечение с нижней стороной квадрата
            ret_xy = temp_twoLineSegments([firstPos[0], firstPos[1],
                                 secondPos[0], secondPos[1]],
                [leftTopPosSquare[0],leftTopPosSquare[1]+0.999999,
                leftTopPosSquare[0]+0.999999,leftTopPosSquare[1]+0.999999]);
            if (!!ret_xy){
                rez.push([ret_xy[0],ret_xy[1], 4]);
                return rez;
            }
            return rez;
        }    

        
//Проверим пересечение с левой стороной квадрата
        var ret_xy = temp_twoLineSegments([firstPos[0], firstPos[1],
                                               secondPos[0], secondPos[1]],
                                           
                                  [leftTopPosSquare[0],leftTopPosSquare[1],
                         leftTopPosSquare[0],leftTopPosSquare[1]+0.999999]);
        if (!!ret_xy){
            rez.push([ret_xy[0],ret_xy[1], 1]);
            i++;
        }                  
        
            
//Проверим пересечение с верхней стороной квадрата
        ret_xy = temp_twoLineSegments([firstPos[0], firstPos[1],
                                               secondPos[0], secondPos[1]],
                                           
                                  [leftTopPosSquare[0],leftTopPosSquare[1],
                         leftTopPosSquare[0]+0.999999,leftTopPosSquare[1]]);
        if (!!ret_xy){
                rez.push([ret_xy[0],ret_xy[1], 2]);
                i++;
        }

//Проверим пересечение с правой стороной квадрата
        if(i < 2){
            ret_xy = temp_twoLineSegments([firstPos[0], firstPos[1],
                                 secondPos[0], secondPos[1]],
                [leftTopPosSquare[0]+0.999999,leftTopPosSquare[1],
                leftTopPosSquare[0]+0.999999,leftTopPosSquare[1]+0.999999]);
            if (!!ret_xy){
                rez.push([ret_xy[0],ret_xy[1], 3]);
                i++;
            }
        }
        
//Проверим пересечение с нижней стороной квадрата
        if(i < 2){
            ret_xy = temp_twoLineSegments([firstPos[0], firstPos[1],
                                 secondPos[0], secondPos[1]],
                [leftTopPosSquare[0],leftTopPosSquare[1]+0.999999,
                leftTopPosSquare[0]+0.999999,leftTopPosSquare[1]+0.999999]);
            if (!!ret_xy){
                rez.push([ret_xy[0],ret_xy[1], 4]);
                i++;
            }
        }    
        
        if(i === 0)return null; 
        
//Осталось определить первую и вторую точки пересения и в случае чего поменять 
//их местами
        if(i === 2){
            var r1, r2;
            r1 = (rez[1][0] - firstPos[0])*(rez[1][0] - firstPos[0])+
                 (rez[1][1] - firstPos[1])*(rez[1][1] - firstPos[1]);
         
            r2 = (rez[2][0] - firstPos[0])*(rez[2][0] - firstPos[0])+
                 (rez[2][1] - firstPos[1])*(rez[2][1] - firstPos[1]);
            
            if(r2 < r1)
            {
                var tmp;
                tmp = rez[1][0];
                rez[1][0] = rez[2][0];
                rez[2][0] = tmp;
                
                tmp = rez[1][1];
                rez[1][1] = rez[2][1];
                rez[2][1] = tmp;

                tmp = rez[1][2];
                rez[1][2] = rez[2][2];
                rez[2][2] = tmp;

            }    
        }
            
        return rez;
    };



/*Функция  определения точек пересечения. Отрезка с выпуклым четырехугольником
 * В данном случе, будут либо трапеции с двумя прямыми углами, либо прямоуголник
 *Используется для определения ситуаций когда пересекается отрезок с областями
 *тайла, которые не должны отображаться и которые выделены бордюром бордюром.
 *
 *
 *  */
var temp_lineSegmentAndQuadrilateral = function (ql, 
                                                firstPos,
                                                secondPos){
                                                    

};




/*
 * Функция тестироания перемещения обекта на предмет пересечения с границей
 * каждого тайла. В качестве параметра передаеются:
 * tileName - имя тайла, влияет на то как будет расчитываться;
 * tilePos - координаты левого верхнего угла тайла в виде массива [x,y] - 
 * это значения целые
 * firstPos -- начальная позиция положения точки в виде массива [x,y];
 * secondPos --- конечная позиция положения точки;
 *  Возвращает значение: 
 *  в виде массив:
 *  [x,y, c, s], где [x,y] --- это координаты конечной точки,
 *  c === 0, всё конечная точка, тачка должна остановиться.
 *  c === 1, машина может двигаться, но конечная точка находится в данном тайле
 *  с === 2, машина может двигаться, и конечная точка выходит за пределы тайла,
 *  в дальнейшем надо будет другой тайл рассматривать
 *  s - указывает границу: 1 - граница слева, 2 - граница вверху, 3 - граница
 *  справа, 4 - граница внизу.
 *  если пересечение в принципе не возможно возвращается значение null
 *  */

    window.RCUtils.testForBorder = function(tileName, 
                                                tilePos, 
                                                firstPos,
                                                secondPos){
    
        var tileNum = tileName.subString(0,2).toNumber();                                         
        
        var rez = temp_testFunctSquare(tilePos, firstPos, secondPos);
        
//Будем рассматривать случай с каждым тайлом
        switch(tileNum){
            
            case 0: 
            case 64:   //Это тайл, который ничем не ограничен
                if(rez[0] && rez.length > 1 &&
                   rez.length > 2){
                    return [secondPos[0], secondPos[1], 
                             2, rez[rez.length-1][2]];
                }

//Точка внутри тайла осталось, можно переходить к следующей итерации
                return [secondPos[0], secondPos[1], 
                             1, rez[rez.length-1][2]];
       
            break;    
        
            case 1:  //Границы слева и справа.
            case 3:    //
            case 4:    //
                            //ширина границы составляет 20/128.0 от 1 
                            //  (размера тайла)     
                if(rez[0]) //Изнутри
                {
                    if(rez.length === 1){
//проверим, куда попадает вторая точка.
                        if (secondPos[0]<tilePos[0]+20.0/128.0){
                            
                        }    
                    }
                }    
                
            break;
            
        };
        
        
        
        
        
    };



}());


var crcTest = {xc: 10,
            yc: 20,
            r: 2};


var lsTest = RCUtils.getCoefOfLineSegment(9, 20, 30, 30);

console.log(lsTest);


var rezTest = RCUtils.resolveLineSegmentsAndCircle(lsTest, crcTest);

console.log(rezTest);


var testRezTest = (rezTest[0][0] - crcTest.xc)*(rezTest[0][0] - crcTest.xc)+
                  (rezTest[0][1] - crcTest.yc)*(rezTest[0][1] - crcTest.yc);

testRezTest = Math.sqrt(testRezTest);
console.log(testRezTest);