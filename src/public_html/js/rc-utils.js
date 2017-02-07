/* 

 * 
 */

"use strict";
(function() {
    window.RCUtils = {};
    RCUtils.twoLineSegments = function(ls1, ls2){
        
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

    RCUtils.getCoefOfLineSegment = function(x1, y1, x2, y2){
        var rez = {
            a: y1 - y2,
            b: x2 - x1,
            c: x2*y1 - y2*x1
        };
        return rez;
    };

/*RCUtils.testForPointInLineSegment 
 * Проверка попадания пикселя в отрезок
 * Входные параметры: 
 *   pnt - рассматриваемая точка в виде массива [x,y]
 *   ls - отрезок в виде массива [x1,y1,x2,y2] - где x1,y1 --- первая точка,
 * x2,y2 ---- вторая точка отрезка.
 * Возврашаемое значение:
 *  true, если точка лежит внутри отрезка,
 *  false, если точка не лежит на отрезки, или лежит на прямой отрезка,
 * но за пределам.
 * */
    
    RCUtils.testForPointInLineSegment = function(pnt, ls){
        if(Math.abs(ls[2] - ls[0]) > Math.abs(ls[3] - ls[1])){
            if(ls[2] > ls[0]){
                if(pnt[0] < ls[0] || pnt[0] > ls[2]){
                    return false;
                }
            }else{
                if(pnt[0] < ls[2] || pnt[0] > ls[0]){
                    return false;
                }               
            }
            var tmp = (pnt[0]-ls[0]) * (ls[3]-ls[1]) / (ls[2]-ls[0]) + ls[1];
            if(Math.abs(tmp-pnt[1]) < 0.00001)return true;
            
        }else{
            if(ls[3] > ls[1]){
                if(pnt[1] < ls[1] || pnt[1] > ls[3]){
                    return false;
                }
            }else{
                if(pnt[1] < ls[3] || pnt[1] > ls[1]){
                    return false;
                }               
            }
            var tmp = (pnt[1]-ls[1]) * (ls[2]-ls[0]) / (ls[3]-ls[1]) + ls[0];
            if(Math.abs(tmp-pnt[0]) < 0.00001)return true;
        }
        return false;
        
    };


/*Функция resolveLineCoefAndCircle - решение уравнения пересения
 * прямой ls и  окружности crc
 * ls - задается как коэффициенты a, b, c, где a*x+b*y=c
 *  crc задется параметрами xc,yc, r, где xc, yc - центр окружности, r - радиус.
 *  Возвращаемое значение массив: 
 *  [[x1,y1],[x2, y2]] - со значениями точек пересечений, или null, 
 *  если пересечений с окружностью нет
 * */

    RCUtils.resolveLineCoefAndCircle = function(ls, crc){
        
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

/*Функция resolveLineSegmentAndArc - поиск точки пересечения сегмента окружности
 * и отрезка.
 * Входные параметры: 
 *    tileNum - массив из двух индексов [i, j], где определяется интересующий нас
 * плитка (спрайт). Нас интересует пространство в квдрате [i, j] - [i+1,j+1];
 *    arc - массив [x, y, r] - где x,y --- центр окружности, r - радиус в мере
 * одного тайла ландшафта или дороги.
 *    ls --- массив [x1,y1,x2,y2] - где (x1,y1) - координаты первой точки,
 * (x2,y2) --- координаты второй точки.
 *   
 *   Возращаеся:
 *   - массив [xrez, yrez] - где точка (xrez, yrez) принадлежит отрезку ls и
 * точка лежит в квадрате [i, j] - [i+1, j+1];
 *   - null --- если такая точка не может быть найдена
 *   
 * */

    RCUtils.resolveLineSegmentAndArc = function(tileNum, arc, ls){
//Приведем ls к форме уравнений и коэффициентов
        var lineCoef = RCUtils.getCoefOfLineSegment(ls[0],ls[1],ls[2],ls[3]);
        var crc = {xc: arc[0], yc: arc[1], r: arc[2]};
        
//Найдем пересечение прямой и окружности.
        var rez = RCUtils.resolveLineCoefAndCircle(lineCoef, crc);
        
 //Проверим результаты: возможно, нулевое значение, что значит пересечения 
 //не было
        if(!rez){
            return null;
        }
        
//Проверка попадания точки в tileNum.
        if(rez[0][0] >= tileNum[0] && rez[0][0] <= tileNum[0]+1.0 &&
           rez[0][1] >= tileNum[1] && rez[0][1] <= tileNum[1]+1.0){

//Проверка попадания точки в отрезок ls
            if(RCUtils.testForPointInLineSegment(rez[0], ls)){
                return [rez[0][0], rez[0][1]];
            }
        }
        
        if(rez.length > 1){
//Проверим вторую точку
            if(rez[1][0] >= tileNum[0] && rez[1][0] <= tileNum[0]+1.0 &&
               rez[1][1] >= tileNum[1] && rez[1][1] <= tileNum[1]+1.0){

//Проверка попадания точки в отрезок ls
                if(RCUtils.testForPointInLineSegment(rez[1], ls)){
                    return [rez[1][0], rez[1][1]];
                }
            }
        }
        return null;
    };
    
    
/*Функция resolveLineSegmentAndLineSegment - поиск точки пересечения отрезка
 * и второго отрезка.
 * Входные параметры: 
 *    tileNum - массив из двух индексов [i, j], где определяется интересующий нас
 * плитка (спрайт). Нас интересует пространство в квдрате [i, j] - [i+1,j+1];
 *    
 *    ls1 --- массив [x1,y1,x2,y2] - где (x1,y1) - координаты первой точки,
 * (x2,y2) --- координаты второй точки для первого отрезка.
 *    
 *    ls2 --- массив [x1,y1,x2,y2] - где (x1,y1) - координаты первой точки,
 * (x2,y2) --- координаты второй точки для первого отрезка.
 *       
 *   Возращаеся:
 *   - массив [xrez, yrez] - где точка (xrez, yrez) принадлежит отрезкам 
 *   ls1 и ls2 и лежит в квадрате [i, j] - [i+1, j+1];
 *   - null --- если такая точка не может быть найдена
 *   
 * */

    RCUtils.resolveLineSegmentAndLineSegment = function(tileNum, ls1, ls2){
        var rez = RCUtils.twoLineSegments(ls1, ls2);
        if(!rez){
            return null;
        }
        
        if(rez[0] >= tileNum[0] && rez[0] <= tileNum[0]+1.0 &&
           rez[1] >= tileNum[1] && rez[1] <= tileNum[1]+1.0){
            return rez;
        }
        return null;
    };

  
/*Функция resolveLineSegmentAnd1x1Square - поиск точки пересечения отрезка
 * и квадрата с координатами. i, j, i+1, j+1
 * Входные параметры: 
 *    tileNum - массив из двух индексов [i, j], где определяется интересующий нас
 * плитка (спрайт). Нас интересует пространство в квадрате 
 * [i, j] -  [i+1,j+1];
 *    
 *    ls1 --- массив [x1,y1,x2,y2] - где (x1,y1) - координаты первой точки, 
 *    которая должна располагаться внутри квадрата
 * (x2,y2) --- координаты второй точки  отрезка. 
 *    
 *       
 *   Возращаеся:
 *  - массив [xr, yr, newI, newJ] - xr, yr координаты пересечения отрезка с
 *  квадратом, причем с небольшим смещением в сторону соседнего квардата. 
 *   - null --- если нет соответствия условиям функции.
 *   
 * */
RCUtils.resolveLineSegmentAnd1x1Square = function(tileNum, ls){
        
        var rez;
//Первая точка отрезка должна быть внутри тайла        
        if(ls[0] < tileNum[0] || ls[0] >= tileNum[0]+1.0 ||
           ls[1] < tileNum[1] || ls[1] >= tileNum[1]+1.0){
            return null;
        }

//вторая точка отрезка должна быть вне тайла            
        if(ls[2] >= tileNum[0] && ls[2] < tileNum[0]+1.0 &&
           ls[3] >= tileNum[1] && ls[3] < tileNum[1]+1.0){
            return null;
        }
    
//Проверяем каждую сторону квадрата
//Проверим левую сторону квадрата
        rez = RCUtils.twoLineSegments(ls, 
            [tileNum[0], tileNum[1], tileNum[0], tileNum[1]+1.0]);
            
        if(!!rez){
//Точка пересечения  левой и верхних сторон. Очень маловероятно, но исключать
//нелься, что отрезок пройдет строго через точку пересечения
            if(Math.abs(rez[0] - tileNum[0]) < 0.000001 &&
               Math.abs(rez[1] - tileNum[1]) < 0.000001 ){
                return [tileNum[0]-0.000001, tileNum[1]-0.000001, 
                         tileNum[0]-1, tileNum[1]-1];
            }

//Точка пересечения  левой и нижней сторон. Очень маловероятно, но исключать
//нелься, что отрезок пройдет строго через точку пересечения        
            if(Math.abs(rez[0] - tileNum[0]) < 0.000001 &&
               Math.abs(rez[1] - tileNum[1]-1.0) < 0.000001 ){
                return [tileNum[0]-0.000001, tileNum[1]+1.000001, 
                        tileNum[0]-1, tileNum[1]+1];
            }
            
            return [tileNum[0]-0.000001, rez[1], tileNum[0]-1, tileNum[1]];
        }
        
        
//Проверим верхнюю сторону квадрата
        rez = RCUtils.twoLineSegments(ls, 
            [tileNum[0], tileNum[1], tileNum[0]+1.0, tileNum[1]]);
            
        if(!!rez){
//Проверим, а вдруг прощло возле вершины верхней и левой стороно. 
//Очень маловероятно, но исключать
//нелься, что отрезок пройдет строго по диагнонали
            if(Math.abs(rez[0] - tileNum[0]) < 0.000001 &&
               Math.abs(rez[1] - tileNum[1]) < 0.000001 ){
                return [tileNum[0]-0.000001, tileNum[0]-0.000001, 
                         tileNum[0]-1, tileNum[1]-1];
            }
//Проверим на предмет близкого пересечения правой и верхних сторон                                
            if(Math.abs(rez[0] - tileNum[0]-1.0) < 0.000001 &&
               Math.abs(rez[1] - tileNum[1]) < 0.000001 ){
                return [tileNum[0] + 1.000001, tileNum[1] - 0.000001, 
                         tileNum[0]+1, tileNum[1]-1];
            }
            
            return [rez[0], tileNum[1]-0.000001, tileNum[0], tileNum[1]-1];
        }

//Проверим правую сторону квадрата
        rez = RCUtils.twoLineSegments(ls, 
            [tileNum[0]+1.0, tileNum[1], tileNum[0]+1.0, tileNum[1]+1.0]);

        if(!!rez){
//Точка пересечения правой и верхней  сторон. Очень маловероятно, но исключать
//нелься, что отрезок пройдет строго по диагнонали
            if(Math.abs(rez[0] - tileNum[0]-1.0) < 0.000001 &&
               Math.abs(rez[1] - tileNum[1]) < 0.000001 ){
                return [tileNum[0]+1.000001, tileNum[1]-0.000001, 
                         tileNum[0]+1, tileNum[1]-1];
            }
//Точка пересечения правой и нижней  сторон. Очень маловероятно, но исключать
//нелься, что отрезок пройдет строго по диагнонали
            if(Math.abs(rez[0] - tileNum[0]-1.0) < 0.000001 &&
               Math.abs(rez[1] - tileNum[1]-1.0) < 0.000001 ){
                return [tileNum[0]+1.000001,tileNum[1]+1.000001, 
                        tileNum[0]+1 , tileNum[1]+1];
            }
            
            return [tileNum[0]+1.000001, rez[1], tileNum[0]+1, tileNum[1]];
        }

//Проверим нижнюю сторону квадрата
        rez = RCUtils.twoLineSegments(ls, 
            [tileNum[0], tileNum[1]+1.0, tileNum[0]+1.0, tileNum[1]+1.0]);

        if(!!rez){
//Точка пересечения левой и нижней  сторон. Очень маловероятно, но исключать
//нелься, что отрезок пройдет строго по диагнонали
            if(Math.abs(rez[0] - tileNum[0]) < 0.000001 &&
               Math.abs(rez[1] - tileNum[1]-1.0) < 0.000001 ){
                return [tileNum[0]-0.000001, tileNum[1]+1.000001, 
                         tileNum[0]-1, tileNum[1]+1];
            }
            
//Точка пересечения правой и нижней  сторон. Очень маловероятно, но исключать
//нелься, что отрезок пройдет строго по диагнонали
            if(Math.abs(rez[0] - tileNum[0]-1.0) < 0.000001 &&
               Math.abs(rez[1] - tileNum[1]-1.0) < 0.000001 ){
                return [tileNum[0]+1.000001,tileNum[1]+1.000001, 
                        tileNum[0]+1, tileNum[1]+1];
            }
            
            return [rez[0], tileNum[1]+1.000001, tileNum[0], tileNum[1] + 1];
        }
    

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







}());

