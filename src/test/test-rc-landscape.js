/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var tiles = new Landscape.Tiles();


/*Проверим а для каждой ли пары можно найти тех кто снизу*/
for(var i = 0; i < 28; i++){
    for(var j = 0; j < tiles.sprites[i].rightNeighbourIndexes.length;j++){
        var ok = false;
        var i1 = tiles.sprites[i].rightNeighbourIndexes[j];
        for(var k = 0; k < tiles.sprites[i].bottomNeighbourIndexes.length;k++){
            var i2 = tiles.sprites[i].bottomNeighbourIndexes[k];
            for(var l = 0; 
                l < tiles.sprites[i1].bottomNeighbourIndexes.length; l++){
                i3 = tiles.sprites[i1].bottomNeighbourIndexes[l];
            //осуществляем проверку i, i1, i2, i3
                if(Landscape.inArray(tiles.sprites[i2].rightNeighbourIndexes,
                        i3)){
                        ok=true;
                        break;
                }
            }
            if(ok)break;
        }
        if(!ok)
        {
            console.log("para "+i.toString()+" and "+i1.toString()+" is wrong!");
        }    
    }
}