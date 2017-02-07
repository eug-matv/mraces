/* rc-car.js
 * Автор: Матвеенко Е.А.
 * Дата: 03.02.2017
 * Модель описания движения автомобиля по трассе.
 * Описание модели автомобиля: 
 * 1) Для простоты будем пока считать, что автомобиль имеет форму 
 * прямоугольника, соответствующего размеру спрайта для организации ландшафта.
 * Отображаемый спрайт для построения ландшафта или дороги в пикселях имеет 
 * 128x128 
 * Значение размеров автомобилий несколько меньще NxM пикселей. Тогда для 
 * модели будут размеры N/128.0 x M/128.0.
 * 2) Базовая точка автомобиля: задняя точка, размещенияя в задней части 
 * спрайта автомобиля. Пусть размеры автомобиля в системе координат модели
 * l x w --- где l - длина автомобиля, w - его ширина. 
 * Характеристиками автомобиля являются в определенный момент времени: 
 * 2.1) координаты середины задней части автомобиля . Кроме этого, для автомобиля 
 * сопровождаются следующие точки в координтах относительно базовой точки:
 * (0, -w/2) - левая заднаяя часть, (0, w/2) - правая заднаяя часть.
 * (-l, -w/2) - левая передняя часть автомобиля, (-l, 0) - середина передней 
 * части автомобиля, (-l, w/2) - правая часть автомобиля.
 * 2.2) скорость движения автомобиля. Для удобства будем считать, что автомобиль 
 * движется в направлении от (0,0) до (-l, 0). Скорость задается как количество
 * тайлов в секунду. Скорость будет разбита на 3 сооставляющие: модуль скорости
 * в тайлах в секунду, а также угол в радианах направления автомобиля в радианах 
 * относительно оси x в системе координат тайлов. Если угол angl = 0 радианов,
 * то автомобиль движется в порядке увеличения x, при неизменяемом y, и тд. 
 * Таким образом составляющие скорости равны: vx = v*cos(angl); vy = v*sin(ang).
 * направление авто: вперед или назад.
 * 2.3) ускорение a (если нажата клавиша вперед) или замедление, если нажата 
 * клавиша назад.
 * 2.4) скорость вращение в радианах в секунда для поворота влево или в право.
 *  
 * 3. Модель движения: 
 * 3.1. Обновление координат происходит через равные интервалы времени:
 * x(n) = x(n-1)+v(n)*cos(ang(n))*(t(n)-t(n-1));
 * y(n) = y(n-1)+v(n)*sin(ang(n))*(t(n)-t(n-1));
 * 
 * 3.2. Обновление скорости происходит при нажатой клавише вперед для увеличения
 * скорости или назад для уменьшения скорости. 
 * v(n) = v(n-1)+ a(n)*(t(n)-t(n-1))
 * 
 * 3.3 Обновление значения направления автомобиля, для поворота 
 * направо или налево
 * ang(n) = rotv(n)*(t(n) - t(n-1))
 * 
 * 
 *
 *  */


"use strict";

(function  (){
    
    window.RaceCar = {
        Models: {},
        View: {}
    },
    
    RaceCar.Models.Car = Backbone.Model.extend(
            {
                defaults: {
                    "pos": {
                        "x": 0,
                        "y": 0
                    },                    
                    "v": {
                        "v": 0,
                        "isReverse": false
                    },
                    "angle" : Math.PI*3.0/2.0    
                },
                
                setNewState: function(vChange, angleChange, dTime){
//Проверим определен ли roadMap
                    if(!this.has("roadMap")){
//Попробуем установить из глобальной переменной
                        this.set({"roadMap": window.roadMap});
                    }
                    
                    var angle = this.get("angle");
                    
                    angle += angleChange*dTime;
                    if(angle<0){
                        angle += Math.PI*2.0;
                    }
                    
                    if(angle >= Math.PI*2){
                        angle -= Math.PI*2.0;
                    }
                    
                    var v = this.get("v");
                    var newV = v.v;
                    var newReverse = v.isReverse;
                    var newX, newY;
                    
                    if(v.isReverse){
                        newV -=  vChange*dTime;
                        if(newV < 0)
                        {
                            newReverse = false;
                            newV = -newV;
                        }    
                        
                    }else{
                        newV +=  vChange*dTime;
                        if(newV < 0)
                        {
                            newReverse = true;
                            newV = -newV;
                        }
                    }
                    
                    if(newReverse){
                        newX = this.get("pos")["x"]-newV*Math.cos(angle);
                        newY = this.get("pos")["y"]-newV*Math.sin(angle);
                    }else{
                        newX = this.get("pos")["x"]+newV*Math.cos(angle);
                        newY = this.get("pos")["y"]+newV*Math.sin(angle);
                    }
                        
                    
                }   
                
            }
            
    );
    
    
}());                                                                                                                                                                                                                                                                                                                           