/* rc-landscape.js --- реализация ландшафта для игры гонки.
 * Автор: Матвеенко Е.А.
 * Дата: 20.01.2017  - 25.01.2017
 * Назначение: cоздание поверхности, не занятой дорогой (трассой) 
 * в игре гонки. Ландшафт образуется псевдослучайным образом из 
 * тайлов land_grassXX.png и lang_dirtXX.png, где XX - числа от 01 до 14, 
 * таким образом тайлов - 28 шт.  Ландшафт  представляет из себя - самый нижний
 * слой, образуется как мозайка из тайлов, определенных в атласе. Размер области 
 * дорог задается параметрами: ориаентирочно 100 на 100 тайлов. 
 * 
 * 
 */

"use strict";



(function  (){
    
    window.Landscape = {};  


    Landscape.OneTileLink = function (name, left, right, top, bottom)
    {         
        this.name = name;   //имя с расширением png
        this.leftNeighbourIndexes = left;
        this.rightNeighbourIndexes =  right;
        this.topNeighbourIndexes =  top;
        this.bottomNeighbourIndexes =  bottom;
    };
            

/*Массив всех тайлов для оргазации ландшафта*/    
    
    Landscape.TilesLinks = function ()
    {
        
        
        this.sprites = [
        //0    
          new  Landscape.OneTileLink("land_grass01.png", 
         [1,2,3,6,10],      [1, 8, 9], 
         [3, 5, 6, 10, 12], [4, 5, 9] ), 
        
       //1 
          new  Landscape.OneTileLink("land_grass02.png", 
         [0, 7, 8 ],            [0, 3, 4, 5, 10], 
         [3, 5, 6, 10, 12],     [2, 6, 7] ),  
        
       //2 
          new  Landscape.OneTileLink("land_grass03.png", 
         [4, 9, 13, 16, 17, 18, 21, 25], [0, 3, 4, 5, 10], 
         [1,2, 11],                      [2, 6, 7] ),  
          
        //3 
          new  Landscape.OneTileLink("land_grass04.png", 
         [1, 2, 3, 6, 10],      [0, 3, 4, 5, 10], 
         [3, 5, 6, 10, 12],     [0, 1, 3, 8, 10] ),  
            
        //4 
          new  Landscape.OneTileLink("land_grass05.png", 
         [1, 2, 3, 10],      [2, 7, 11, 15, 18, 19, 20, 25], 
         [0, 4, 13],     [4, 5, 9] ),  
            
        //5 
          new  Landscape.OneTileLink("land_grass06.png", 
         [1, 2, 3, 6, 10 ],      [6, 12, 13], 
         [0, 4, 13],     [0, 1, 3, 8, 10] ),  

        //6 
          new  Landscape.OneTileLink("land_grass07.png", 
         [5, 11, 12],      [0, 3, 4, 5, 10], 
         [1, 2, 11],     [0, 1, 3, 8, 10] ),  
    
        //7 
          new  Landscape.OneTileLink("land_grass08.png", 
         [4, 9, 13, 16, 17, 18, 21, 25],  [1, 8, 9], 
         [1, 2, 11],     [11, 12, 13, 15, 16, 18, 23, 25] ),  
    
        //8 
          new  Landscape.OneTileLink("land_grass09.png", 
         [0, 7, 8 ],  [1, 8, 9], 
         [3, 5, 6, 10, 12], [11, 12, 13, 15, 16, 18, 23, 25] ),  
        
        //9 
          new  Landscape.OneTileLink("land_grass10.png", 
         [0, 7, 8 ],  [2, 7, 11, 15, 18, 19, 20, 25], 
         [0, 4, 13], [11, 12, 13, 15, 16, 18, 23, 25] ),  

       //10 
          new  Landscape.OneTileLink("land_grass11.png", 
         [1, 2, 3, 6, 10],      [0, 3, 4, 5, 10], 
         [3, 5, 6, 10, 12],     [0, 1, 3, 8, 10] ),  

       //11 
          new  Landscape.OneTileLink("land_grass12.png", 
         [4, 9, 13, 16, 17, 18, 21, 25],      [6, 12, 13], 
         [7, 8, 9, 18, 20, 21, 25, 27],     [2, 6, 7 ] ),  
     
       //12 
          new  Landscape.OneTileLink("land_grass13.png", 
         [5, 11, 12],      [6, 12, 13], 
         [7, 8, 9, 18, 20, 21, 25, 27],     [0, 1, 3, 8, 10 ] ),  
          
       //13 
          new  Landscape.OneTileLink("land_grass14.png", 
         [11, 12],      [2, 7, 11, 15, 18, 19, 20, 25], 
         [7, 8, 9, 18, 20, 21, 25, 27],     [4, 5, 9 ] ),  
       
      
      //14 
          new  Landscape.OneTileLink("land_dirt01.png", 
         [20, 26, 27],      [17, 22, 26], 
         [22, 23, 24],     [19, 20, 24 ] ),        
      
      //15 
          new  Landscape.OneTileLink("land_dirt02.png", 
         [4, 9, 13, 16, 17, 18, 21, 25],      [16, 23, 24], 
         [7, 8, 9, 18, 20, 21, 25, 27],     [19, 20, 24 ] ),        
            
      //16 
          new  Landscape.OneTileLink("land_dirt03.png", 
         [15, 22, 23 ],      [2, 7, 11, 15, 18, 19, 20, 25 ], 
         [7, 8, 9, 18, 20, 21, 25, 27],     [17, 21, 22  ] ),
         
      //17 
          new  Landscape.OneTileLink("land_dirt04.png", 
         [14, 19, 24],      [2, 7, 11, 15, 18, 19, 20, 25 ], 
         [16, 17, 26],     [17, 21, 22  ] ),
         
     //18 
          new  Landscape.OneTileLink("land_dirt05.png", 
         [4,  9, 13, 16, 17, 18, 21, 25],   [2, 7, 11, 15, 18, 19, 20, 25 ], 
         [7, 8, 9, 18, 20, 21, 25, 27],     [11, 12, 13, 15, 16, 18, 23, 25]  ),

    //19 
          new  Landscape.OneTileLink("land_dirt06.png", 
         [4,  9, 13, 16, 17, 18, 21, 25],   [17, 22, 26], 
         [14, 15, 19 ],      [19, 20, 24]  ),
            
    
    //20 
          new  Landscape.OneTileLink("land_dirt07.png", 
         [4,  9, 13, 16, 17, 18, 21, 25],   [14, 21, 27], 
         [14, 15, 19 ],       [11, 12, 13, 15, 16, 18, 23, 25]  ),
    
    //21 
          new  Landscape.OneTileLink("land_dirt08.png", 
         [20, 26, 27],   [2, 7, 11, 15, 18, 19, 20, 25 ], 
         [16, 17, 26],       [11, 12, 13, 15, 16, 18, 23, 25]   ),
            
    //22 
          new  Landscape.OneTileLink("land_dirt09.png", 
         [14, 19, 24],    [16, 23, 24], 
         [16, 17, 26],       [14, 26, 27]   ),
            
    //23 
          new  Landscape.OneTileLink("land_dirt10.png", 
         [15, 22, 23],    [16, 23, 24], 
         [7, 8, 9, 18, 20, 21, 25, 27],       [14, 26, 27]),
  

    //24 
          new  Landscape.OneTileLink("land_dirt11.png", 
            [15, 22, 23],    [17, 22, 26], 
            [14, 15, 19 ],       [14, 26, 27]),        
    //25 
          new  Landscape.OneTileLink("land_dirt12.png", 
         [4,  9, 13, 16, 17, 18, 21, 25],   [2, 7, 11, 15, 18, 19, 20, 25 ], 
         [7, 8, 9, 18, 20, 21, 25, 27],     [11, 12, 13, 15, 16, 18, 23, 25]  ),

    //26
          new  Landscape.OneTileLink("land_dirt13.png", 
         [14, 19, 24],   [14, 21, 27], 
         [22, 23, 24],     [17, 21, 22]   ),
    
    //27        
          new  Landscape.OneTileLink("land_dirt14.png", 
         [20, 26, 27],     [14, 21, 27], 
         [22, 23, 24],     [11, 12, 13, 15, 16, 18, 23, 25]   )
            
        ];
    };
    

//Метод для проверки возможности добавления черепички, с учетом
//размещения той которая уже находится левее, и той которая уже находится выше
//Возврашает либо undefined, если такое размешение не возможно, либо подмассив
//возможных индексов
    Landscape.TilesLinks.prototype.testByDiag = function (i_left, i_top)
    {
        var rez = [];
        for(var i = 0; i < this.sprites[i_left].rightNeighbourIndexes.length;
                    i++){
            for(var j = 0; 
              j < this.sprites[i_top].bottomNeighbourIndexes.length; j++){
                if(this.sprites[i_left].rightNeighbourIndexes[i] ===
                  this.sprites[i_top].bottomNeighbourIndexes[j]){
                    rez.push(this.sprites[i_left].rightNeighbourIndexes[i]); 
                } 
            }
        }
        return rez;
    };
    

/*Класс Landscape.Map - карта ландшафта. 
 * Определяет ландщафт размером: x_size - по горизонтали,
 * y_size - по вертикали. 
 * Размер задается в количестве тайлов. 
 *   */    
    Landscape.Map = function (x_size, y_size) {

//Создадим объект, содержаший связи        
        this.tilesLinks = new Landscape.TilesLinks();
        this.x_size = x_size;
        this.y_size = y_size;
        

//Диапазоны координат для предудущем
        this.oldIntervals = {x1: -1,
                             x2: -1,
                             y1: -1,
                             y2: -1};
        
        
        

        
//Создадим двумерный массив матрицу для все области. Пока будет для всей 
//области, в дальнейшем сделаем, чтобы задавалось только для той части, где 
//проходит трасса
        this.tilesIndexes = new Array(this.x_size);
        for(var i = 0; i < x_size; i++){
            this.tilesIndexes[i] = new Array(this.y_size);
        }
        
//Заполним таблицу соответствующими индексами из tilesLinks 
//1 заполним самую первую строчку
        this.tilesIndexes[0][0] = {};
        this.tilesIndexes[0][0].indx = 
                    Math.floor(Math.random()*this.tilesLinks.sprites.length);
        this.tilesIndexes[0][0].sprite = null;    
        for( var i = 1; i < this.x_size; i++){
            var i_prev = this.tilesIndexes[i-1][0].indx;
            var i_next = Math.floor(Math.random()*
                    this.tilesLinks.sprites[i_prev].rightNeighbourIndexes.length);
            this.tilesIndexes[i][0] = {};
            this.tilesIndexes[i][0].indx =         
                   this.tilesLinks.sprites[i_prev].rightNeighbourIndexes[i_next];
            this.tilesIndexes[i][0].sprite = null;
        }
        
        for( var j = 1; j < this.y_size; j++)
        {
            
//Массив mainArray предназначен для того, чтобы обеспечить обход всех возможных
//вариантов в ряду тайлов до тех пор, пока не будет полность заполнен этот ряд
//тайлов. Данный массив обеспечивает полный перебор всех возможных вариантов для
//данного ряда. Индекс для каждого элемента массива соответствует горизонтальной
//координате тайла от 0 и до (x_size - 1). Массив mainArray действует как стек.
            var mainArray=[ 
                {
                indexes:  //массив индексов тайлов
this.tilesLinks.sprites[this.tilesIndexes[0][j-1].indx].bottomNeighbourIndexes,     
                cur:   //индекс на какой-то начальный элемент из массива 
                   Math.floor(     
(this.tilesLinks.sprites[this.tilesIndexes[0][j-1].indx].
                          bottomNeighbourIndexes.length*Math.random())),
                cnt: 0, //Счетчик индексов при обходе.
                n_of_indx:  //число индексов, на самом деле дублируем значение
this.tilesLinks.sprites[this.tilesIndexes[0][j-1].indx].
                                            bottomNeighbourIndexes.length
                }
            ];
            
//Начинем заполнение со второго элемента (индекс 1 и далее)
//Условие выхода: либо массив mainArray будет пустым (размер равен 0)(что не 
//желательно), либо полностью заполнен.
            while(mainArray.length > 0 && mainArray.length < this.x_size){
                var new_indx = mainArray.length;
//Проверим, а не исчерпан ли текущий элемент, то есть все варианты рассмотрены
//для тайла с координатами (new_indx-1), то есть его значение cnt равно
//его значению n_of_indx
                if(mainArray[new_indx-1].cnt === 
                      mainArray[new_indx-1].n_of_indx){
                    mainArray.pop();  //Удалим тогда данный этого тайла из массива
                    if(mainArray.length>0){  
//Если массив еще не опустошен, то надо скорректировать его параметры:
//количество проверенных вариантов увеличить на 1 и индекс изменить
                        mainArray[mainArray.length-1].cnt++;
                        if(mainArray[mainArray.length-1].cnt<
                          mainArray[mainArray.length-1].n_of_indx){
                            mainArray[mainArray.length-1].cur++;
                            if(mainArray[mainArray.length-1].cur === 
                              mainArray[mainArray.length-1].n_of_indx)
                            {
                                mainArray[mainArray.length-1].cur=0;
                            }    
                        }    
                    }
                    continue;  //Перейти к следующей иттерации
                }
                

                
//Размер подмассив
                var subArray = this.tilesLinks.testByDiag(
                       mainArray[new_indx-1].indexes[mainArray[new_indx-1].cur],
                       this.tilesIndexes[new_indx][j-1].indx);

                
                if (subArray.length === 0){
                    mainArray[new_indx-1].cnt++;
                    if(mainArray[new_indx-1].cnt<
                     mainArray[new_indx-1].n_of_indx){  
                        mainArray[new_indx-1].cur++;
                        if(mainArray[new_indx-1].cur ===
                          mainArray[new_indx-1].n_of_indx){
                            mainArray[new_indx-1].cur=0;
                        }    
                    }    
                    continue;
                }    

//добавим новый элемент
                mainArray.push(
                    {    
                        indexes:  subArray,
                        cur: Math.floor(subArray.length*Math.random()),    
                        cnt: 0, 
                        n_of_indx: subArray.length
                    }        
                );
            }
                
//Теперь надо разобраться с заполнением
            if( mainArray.length === 0 )
            {
//Неудачное заполнение - тогда просто случайным образом заполним
                this.tilesIndexes[0][j] = 
                    Math.floor(Math.random()*this.tilesLinks.sprites.length);
                for( var i = 1; i < this.x_size; i++){
                    var i_prev = this.tilesIndexes[i-1][j];
                    var i_next = Math.floor(Math.random()*
                    this.tilesLinks.sprites[i_prev].length);
                    this.tilesIndexes[i][j] = {};
                    this.tilesIndexes[i][j].indx=
                this.tilesLinks.sprites[i_prev].rightNeighbourIndexes[i_next];
                    this.tilesIndexes[i][j].sprite = null;   
           
                }                
            }else{  // mainArray.length === this.x_size
                for(var i = 0; i < this.x_size; i++){
                    this.tilesIndexes[i][j] = {};
                    this.tilesIndexes[i][j].indx = 
                            mainArray[i].indexes[mainArray[i].cur];
                    this.tilesIndexes[i][j].sprite = null;
                }
            }    
                
        }  // for( var j = 1; j < this.y_size; j++)   
        
        
    };

/*Метод setViewingTiles - предназначен для установки тех тайлов, спрайты которых
 * надо отобразить. Вся задаваемая область  - x: от 0 до x_size, y: от 0 до 
 * y_size . Считаем, что 0 0 --- соответствует левому-верхнему углу,
 * x_size, y_size --- правому нижнему углу. 
 * Параметры: container - контейнер, для отображения данных типа PIXI.Container
 * (xc, yc) --- координаты центра окна отображения, значения являются веществен-
 * ными если значения координат равны (int_x+0.5, int_y+0.5), где (int_x, int_y-
 * целые числа), то центр области попадет на центр этого тайла.
  */    
    Landscape.Map.prototype.setViewingTiles = function( container,
                                                xc, yc, rt){
//Определим размеры стороны контейнера.
        var areaWidth, areaHeight;
        areaWidth = window.renderer.width;
        areaHeight = window.renderer.height;
     //   container.x = areaWidth/2;
     //   container.y = areaHeight/2;
        var contSize = Math.max(areaWidth, areaHeight)*1.5;
        var spriteWidth = 128,  spriteHeight = 128;
        
        var cos_rt = Math.cos(rt), sin_rt = Math.sin(rt);
        
//определим размеры одного спрайта.
       /* for(var i = 0;  i < this.tilesLinks.sprites.length; i++){
            var sprite = window.PIXI.Sprite.fromFrame(this.tilesLinks.sprites[i].name);
            if (sprite)
            {
                if(sprite.width && sprite.height)
                {
                    spriteWidth = sprite.width;
                    spriteHeight = sprite.height;
                    sprite.destroy();
                    break;
                }    
                sprite.destroy();    
            }    
        }*/
//определим позиции откуда выводить

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
      
//Удалим те тайлы, которые не надо отображать
        if( this.oldIntervals.x1 >= 0 && this.oldIntervals.x2 >= 0 &&
            this.oldIntervals.y1 >= 0 && this.oldIntervals.y2 >= 0){    
            
            for(var i = this.oldIntervals.x1; i <= this.oldIntervals.x2; i++){
                for(var j = this.oldIntervals.y1; j<=this.oldIntervals.y2; j++){
                    if(i < x1 || i > x2 || j < y1 || j > y2){
                        if(!!this.tilesIndexes[i][j].sprite){
                           this.tilesIndexes[i][j].sprite.destroy();
                           this.tilesIndexes[i][j].sprite = null;
                        }
                    }
                }
            }
        }
        
        this.oldIntervals.x1 = x1; 
        this.oldIntervals.x2 = x2; 
        this.oldIntervals.y1 = y1; 
        this.oldIntervals.y2 = y2; 

        
//Расчитаем координаты самого первого спрайта x1, y1
        var x_n=(x1-xc)*cos_rt-(y1-yc)*sin_rt;
        var y_n=(x1-xc)*sin_rt+(y1-yc)*cos_rt;
        if(! this.tilesIndexes[x1][y1].sprite){
            var spriteName = 
                this.tilesLinks.sprites[this.tilesIndexes[x1][y1].indx].name;
            this.tilesIndexes[x1][y1].sprite = 
                      new  window.PIXI.Sprite.fromFrame (spriteName);
            
            container.addChild(this.tilesIndexes[x1][y1].sprite);    
        }            


        this.tilesIndexes[x1][y1].sprite.x = 
            Math.round(areaWidth/2+spriteWidth*x_n);    
        this.tilesIndexes[x1][y1].sprite.y = 
            Math.round(areaHeight/2+spriteWidth*y_n);      
        
        this.tilesIndexes[x1][y1].sprite.rotation = rt;
        
        
        
        for(var i = x1 + 1; i <= x2; i++){
            
            if(! this.tilesIndexes[i][y1].sprite){
                var spriteName = 
        this.tilesLinks.sprites[this.tilesIndexes[i][y1].indx].name;
                this.tilesIndexes[i][y1].sprite = 
                       new window.PIXI.Sprite.fromFrame (spriteName);
                
                container.addChild(this.tilesIndexes[i][y1].sprite);    
            }   
            
            this.tilesIndexes[i][y1].sprite.x = 
               Math.round(this.tilesIndexes[i-1][y1].sprite.x+spriteWidth*cos_rt);
                        
            this.tilesIndexes[i][y1].sprite.y = 
               Math.round(this.tilesIndexes[i-1][y1].sprite.y+spriteWidth*sin_rt); 
   
            this.tilesIndexes[i][y1].sprite.scale.x=1.00+3.0/128.0;
            this.tilesIndexes[i][y1].sprite.scale.y=1.00+3.0/128.0;
   
 /*   
            this.tilesIndexes[i][y1].sprite.x = 
               this.tilesIndexes[i-1][y1].sprite.x+spriteWidth*cos_rt;
                        
            this.tilesIndexes[i][y1].sprite.y = 
               this.tilesIndexes[i-1][y1].sprite.y+spriteWidth*sin_rt; 
*/            
            this.tilesIndexes[i][y1].sprite.rotation = rt;
        }    
        
        for(var j = y1 + 1; j <= y2; j++){
            
            if(! this.tilesIndexes[x1][j].sprite){
                var spriteName = 
        this.tilesLinks.sprites[this.tilesIndexes[x1][j].indx].name;
                this.tilesIndexes[x1][j].sprite = 
                      new  window.PIXI.Sprite.fromFrame (spriteName);
                container.addChild(this.tilesIndexes[x1][j].sprite);    
            }    

            
            this.tilesIndexes[x1][j].sprite.x = 
           Math.round(this.tilesIndexes[x1][j-1].sprite.x-spriteWidth*sin_rt);
                        
            this.tilesIndexes[x1][j].sprite.y = 
           Math.round(this.tilesIndexes[x1][j-1].sprite.y+spriteWidth*cos_rt); 
            
            this.tilesIndexes[x1][j].sprite.scale.x=1.00+3.0/128.0;
            this.tilesIndexes[x1][j].sprite.scale.y=1.00+3.0/128.0;
            this.tilesIndexes[x1][j].sprite.rotation = rt;
            
            
        }
        
        
        for(var i = x1 + 1; i <= x2; i++){
            for(var j = y1 + 1; j <= y2; j++){
                
                if(! this.tilesIndexes[i][j].sprite){
                    var spriteName = 
        this.tilesLinks.sprites[this.tilesIndexes[i][j].indx].name;
                    this.tilesIndexes[i][j].sprite = 
                      new  window.PIXI.Sprite.fromFrame (spriteName);
                    container.addChild(this.tilesIndexes[i][j].sprite);    
                }    
                
//Расчитаем координаты в единицах тайлов
                this.tilesIndexes[i][j].sprite.x = 
                Math.round(this.tilesIndexes[i-1][j].sprite.x+(spriteWidth)*cos_rt);
                        
                this.tilesIndexes[i][j].sprite.y = 
                Math.round(this.tilesIndexes[i-1][j].sprite.y+(spriteWidth)*sin_rt); 
            
                this.tilesIndexes[i][j].sprite.scale.x=1.00+3.0/128.0;
                this.tilesIndexes[i][j].sprite.scale.y=1.00+3.0/128.0;
                this.tilesIndexes[i][j].sprite.rotation = rt;
            
            }
        }    
    };
    

/*тестирование полученных данных*/    
    Landscape.Map.prototype.testForCorrect = function(){
      
      var tmp_i;  
      for(var i = 0; i < this.x_size; i++){
            for(var j =0; j <this.y_size; j++){
                tmp_i=tilesIndexes[i][j];
                
            }
      }
        
    };
    
    
}());     



