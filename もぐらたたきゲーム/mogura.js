

function clickButton(nanido) {
    var buttons = document.getElementsByClassName('button');
    for(var i = 0; i < 2; i++){
        buttons[0].remove();
    }
    document.getElementById('gamename').remove();

    var start = document.getElementsByClassName('notstarted');
    for(var i = 0; i < 2; i++){
        start[0].classList.add('wait');
        start[0].classList.remove('notstarted');
        
    }
    
    createHole(nanido);
    //最後の子要素として追加
    
    wait5minutes();
 
}
function createHole(nanido){
    
    for(var i = 0; i < 10; i++){
        var img = document.createElement('img');
        img.src = '0.png';
        img.id = "hole" + i;
        img.eventParam = i
        img.setAttribute('draggable', false);
        document.getElementById('screen').appendChild(img);
    }
    
}

count = 5;
function wait5minutes(){
    if(count > 0){
        document.getElementById('timer').textContent = count;
        count--;
        setTimeout(refreshwait, 1000);
    }else{
        document.getElementById('timer').remove();
        var start = document.getElementsByClassName('wait');
        for(var i = 0; i < 2; i++){
            start[0].classList.add('started');
            start[0].classList.remove('wait');
            
        }
        document.getElementById('audio').play();
        playSyokyuGame()
        countdownGame();
        
    }
    
}
function refreshwait(){
    wait5minutes();
}

countGame = 60;
function countdownGame(){
    if(countGame > 0){
        document.getElementById('progress').value = countGame;
        countGame--;
        setTimeout(refreshwaitGame, 100);
    }else{

        
    }
}
function refreshwaitGame(){
    countdownGame();
}


holes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
holes2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function playSyokyuGame(){
   
    if(holes2.includes(0) === true){    //ゲームが続いている限り
        var breaktime =  Math.floor( Math.random() * 1000 );
        var already = true;
        while(already  === true){
            var moguraNumber =  Math.floor( Math.random() * 10 );
            if(holes2[moguraNumber] != 0){
                already = true;
            }else{
                already = false;
                holes[moguraNumber] = 1;
                holes2[moguraNumber] = 1;
                var hole = document.getElementById("hole" + moguraNumber);
                hole.addEventListener("click", hit, false);
            }
         
        }
        
       
        setMogura(moguraNumber);
       
    }
    setTimeout(refreshAppear, breaktime);
    
}

function refreshAppear(){
    playSyokyuGame();
}





function setMogura(moguraNumber){
  
    document.getElementById("hole" + moguraNumber).src =  (holes[moguraNumber] -1) % 7 + ".png";
    
    var zyoutai = holes[moguraNumber];
    if(zyoutai > 0 && zyoutai != 5){
        setTimeout(function(){tmprefresh(moguraNumber);}, 100);
        
    } 
    
    if(zyoutai === 5){  
        setTimeout(function(){tmprefresh(moguraNumber);}, 1000);
    } 
}

function tmprefresh(moguraNumber){
    if(holes[moguraNumber] === 8){
        combo = 0;
        var hole = document.getElementById("hole" + moguraNumber);
        hole.removeEventListener("click", hit, false);
        document.getElementById("addScore").textContent = combo;
        
        holes[moguraNumber] = 0;
        holes2[moguraNumber] = 0;
    }
    if(holes[moguraNumber] % 8 > 0){
        holes[moguraNumber]++;
        holes2[moguraNumber]++;
        
    }
    
    if((holes[moguraNumber] -1) % 8 > 0){
        setMogura(moguraNumber);
    }
    
    
}


var combo = 0;





function hit(moguraNumber){
    combo++;
    document.getElementById("addScore").textContent = combo;
    var hole = document.getElementById("hole" + moguraNumber.target.eventParam);
    hole.removeEventListener("click", hit, false);
    document.getElementById((combo % 6) + 'kick').play();
    holes[moguraNumber.target.eventParam] = 0;
    setTimeout(function(){ holes2[moguraNumber.target.eventParam] = 0;}, 2500);
    document.getElementById("hole" + moguraNumber.target.eventParam).src = "hit.png";
    
    setTimeout(function(){
        setMogura(moguraNumber.target.eventParam)
        var hitedmogura = document.getElementById("hole" + moguraNumber.target.eventParam).src = "0.png";
        
        ;}, 1000);
}
