/* rc-main.js - главный модуль программы
 * Автор: Матвеенко Е.А.
 * Дата: 14.02.2017
 * Главный модуль программы обеспечивает различные состояния отображаемого 
 * поля.
 * Опишем состояния:
 * 0) mainMenuState - главное меню программы. 
 * В главном меню можно либо закрыть окно, либо перейти на состояние запуска 
 * игры 1)gameState,
 *  либо почитать инструкцию 2) manualState; либо перейти на просмотр 
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
    
    window.Main = {};
    
/*Опишем состояния программы*/    
    Main.mainMenuState = 0;  //Отображения главного меню
    Main.gameState = 1;      //Режим игры
    Main.manualState = 2;    //Режим отображения инструкции
    Main.resultsState = 3;    //Режим отображения результатов
    
    
    Main.App = function(){
        
//Установим текущее состояние Главное меню         
       this.state =  Main.mainMenuState;
       
       
//Установим отображатель, равный null       
       this.renderer = null; 
      
//Установим список объектов с которыми будем работать
       this.graphicsObjects = {}; 
        
    };
    
    
    Main.App.prototype.viewMainMenu = function(){
        
        var textHeader;
        
        if(window.wasGotTextureAtlas){
            textHeader = 'Программа M-RACES-гонки';
        }else{
            textHeader = 'Программа M-RACES-гонки - идет загрузка';
        }
        
//Установим состояние главного меню        
        this.state = Main.mainMenuState;
        if(!!this.renderer){
//Очистим graphicsObjects
            for (var key in this.graphicsObjects){
                if(this.graphicsObjects[key].destroy){
                    this.graphicsObjects[key].destroy();
                }else{
                    delete this.graphicsObjects[key];
                }
            }
            this.graphicsObjects = {};
            this.renderer.destroy(true);
        }
//Определим размеры
        var client_w = document.documentElement.clientWidth - 30;
        var client_h = document.documentElement.clientHeight - 30;
        
//Создадим теперь renderer
        this.renderer =  new window.PIXI.autoDetectRenderer(client_w, client_h,
                {backgroundColor: 0xA02020});
        
        document.body.appendChild(this.renderer.view);
       
        this.graphicsObjects['stage'] = new window.PIXI.Container();
        
        
        
//Создадим заголовок вверху страницы
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
    


        this.graphicsObjects["header"] = 
          new window.PIXI.Text(textHeader, style);
        
        this.graphicsObjects["header"].x = 
           (this.renderer.width - this.graphicsObjects["header"].width) / 2;
        this.graphicsObjects["header"].y = 30;
        
        this.graphicsObjects["stage"].addChild(this.graphicsObjects["header"]);
        
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
          new window.PIXI.Text(manualText, style);
        
        this.graphicsObjects["manual"].x = 10;
        this.graphicsObjects["manual"].y = 100;
        this.graphicsObjects["manual"].width = this.renderer.width-20;
        
        this.graphicsObjects["stage"].addChild(this.graphicsObjects["manual"]);
        
        if(!window.wasGotTextureAtlas){
            this.renderer.render(this.graphicsObjects['stage']);
            return;
        }    

//нарисуем кнопки        

//Кнопка для старта программы
        this.graphicsObjects["startButton"] = 
                new window.PIXI.Sprite.fromFrame ('play.png');
        
        this.graphicsObjects["startButton"].x = this.renderer.width/5 - 50;
        this.graphicsObjects["startButton"].y = this.renderer.height - 120;
        this.graphicsObjects["startButton"].interactive = true;
        this.graphicsObjects["startButton"].buttonMode = true;
        this.graphicsObjects["startButton"].on("pointerdown", function(){
           alert("startButton's click"); 
        });
        this.graphicsObjects["stage"]
                .addChild(this.graphicsObjects["startButton"]);
        
        
        /*var stb = new window.PIXI.Sprite.fromFrame ('play.png');
        this.graphicsObjects["stage"].
                addChild(stb);*/
        
        this.graphicsObjects["selectCarButton"] = 
                new window.PIXI.Sprite.fromFrame ('tool.png');
        
        this.graphicsObjects["selectCarButton"].x = 
                     2 * this.renderer.width/5 - 50;
        this.graphicsObjects["selectCarButton"].y = this.renderer.height - 120;
        this.graphicsObjects["selectCarButton"].interactive = true;
        this.graphicsObjects["selectCarButton"].buttonMode = true;
        this.graphicsObjects["selectCarButton"].on("pointerdown", function(){
           alert("selectCarButton's click"); 
        });
        this.graphicsObjects["stage"]
                .addChild(this.graphicsObjects["selectCarButton"]);
        
/*Добавим кнопку результатов по гонкам*/        
        this.graphicsObjects["bestResultsButton"] = 
                new window.PIXI.Sprite.fromFrame ('statistics.png');
        
        this.graphicsObjects["bestResultsButton"].x = 
                     3 * this.renderer.width/5 - 50;
        this.graphicsObjects["bestResultsButton"].y = this.renderer.height - 120;
        this.graphicsObjects["bestResultsButton"].tag = "dssdsdsd";
        this.graphicsObjects["bestResultsButton"].interactive = true;
        this.graphicsObjects["bestResultsButton"].buttonMode = true;
        this.graphicsObjects["bestResultsButton"].on("pointerdown", function(){
           alert("bestResultsButton's click"); 
        });
        this.graphicsObjects["stage"]
                .addChild(this.graphicsObjects["bestResultsButton"]);
        
        
        
        this.renderer.render(this.graphicsObjects['stage']);
        this.renderer.render(this.graphicsObjects['stage']);
        
    };
    
}());