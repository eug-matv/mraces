/* rc-main.js - главный модуль программы
 * Автор: Матвеенко Е.А.
 * Дата: 14.02.2017
 * Главный модуль программы обеспечивает различные состояния отображаемого 
 * поля.
 * Опишем состояния:
 * 0) mainMenuState - главное меню программы. 
 * В главном меню можно либо закрыть окно, либо перейти на состояние запуска 
 * игры 1)gameState,
 *  либо выбрать 2) carSelectingState; либо перейти на просмотр 
 *  результатов  3) resultsStates
 * 
 * 1) gameState - состояние запуска игры. Происходит при загрузке данных, а 
 * затем начинается игра.  Реализация пока в rc-car.js
 * 
 * 2) manualState - состояние инструкции к игре. Из этого состояния можно 
 * вернуться к основному окну путем нажатия кнопки Esc или щелкнув на кнопке
 * "Вернуться на главную страницу"
 * 
 * 3) resultsState - состояния показывающее лучшие результаты игры.
 * 
 */



"use strict";

(function  (){
    var START_APP_STATE = 0; //Только запустили
    var MAIN_MENU_STATE = 1;   //Состояние отображения главного меню
    var GAME_STATE = 2;   //Режим игры
    var CAR_OPTIONS_STATE = 3; //Режим выбора автомобиля
    var RESULTS_STATE = 4;    //Режим с лучшими результами         
       
    
    
    window.Main = {
        CARS_FILES: [
            
          [ "car_black_small_1.png",
            "car_black_small_2.png",
            "car_black_small_3.png",
            "car_black_small_4.png",
            "car_black_small_5.png"
          ],   
          [ "car_blue_small_1.png",
            "car_blue_small_2.png",
            "car_blue_small_3.png",
            "car_blue_small_4.png",
            "car_blue_small_5.png"
          ],
          [ "car_green_small_1.png",
            "car_green_small_2.png",
            "car_green_small_3.png",
            "car_green_small_4.png",
            "car_green_small_5.png"
          ],
          [ "car_red_small_1.png",
            "car_red_small_2.png",
            "car_red_small_3.png",
            "car_red_small_4.png",
            "car_red_small_5.png"
          ],
          [ "car_yellow_small_1.png",
            "car_yellow_small_2.png",
            "car_yellow_small_3.png",
            "car_yellow_small_4.png",
            "car_yellow_small_5.png"
          ] 
        ]
    };
    
    
    
    Main.App = function(){

/*Свойство myCar --- это выбранный автомобиль для поездки.
 * Если значение myCar === [i, j], то соответствующий автомобиль
 * определен спрайтом  Main.CARS_FILES[i][j]. Массив Main.CARS_FILES определен
 * выше
 */        
        this.myCar = [0, 0];

//Проверим возможность работы с локальным хранилищем                                        
        if (typeof(Storage) !== "undefined") {

//Проверим существование данных и корректность заполнения            
            if(!!localStorage.mraceMyCar){
                var tmpArr = localStorage.mraceMyCar.split(",");
                if(tmpArr.length &&
                  tmpArr.length === 2){
                    this.myCar = tmpArr;
                }        
            }
        } 



/*Свойство selectedCar --- это выбранный автомобиль для поездки. Использается 
 * как временная переменная при состоянии this.state === CAR_OPTIONS_STATE.
 * Если значение selectedCar === [i, j], то соответствующий автомобиль
 * определен спрайтом  Main.CARS_FILES[i][j]. Массив Main.CARS_FILES определен
 * выше. 
 * Если при выборе авто вы
 */        
        this.selectedCar = this.myCar.slice(0);
        
        
//Установим текущее состояние Главное меню         
       this.state =  START_APP_STATE;
       
       
//Создадим отображатель, первоначально размер 200x200.       
       this.renderer =  new window.PIXI.autoDetectRenderer(200, 200,
           {backgroundColor: 0xA02020});
      
       this.renderer.view.style.position = "absolute";
       this.renderer.view.style.display = "block";
       this.renderer.autoResize = true;
       this.renderer.resize(window.innerWidth-10, window.innerHeight-10);
      
       document.body.appendChild(this.renderer.view);
      
//Создадим stage для гланого меню      
      
      
//Установим список объектов с которыми будем работать
       this.graphicsObjects = {}; 
        
//Установим состояние окна
       this.setNewState(MAIN_MENU_STATE); 
        
    };
    
    
/*Отображение данных в зависимости от текущего режима*/
    Main.App.prototype.render = function(){

           
        switch(this.state){
            case MAIN_MENU_STATE:
                if(!!this.renderer && 
                   !!this.graphicsObjects['mainMenuStage']){
                    this.renderer
                        .render(this.graphicsObjects['mainMenuStage']);
                };
                break;
                
            case CAR_OPTIONS_STATE:
                if(!!this.renderer && 
                   !!this.graphicsObjects['carOptionsStage']){
                    this.renderer
                        .render(this.graphicsObjects['carOptionsStage']);
                };
                break;
                
                
        }
    };
    

/*Обработка изменения размера области*/
    Main.App.prototype.resize = function(){
        
        switch(this.state){
            case MAIN_MENU_STATE:
                this.viewMainMenu();
                break;
                
            case CAR_OPTIONS_STATE:
                this.carOptionsMenu();
                break;       
        }
    };
    
   
    
/*обработка измененения состояния
 
 */    
    Main.App.prototype.setNewState = function(newState){
        
        switch(newState){
            case MAIN_MENU_STATE:
                this.viewMainMenu();
                break;
                
            case CAR_OPTIONS_STATE:
                this.carOptionsMenu();
                break;       
        }
    
    };
    
    
    
    Main.App.prototype.viewMainMenu = function(){
        
        var textHeader;
      
        this.renderer.view.style.position = "absolute";
        this.renderer.view.style.display = "block";
        this.renderer.autoResize = true;
        this.renderer.resize(window.innerWidth-10, window.innerHeight-10);
        
        
        if(window.wasGotTextureAtlas){
            textHeader = 'Программа M-RACES-гонки';
        }else{
            textHeader = 'Программа M-RACES-гонки - идет загрузка';
        }

        this.state = MAIN_MENU_STATE;
        
  
//Проверим наличие stage для этого окна
        if(!this.graphicsObjects['mainMenuStage']){
            this.graphicsObjects['mainMenuStage'] = 
                    new window.PIXI.Container();
        }
  
  
//Создадим заголовок вверху страницы
        if(!this.graphicsObjects["mainMenuHeader"]){
            var style = new window.PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 40,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: ['#ffffff', '#00ff99'], // gradient
                stroke: '#4a1850',
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: '#004000',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6
            });  
            this.graphicsObjects["mainMenuHeader"] = 
                new window.PIXI.Text(textHeader, style);
            this.graphicsObjects["mainMenuStage"].
                    addChild(this.graphicsObjects["mainMenuHeader"]);

        }
        this.graphicsObjects["mainMenuHeader"].text = textHeader;
        this.graphicsObjects["mainMenuHeader"].x = 
           (this.renderer.width - 
                this.graphicsObjects["mainMenuHeader"].width) / 2;
        this.graphicsObjects["mainMenuHeader"].y = 30;
        
        if(!this.graphicsObjects["manual"]){
            var style = new window.PIXI.TextStyle({
                align: 'center',
                fontFamily: 'Arial',
                fontSize: 20,
                strokeThickness: 2,
                color: 0xff00ff,
                wordWrap: true,
                wordWrapWidth: this.renderer.width-20
            });  
    
            var manualText = "   Описание программы. \n\ "+
        "   Вы управляете автомобилем вид сверху. Цель: как можно быстрее "+
        "три круга. \n  Управление: кнопки-стрелки ВЕРХ-ВНИЗ" +
        "- ускорение-замедление, \n кнопки стрелки ЛЕВО-ПРАВО. \n\n\ "+
        " Кнопка: Esc - выход в главное меню";   
        
        
            this.graphicsObjects["manual"] = 
                new PIXI.Text(manualText, style);
            this.graphicsObjects["mainMenuStage"].
                    addChild(this.graphicsObjects["manual"]);    
        }
        
        this.graphicsObjects["manual"].x = 10;
        this.graphicsObjects["manual"].y = 100;
        this.graphicsObjects["manual"].width = this.renderer.width-20;
        
        
        
        if(!window.wasGotTextureAtlas){
            this.renderer.render(this.graphicsObjects['mainMenuStage']);
            return;
        }    

//нарисуем кнопки        

//Кнопка для старта программы
        if(!this.graphicsObjects["startButton"]){
            this.graphicsObjects["startButton"] = 
               new PIXI.Sprite.fromFrame ('play.png');
            this.graphicsObjects["startButton"].interactive = true;
            this.graphicsObjects["startButton"].buttonMode = true;
            
    //Установим связь с текущим элементом, через this. Для того, чтобы
    //иметь доступ к объекту типа Main.App в обработчиках событий 
            this.graphicsObjects["startButton"].app = this;

    //Установим координаты относительно середины кнопки           
            this.graphicsObjects["startButton"].anchor.set(0.5);

    //Чуть уменьшим кнопку. При наведении мыши она будет чуть-чуть 
    //увеличиваться
            this.graphicsObjects["startButton"].scale.set(0.8);

    //Обработка события нажатия кнопки. Пока не дореализовано, но должен 
    //быть запуск программы
            this.graphicsObjects["startButton"].on("pointerdown", 
                function(){
                    alert("startButton's click"); 
                }
            );
    
    //Обработка события наведения курсора мыши на объект. Объект
    //должен увеличиться слегка
            this.graphicsObjects["startButton"].on("pointerover", 
                rcmScaleTo1_0 //Функция определена ниже
            );

    //Обработка события ухода курсора мыши с объекта. Объект
    //должен вернуться в исходное состояние
            this.graphicsObjects["startButton"].on("pointerout", 
                rcmScaleTo0_8  //Функция определена ниже
            );
            
    
            this.graphicsObjects["mainMenuStage"]
                .addChild(this.graphicsObjects["startButton"]);
        }
        this.graphicsObjects["startButton"].x = this.renderer.width/5 - 50;
        this.graphicsObjects["startButton"].y = this.renderer.height - 60;
                
                
                
/*Обработка кнопки нажатия для выбора автомобиля*/                
        if(!this.graphicsObjects["selectCarButton"]){
            this.graphicsObjects["selectCarButton"] = 
                new PIXI.Sprite.fromFrame ('tool.png');
        
            this.graphicsObjects["selectCarButton"].interactive = true;
            this.graphicsObjects["selectCarButton"].buttonMode = true;
            
    //Установим связь с текущим элементом, через this. Для того, чтобы
    //иметь доступ к объекту типа Main.App в обработчиках событий 
            this.graphicsObjects["selectCarButton"].app = this;

    //Установим координаты относительно середины кнопки           
            this.graphicsObjects["selectCarButton"].anchor.set(0.5);

    //Чуть уменьшим кнопку. При наведении мыши она будет чуть-чуть 
    //увеличиваться
            this.graphicsObjects["selectCarButton"].scale.set(0.8);

    //Обработка события нажатия кнопки выбора автомобиля
            this.graphicsObjects["selectCarButton"].on("pointerdown", 
                function(){
                    this.app.selectedCar = this.app.myCar.slice(0);
                    this.scale.set(0.8);    //Восстановим scale
                    this.app.setNewState(CAR_OPTIONS_STATE);
                }
            );
    
    //Обработка события наведения курсора мыши на объект. Объект
    //должен увеличиться слегка
            this.graphicsObjects["selectCarButton"].on("pointerover", 
                rcmScaleTo1_0 //Функция определена ниже
            );

    //Обработка события ухода курсора мыши с объекта. Объект
    //должен вернуться в исходное состояние
            this.graphicsObjects["selectCarButton"].on("pointerout", 
                rcmScaleTo0_8  //Функция определена ниже
            );
    
            this.graphicsObjects["mainMenuStage"]
                .addChild(this.graphicsObjects["selectCarButton"]);
        }    
        
        
        this.graphicsObjects["selectCarButton"].x = 
                     2 * this.renderer.width/5 - 50;
        this.graphicsObjects["selectCarButton"].y = this.renderer.height - 60;
        
/*Добавим кнопку результатов по гонкам*/        
        if(!this.graphicsObjects["bestResultsButton"]){
            this.graphicsObjects["bestResultsButton"] = 
                new PIXI.Sprite.fromFrame ('statistics.png');
        
        
            this.graphicsObjects["bestResultsButton"].interactive = true;
            this.graphicsObjects["bestResultsButton"].buttonMode = true;
            
    //Установим связь с текущим элементом, через this. Для того, чтобы
    //иметь доступ к объекту типа Main.App в обработчиках событий 
            this.graphicsObjects["bestResultsButton"].app = this;

    //Установим координаты относительно середины кнопки           
            this.graphicsObjects["bestResultsButton"].anchor.set(0.5);

    //Чуть уменьшим кнопку. При наведении мыши она будет чуть-чуть 
    //увеличиваться
            this.graphicsObjects["bestResultsButton"].scale.set(0.8);

    //Обработка события нажатия кнопки. Пока не дореализовано, но должен 
    //быть запуск программы
            this.graphicsObjects["bestResultsButton"].on("pointerdown", 
                function(){
                    alert("startButton's click"); 
                }
            );
    
    //Обработка события наведения курсора мыши на объект. Объект
    //должен увеличиться слегка
            this.graphicsObjects["bestResultsButton"].on("pointerover", 
                rcmScaleTo1_0 //Функция определена ниже
            );

    //Обработка события ухода курсора мыши с объекта. Объект
    //должен вернуться в исходное состояние
            this.graphicsObjects["bestResultsButton"].on("pointerout", 
                rcmScaleTo0_8  //Функция определена ниже
            );
                        
            this.graphicsObjects["mainMenuStage"]
                .addChild(this.graphicsObjects["bestResultsButton"]);
        }
        
        this.graphicsObjects["bestResultsButton"].x = 
                     3 * this.renderer.width/5 - 50;
        this.graphicsObjects["bestResultsButton"].y = 
                    this.renderer.height - 60;
        
        this.renderer.render(this.graphicsObjects['mainMenuStage']);
        
    };
    
/*Выбор автомобилей меню*/
    
    Main.App.prototype.carOptionsMenu = function(){
        
        var textHeader = 'Программа M-RACES-гонки. Выбор машины';

        //Определим размеры
        this.renderer.view.style.position = "absolute";
        this.renderer.view.style.display = "block";
        this.renderer.autoResize = true;
        this.renderer.resize(window.innerWidth-10, window.innerHeight-10);
        
        this.state = CAR_OPTIONS_STATE;
        
        if(!this.graphicsObjects['carOptionsStage']){
            this.graphicsObjects['carOptionsStage'] = 
                    new window.PIXI.Container();
        }    

//Создадим заголовок вверху страницы
        if(!this.graphicsObjects["optionsStateHeader"]){
            var style = new window.PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 36,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: ['#aaaaaa', '#00ff00'], // gradient
                stroke: '#4a1850',
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: '#0040ff',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 4}
            );
            this.graphicsObjects["optionsStateHeader"] = 
                new window.PIXI.Text(textHeader, style);
            this.graphicsObjects["carOptionsStage"].
                    addChild(this.graphicsObjects["optionsStateHeader"]);

        }    
        
        
        this.graphicsObjects["optionsStateHeader"].x = 
           (this.renderer.width - 
               this.graphicsObjects["optionsStateHeader"].width) / 2;
        this.graphicsObjects["optionsStateHeader"].y = 30;
        
        
//Проверим существование объекта selectedCarGraphics
        
        if( !this.graphicsObjects["selectedCarGraphics"] ){
            this.graphicsObjects["selectedCarGraphics"] = new PIXI.Graphics();
            this.graphicsObjects["carOptionsStage"].
                    addChild(this.graphicsObjects["selectedCarGraphics"]);
        }
        
        
        
        
//Загрузим скрины машин        
//Определим поле вывода данных автомобилей
        var carFieldsWidth = this.renderer.width;
        var carFieldsHeight = this.renderer.height - 
                this.graphicsObjects["optionsStateHeader"].y -
                this.graphicsObjects["optionsStateHeader"].height  ;
        
        var oneCarStepWidth = carFieldsWidth / 6;
        var oneCarStepHeight = carFieldsHeight / 7;
        
        var firstCarX;   //Величина рассчитывается
        var baseFirstCarX = oneCarStepWidth;
        var firstCarY = this.graphicsObjects["optionsStateHeader"].y +
                this.graphicsObjects["optionsStateHeader"].height+
                oneCarStepHeight / 2;
       
        var oneCarWidth = oneCarStepWidth / 2;
        var oneCarHeight = oneCarStepHeight / 2;


        

        for(var i = 0; i < 5; i++){
            
//Проверим на четность
            if( (i & 1) === 1){
                firstCarX = baseFirstCarX - oneCarStepWidth / 4;
            }else{
                firstCarX = baseFirstCarX + oneCarStepWidth / 4;
            }
            
            for(var j = 0; j < 5; j++){
                var curScale = 1.0;
                var fn = Main.CARS_FILES[i][j];
                if(!this.graphicsObjects[fn]){
                    
                    this.graphicsObjects[fn] = 
                    new window.PIXI.Sprite.fromFrame (fn);
                    this.graphicsObjects[fn].interactive = true;
                    this.graphicsObjects[fn].buttonMode = true;
                    
                    this.graphicsObjects[fn].curRenderer = this.renderer;
                    this.graphicsObjects[fn].curStage = 
                            this.graphicsObjects['carOptionsStage'];
                    
                    this.graphicsObjects[fn].anchor.set(0.5);
                   // this.graphicsObjects[fn].rotate = 1.0;
                    this.graphicsObjects[fn].pivot.set(0.5);
                    
                //Скопипуем ссылку на объект selectedCar чтобьы иметь доступ    
                    this.graphicsObjects[fn].app = this;
                    
                    
                    this.graphicsObjects[fn].on("pointerdown", function(){
                        if(this.i !== this.app.selectedCar[0]  ||
                           this.j !== this.app.selectedCar[1]){
                            this.app.selectedCar[0] = this.i;
                            this.app.selectedCar[1] = this.j;                            
                            this.scale.set(0.5);    
                            
                            this.app.paintSelectionForCar();
                            this.app.render();
                        }
                    });
                    
                    this.graphicsObjects[fn].on("pointerover", function(){
                        if(this.i !== this.app.selectedCar[0]  ||
                           this.j !== this.app.selectedCar[1]){
                            this.scale.set(1.0);
                            this.app.render();
                        }    
                    });
                    
                    this.graphicsObjects[fn].on("pointerout", function(){
                        this.scale.set(0.5);
                        window.animate();
                    });
                    
                    
                    
                    this.graphicsObjects[fn].i = i;    
                    this.graphicsObjects[fn].j = j;                    
                    this.graphicsObjects[fn].scale.x = 0.5;    
                    this.graphicsObjects[fn].scale.y = 0.5;       
                    this.graphicsObjects["carOptionsStage"]
                        .addChild(this.graphicsObjects[fn]);
                }
        
//Определим размеры        
                if( this.graphicsObjects[fn].width >  oneCarWidth){
                    curScale = oneCarWidth / this.graphicsObjects[fn].width;
                    if(!curScale  ){
                        alert("123");
                    }
                }
                
                if( this.graphicsObjects[fn].height >  oneCarHeight){
                    
                    var curScale1 = 
                          oneCarHeight / this.graphicsObjects[fn].height;
                          
                    if(curScale1 < curScale){
                        curScale = curScale1;
                    }
                    if(!curScale  ){
                        alert("123");
                    }
                }
                
                
                    
                this.graphicsObjects[fn].x = firstCarX +
                    oneCarStepWidth * j;    
                     
                this.graphicsObjects[fn].y = firstCarY + 
                    oneCarStepHeight * i;    
            
            }
        }
        
        
        this.paintSelectionForCar();
        
    // добавим кнопку ОК для выбранного авто
        if(!this.graphicsObjects["okForSelectedCar"]){
            this.graphicsObjects["okForSelectedCar"] = 
              new window.PIXI.Sprite.fromFrame ('ok.png');
            this.graphicsObjects["okForSelectedCar"].interactive = true;
            this.graphicsObjects["okForSelectedCar"].buttonMode = true;                            
            this.graphicsObjects["okForSelectedCar"].anchor.set(0.5);
            this.graphicsObjects["okForSelectedCar"].scale.set(0.8);                    
        //Скопипуем ссылку на объект selectedCar чтобьы иметь доступ    
            this.graphicsObjects["okForSelectedCar"].app = this;
            this.graphicsObjects["okForSelectedCar"].on("pointerdown", 
                function(){
//Установим новый выбранный автомобиль                    
                    this.app.myCar = this.app.selectedCar.slice(0);

//Занесем так же в localStorage
                    if (typeof(Storage) !== "undefined") {
                        
                        localStorage.mraceMyCar = this.app.myCar.join(",");
                    }

//Восстановим исходный размер кнопки
                    this.scale.set(0.8);

//Перейдем в исходное окно                    
                    this.app.setNewState(MAIN_MENU_STATE);
                }
            );
    
        //Обработка события наведения курсора мыши на объект. Объект
        //должен увеличиться слегка
            this.graphicsObjects["okForSelectedCar"].on("pointerover", 
                rcmScaleTo1_0 //Функция определена вне класса ниже            
            );    
        //Обработка события ухода курсора мыши с объекта. Объект
        //должен вернуться в прежнее состояние
            this.graphicsObjects["okForSelectedCar"].on("pointerout", 
                rcmScaleTo0_8 //Функция определена вне класса ниже                        
            );
            
            this.graphicsObjects["carOptionsStage"]
                        .addChild(this.graphicsObjects["okForSelectedCar"]);
        };
    
        
        this.graphicsObjects["okForSelectedCar"].x =  this.renderer.width / 4;    
                     
        this.graphicsObjects["okForSelectedCar"].y = this.renderer.height -
                this.graphicsObjects["okForSelectedCar"].height / 2 - 30;    

      
    // добавим кнопку Cancel для отмены выбора авто
        if(!this.graphicsObjects["cancelForSelectedCar"]){
            this.graphicsObjects["cancelForSelectedCar"] = 
              new window.PIXI.Sprite.fromFrame ('cancel.png');
            this.graphicsObjects["cancelForSelectedCar"].interactive = true;
            this.graphicsObjects["cancelForSelectedCar"].buttonMode = true;                            
            this.graphicsObjects["cancelForSelectedCar"].anchor.set(0.5);
            this.graphicsObjects["cancelForSelectedCar"].scale.set(0.8);                    
        //Скопипуем ссылку на объект selectedCar чтобьы иметь доступ    
            this.graphicsObjects["cancelForSelectedCar"].app = this;
            this.graphicsObjects["cancelForSelectedCar"].on("pointerdown", 
                function(){
                    this.app.selectedCar = this.app.myCar.slice(0);
                    
            //Восстановим исходный размер
                    this.scale.set(0.8);
                    
            //Вернемся в состояние главного окна
                    this.app.setNewState(MAIN_MENU_STATE);
                }
            );
    
        //Обработка события наведения курсора мыши на объект. Объект
        //должен увеличиться слегка
            this.graphicsObjects["cancelForSelectedCar"].on("pointerover", 
                rcmScaleTo1_0 //Функция определена вне класса ниже
            );
        
        //Обработка события ухода курсора мыши с объекта. Объект
        //должен вернуться в прежнее состояние
            this.graphicsObjects["cancelForSelectedCar"].on("pointerout", 
                rcmScaleTo0_8 //Функция определена вне класса ниже
            );
            
            this.graphicsObjects["carOptionsStage"]
                        .addChild(this.graphicsObjects["cancelForSelectedCar"]);
        };
    
        
        this.graphicsObjects["cancelForSelectedCar"].x =  
                    this.renderer.width * 3 / 4;    
                     
        this.graphicsObjects["cancelForSelectedCar"].y = this.renderer.height -
                this.graphicsObjects["cancelForSelectedCar"].height / 2 - 30;    
        
        this.renderer.render(this.graphicsObjects['carOptionsStage']);  
    };


/*Рисование выделенной машины на выборе машины*/
    Main.App.prototype.paintSelectionForCar = function(){

        this.graphicsObjects["selectedCarGraphics"].clear(); //Очистим графику
        
        //Загрузим скрины машин        
//Определим поле вывода данных автомобилей
        var carFieldsWidth = this.renderer.width;
        var carFieldsHeight = this.renderer.height - 
                this.graphicsObjects["optionsStateHeader"].y -
                this.graphicsObjects["optionsStateHeader"].height  ;
        
        var oneCarStepWidth = carFieldsWidth / 6;
        var oneCarStepHeight = carFieldsHeight / 7;
        
        var firstCarX;   //Величина рассчитывается
        var baseFirstCarX = oneCarStepWidth;
        var firstCarY = this.graphicsObjects["optionsStateHeader"].y +
                this.graphicsObjects["optionsStateHeader"].height+
                oneCarStepHeight / 2;

        
//Нарисуем сначала графику круги которые будут вокруг выбранного авто
        if((this.selectedCar[0] & 1) === 1){
            firstCarX = baseFirstCarX - oneCarStepWidth / 4;
        }else{
            firstCarX = baseFirstCarX + oneCarStepWidth / 4;
        }

        var xr = firstCarX + oneCarStepWidth * this.selectedCar[1];
        var yr = firstCarY + oneCarStepHeight * this.selectedCar[0];
        
//Определим внешний радиус        
        var rOut =  0.5 * Math.min(oneCarStepWidth, oneCarStepHeight);
        var rIn = rOut * 0.8;

//Нарисуем первую окружность большую
        this.graphicsObjects["selectedCarGraphics"].lineStyle(2, 0x001122, 1);
        this.graphicsObjects["selectedCarGraphics"].beginFill(0x00aa55, 1);
        this.graphicsObjects["selectedCarGraphics"].drawCircle(xr,yr,rOut);
        this.graphicsObjects["selectedCarGraphics"].endFill();
        
//Нарисуем внутреннюю окружность
        this.graphicsObjects["selectedCarGraphics"].lineStyle(2, 0x001122, 1);
        this.graphicsObjects["selectedCarGraphics"].beginFill(
                this.renderer.backgroundColor, 1);
        this.graphicsObjects["selectedCarGraphics"].drawCircle(xr,yr,rIn);
        this.graphicsObjects["selectedCarGraphics"].endFill();
        
    };


//Функция увеличения объекта при наведении курсора до 1.0
    function rcmScaleTo1_0(){
        this.scale.set(1.0);
        this.app.render();        
    };
    
//Функция уменьщения объекта при ухода курсора до 0.8
    function rcmScaleTo0_8(){
        this.scale.set(0.8);
        this.app.render();        
    };    
}());