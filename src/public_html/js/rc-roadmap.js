/* rc-roadmap.js
 * Автор: Матвеенко Е.А.
 * Дата: 25.12.2017. 
 * Модуль для формирования карты дорог Roadmap.Map. Фрагменты дорог по тайлам 
 * (спрайтам) определены в модуле Roadparts (файл rc-roadparts.js), переменная 
 * Roadparts.roadParts - массив описания фрагментов дорог, в котором описаны
 * все тайлы спрайты.  
 * На основании этих фрагментах дороги формируется трасса 
 * 
 * 
 * 
 * 
 */


"use strict";



(function(){
    
    window.Roadmap = {};
    
    
    Roadmap.Map = function(roadMap){

//Скопируем ссылку
        this.roadMap = roadMap;
      
        this.x_size = this.roadMap.map.xsize;
        this.y_size = this.roadMap.map.ysize;
        

//Диапазоны координат для предудущем
        this.oldIntervals = {x1: -1,
                             x2: -1,
                             y1: -1,
                             y2: -1};
        
        
//Создадим массив        
        this.tiles = new Array(roadMap.map.xsize);
        for (var i = 0; i < this.tiles.length; i++){
            this.tiles[i] = new Array(roadMap.map.ysize);
        }
        
//Заполним его в соответствии с данными и массивом
        for (var k = 0; k < this.roadMap.map.roadparts.length; k++){
            var i_p = this.roadMap.map.roadparts[k].i;
            var x_p = this.roadMap.map.roadparts[k].x;
            var y_p = this.roadMap.map.roadparts[k].y;
            
            for(var j = 0; j < Roadparts.roadParts[i_p].tileNames.length; j++){
                for( var i = 0; i < 
                        Roadparts.roadParts[i_p].tileNames[j].length; i++){
                    if(!this.tiles[x_p+i][y_p+j]){    
                        this.tiles[x_p+i][y_p+j] = {}; 
                        this.tiles[x_p+i][y_p+j].tileName =
                            Roadparts.roadParts[i_p].tileNames[j][i];
                        this.tiles[x_p+i][y_p+j].roadpartIndex = i_p;    
                        this.tiles[x_p+i][y_p+j].sprite = null;
                    }else{
                        alert("Есть наложения в " + k.toString() +
                                " под номером " + i_p.toString());
                    }    
                }
            }
            
        }

        
    };
    
/*Отображение данных*/    
    Roadmap.Map.prototype.setViewingTiles = function( container,
                                                xc, yc, rt ){
        //Определим размеры стороны контейнера.
        var areaWidth, areaHeight;
        areaWidth = window.renderer.width;
        areaHeight = window.renderer.height;
     //   container.x = areaWidth/2;
     //   container.y = areaHeight/2;
        var contSize = Math.max(areaWidth, areaHeight)*1.5;
        var spriteWidth = 128,  spriteHeight = 128;
        
        var cos_rt = Math.cos(rt), sin_rt = Math.sin(rt);

        var x1 = Math.floor(
            (-contSize/2)/spriteWidth+xc);
        if(x1 < 0) x1 = 0;
        var x2 = Math.ceil(
            contSize/2/spriteWidth+xc);
        if(x2 >= this.x_size) x2 = this.x_size - 1;
        var y1 = Math.floor(
            (-contSize/2)/spriteHeight+yc);
        if(y1 < 0) y1 = 0;
        var y2 = Math.ceil(
            contSize/2/spriteHeight+yc);
        if(y2 >= this.y_size) y2 = this.y_size - 1;
      
//Промежуточные процедуры для хранения временных значений
        var newCoord, prevCoord, prevCoordByY;  
        
      
//Удалим те тайлы, которые не надо отображать
        if( this.oldIntervals.x1 >= 0 && this.oldIntervals.x2 >= 0 &&
            this.oldIntervals.y1 >= 0 && this.oldIntervals.y2 >= 0){    
            
            for(var i = this.oldIntervals.x1; i <= this.oldIntervals.x2; i++){
                for(var j = this.oldIntervals.y1; j<=this.oldIntervals.y2; j++){
                    if(i < x1 || i > x2 || j < y1 || j > y2){
                        if(!!this.tiles[i][j]){
                            if(!!this.tiles[i][j].sprite){
                            
                                this.tiles[i][j].sprite.destroy();
                                this.tiles[i][j].sprite = null;
                            }                                   
                        }
                    }
                }
            }
        }
        
        this.oldIntervals.x1 = x1; 
        this.oldIntervals.x2 = x2; 
        this.oldIntervals.y1 = y1; 
        this.oldIntervals.y2 = y2; 

        
//Расчитаем координаты самого первого спрайта x1, y1, который размещен сверху 
//слева
        var x_n=(x1-xc)*cos_rt-(y1-yc)*sin_rt;
        var y_n=(x1-xc)*sin_rt+(y1-yc)*cos_rt;
        newCoord = [Math.round(areaWidth/2+spriteWidth*x_n),
                    Math.round(areaHeight/2+spriteWidth*y_n)];
        if( !!this.tiles[x1][y1]){
            if (!this.tiles[x1][y1].sprite && !!this.tiles[x1][y1].tileName ){
                this.tiles[x1][y1].sprite = 
                      new  window.PIXI.Sprite.fromFrame (
                         this.tiles[x1][y1].tileName
                      );
                container.addChild(this.tiles[x1][y1].sprite);    
            }
            
            if(!!this.tiles[x1][y1].sprite){
                this.tiles[x1][y1].sprite.x = newCoord[0] ;    
                this.tiles[x1][y1].sprite.y = newCoord[1];     
                this.tiles[x1][y1].sprite.scale.x = 1.00 + 2.0/128.0;
                this.tiles[x1][y1].sprite.scale.y = 1.00 + 2.0/128.0;
                this.tiles[x1][y1].sprite.rotation = rt;
            }
        }            
        
        prevCoord = newCoord;   //Скопируем координату, чтобы шагать по X
        
        prevCoordByY = newCoord;   //Сохраним последние значения координат по Y
        
//Заполним самую первую строку для спрайтов (точнее тайлов).        
        for(var i = x1 + 1; i <= x2; i++){
            newCoord = 
                    [ Math.round(prevCoord[0]+spriteWidth*cos_rt),
                      Math.round(prevCoord[1]+spriteWidth*sin_rt)];
            if(i>99){
                var debug_i = 1;
            }      
                  
            if(!!this.tiles[i][y1]){ 
                
                if(!this.tiles[i][y1].sprite && !!this.tiles[i][y1].tileName){
                    this.tiles[i][y1].sprite = 
                       new window.PIXI.Sprite.fromFrame (
                            this.tiles[i][y1].tileName
                        );
                    container.addChild(this.tiles[i][y1].sprite);    
                }
                if(!!(this.tiles[i][y1].sprite)){
                    this.tiles[i][y1].sprite.x = newCoord[0];            
                    this.tiles[i][y1].sprite.y = newCoord[1];
                    this.tiles[i][y1].sprite.scale.x = 1.00 + 2.0/128.0;
                    this.tiles[i][y1].sprite.scale.y = 1.00 + 2.0/128.0;            
                    this.tiles[i][y1].sprite.rotation = rt;
                }
            }
            prevCoord = newCoord;
        }
        
//Добавим точки самого левого столбца тайлов с x=x1        
        for(var j = y1 + 1; j <= y2; j++){
            newCoord =  [Math.round(prevCoordByY[0]-spriteWidth*sin_rt),
                         Math.round(prevCoordByY[1]+spriteWidth*cos_rt)]; 
            if(!!this.tiles[x1][j]){
                if(!this.tiles[x1][j].sprite && !!this.tiles[x1][j].tileName){
                    this.tiles[x1][j].sprite = 
                       new window.PIXI.Sprite.fromFrame (
                            this.tiles[x1][j].tileName);
                    container.addChild(this.tiles[x1][j].sprite);    
                }
                
                if(!!this.tiles[x1][j].sprite){
                    this.tiles[x1][j].sprite.x = newCoord[0];            
                    this.tiles[x1][j].sprite.y = newCoord[1];
                    this.tiles[x1][j].sprite.scale.x = 1.00 + 2.0/128.0;
                    this.tiles[x1][j].sprite.scale.y = 1.00 + 2.0/128.0;                            
                    this.tiles[x1][j].sprite.rotation = rt;
                }
                
            }
            prevCoord = newCoord;
            
            prevCoordByY = prevCoord;
            
//Теперь заполняем остальные данные об остальных спрайтов строки j            
            for(var i = x1 + 1; i <= x2; i++){
                
                newCoord = 
                    [ Math.round(prevCoord[0]+spriteWidth*cos_rt),
                      Math.round(prevCoord[1]+spriteWidth*sin_rt)];
                
                if(!! this.tiles[i][j]){
                    if (!this.tiles[i][j].sprite && 
                            !!this.tiles[i][j].tileName){
                        this.tiles[i][j].sprite = 
                       new window.PIXI.Sprite.fromFrame (
                            this.tiles[i][j].tileName);
                        container.addChild(this.tiles[i][j].sprite);    
                    }
                    
                    if(!!this.tiles[i][j].sprite){
                        this.tiles[i][j].sprite.x = prevCoord[0];            
                        this.tiles[i][j].sprite.y = prevCoord[1];
//Увеличение спрайта на два пикселя по каждой стороне                        
                        this.tiles[i][j].sprite.scale.x = 1.00 + 2.0/128.0;
                        this.tiles[i][j].sprite.scale.y = 1.00 + 2.0/128.0;                            
                        this.tiles[i][j].sprite.rotation = rt;
                    }
                    
                
                }
                prevCoord = newCoord;
                
           }
        }    

    };
    
/*Возможности получения следующей   координаты для следующей точки  при 
*поступательном движении точки.  
*Параметры:
*p1 - координаты первой точки в формате [<x>, <y>].
*p2 - координаты второй точки в формате [<x>, <y>].
*Возврашает: null, если не найдена точка или участок p1 - на на участке дороги
*массив [<x>, <y>, <moved>], где <x>, <y> -- это кооординыт, а - moved - 
*это значение true --- если точка не встретила препятствий или false - если
*на пути отрезка встретилось препятствие*/
    Roadmap.Map.prototype.nextPixel = function(p1, p2   ){
        var rez = [p2[0],p2[1], true];
        var i,j;
//Проверим, чтобы проверяемый участок был в нашей области
        if(p1[0]<0 || p1[0]>= this.x_size||
           p1[1]<0 || p1[1]>= this.y_size){
            return null;
        }
 //Получим значения индексов, тайлов, где расположена данная точка       
        i = Math.floor(p1[0]);
        j = Math.floor(p1[1]);
        
//Проверим попадает ли машина вообще на трассу
        if(!this.tiles[i][j]){
            return null;
        }
            
        var x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1];        
        
        while(true)
        {   
            var nextTile;
    //Определим с  какими пересечениями может столкнуться данная точка
   //в указанном тайле. Описание тайла Найдем его по имени
            var tileDescr = this.roadMap.tiles[this.tiles[i][j].tileName];
        
            if(!!tileDescr && !!tileDescr.borders){
                for(var n = 0; n < tileDescr.borders.length; n++){
//ограничитель отрезок внутри тайла                
                    if(tileDescr['type'] === 'line'){
//Проверим данный отрезок (этот путь последнего перемещения на эказанный отрезок)
                        var rez = 
                        RCUtils.resolveLineSegmentAndLineSegment([i,j], 
                                     [x1, y1, x2, y2], 
                            [i+tileDescr['x1'], j+tileDescr['y1'], 
                             i+tileDescr['x2'], j+tileDescr['y2']]);
                    
                        return [rez[0], rez[1], false];
                    }
                
//Проверем если рассамтривается дуга или полуокружность
                    if(tileDescr['type'] === 'arc'){
//Проверим данный отрезок (этот путь последнего перемещения на эказанный отрезок)
                        var rez = 
                            RCUtils.resolveLineSegmentAndArc([i,j], 
                         [i+tileDescr['xc'], j+tileDescr['yc'], tileDescr['r']],
                              [x1, y1, x2, y2] 
                             );                    
                        return [rez[0], rez[1], false];
                    }    
                }
            }
        
//Изменим i и j и выберем куда идти
//Проверим вторую точку  - вдруг она находится тайле.
            if(i === Math.floor(x2) &&  j === Math.floor(y2)){
//Если она в текущем тайле, тогда выйдем из цикла                
                break;
            }

//Перейдем на следующий тайл и следующую точку.            
            nextTile = RCUtils.resolveLineSegmentAnd1x1Square([i,j], 
                                                [x1, y1, x2, y2]);
            
//Если есть точка, то надо перейти на следующий тайл и продолжить поиск            
            if(!nextTile){
                
//По какой-то причине не был получен результат                
//Вернем тогда текущий (x,y) и скажем нечего дальше двигатьсяю
                return [x1,y1, false];
                
            }

//Тут мы перешли на следующий соседний тайл. Надо проверить, а находится ли он 
//на трассе. Это может произойти, если неправильно сконфигурирована трасса, так 
//как, по идее,  дорога ограничена границей (бортиком)
            if((nextTile[2] <  0 || nextTile[3] < 0 ||
               nextTile[2] >= this.x_size || nextTile[3] >= this.y_size)||
               (!this.tiles[nextTile[2]][nextTile[3]])
               ){
//Тогда надо остановиться в этом тайле и дальше не двигаться
                return [nextTile[4], nextTile[5, false]];
            }
            
                
                
                
        };        
                
        return [x2, y2, true];
                        
    };

/*Проверка возможности поворота точки p вокруг точки pc,
 * на a радиан. 
 * Так как значение angle не большое значение будем считать, что
 * p - движется по отрезку, не по дуге.
 * Возврашает: 
 * [a, true] --- если точка может беспрепятственно повернуться
 * [<max_angle>, false] --- максимальное значение угла на которы он может 
 * повернуться
 *   */
    Roadmap.Map.prototype.rotatePixel = function(p, pc, a   ){
  
 //Найдем координаты новой точки        
        var new_p = [
      pc[0] + (p[0] - pc[0]) * Math.cos(a) - (p[1] - pc[1]) * Math.sin(a),
      pc[1] + (p[1] - pc[1]) * Math.cos(a) + (p[0] - pc[0]) * Math.sin(a)];
  
 //Проверим а будет ли припятствие у точки
        var rez = this.nextPixel(p, new_p);
        
//Проверим, было ли препятствие
        if(rez[2]){
//Препятствия не было            
            return [a, true];
        }
        
//Препятствие было. Насколько может повернуться точка
        var angle1 = Math.atan2(p[1] - pc[1], p[0] - pc[0]);
        
        var angle2 = Math.atan2(new_p[1] - pc[1], new_p[0] - pc[0]);
        
        var new_a = angle2 - angle1;

//Проверки перехода через нулевой угол        
        if (new_a >= Math.PI){
            new_a -= 2*Math.PI;
        }
        
        if(new_a <=  -Math.PI){
            new_a += 2*Math.PI;
        }
        return [new_a, false];
    };

}());

