var drawCount = 0;    //カードを引いた回数

var countChangeSwich1 = 0;    //オンオフスイッチ（低速）を変更した回数
var countChangeSwich2 = 0;  

var refreshcount1 = 0;
var repeatcount1 = 0;

var already5card = 0;    //ファイブカードがでたら1になる
var already4card = 0;
var alreadyfull = 0;
var already3card = 0;
var already2pare = 0;
var already1pare = 0;
var already0card = 0;


function pushButton(){    //「1回引く」のボタンを押すと実行される。
  
    var pngNumber = drawCard();       //カードを5枚引く
    
    var arrayOfMovingPngNumber = decideMoveOrNot(pngNumber); //動く（強調されるカードを決める）
    var roll = judgeRoll(pngNumber);        //   引いたカードを引数として渡して役割を決める
    displayCard(pngNumber, arrayOfMovingPngNumber);       //カードを表示させる。
    displayRoll(roll);                   //役割を表示する
    document.getElementById("kaisuu").textContent = "" + drawCount + "\t\t\t回目";   //回数を表示する。
   
}

function changeOnOff1(){     //自動スイッチ（低速）のonOffを変えると実行される
    countChangeSwich1++;
    
    
    repeat1();
}


function repeat1(){
    repeatcount1++;
    
    if(countChangeSwich1 % 2 == 1){
        
        pushButton();
        
        refresh1();
       
        if(repeatcount1  != refreshcount1){
            empty();
        }
    }

}
function refresh1(){              //0.8秒待ってrepeat1()が実行される。
   
    refreshcount1++;
    setTimeout(repeat1, 800);
}

function changeOnOff2(){
    countChangeSwich2++;
    
    
    repeat2();
}


function repeat2(){
    if(countChangeSwich2 % 2 == 1){
        
        pushButton();
        
        refresh2();
    
    }
}
function refresh2(){
    setTimeout(repeat2, 10);
}


function empty(){
    refreshcount1++;
    setTimeout(empty2, 1000);
}

function empty2(){
   
}

function drawCard(){
      
    drawCount++;

    //1: スペードの1   14：クラブの1  27: ダイヤの1  40：ハートの1   53：ジョーカー
    // var arrayOfPngNumber = [27, 1, 53, 40, 14];    //function judgeRollの場合1 ファイブカード（テスト用）
    // var arrayOfPngNumber = [1, 14, 27, 4, 53];     //function judgeRollの場合2 フォーカード
    // var arrayOfPngNumber = [1, 14, 17, 4, 53];     //function judgeRollの場合3 フルハウス
    // var arrayOfPngNumber = [1, 14, 7, 4, 53];     //function judgeRollの場合4 スリーカード
    // var arrayOfPngNumber = [1, 2, 3, 7, 53];       //function judgeRollの場合5  ワンペア
    // var arrayOfPngNumber = [28, 2, 15, 41, 1];     //function judgeRollの場合6  フォーカード
    // var arrayOfPngNumber = [27, 1, 14,  2, 15];     //function judgeRollの場合7 フルハウス
    // var arrayOfPngNumber = [27, 1, 14,  2, 16];   //function judgeRollの場合8  スリーカード
    // var arrayOfPngNumber = [1, 14, 2, 15, 5];       //function judgeRollの場合9 ツーペア 
    // var arrayOfPngNumber = [6, 19, 3, 4, 5];        //function judgeRollの場合10 ワンペア
    // var arrayOfPngNumber = [1, 2, 3, 4, 5];       //function judgeRollの場合11 ノーペア
    

 
    var arrayOfPngNumber = createRandomNumber();
    var sortedArray = sort(arrayOfPngNumber);  //ソート
    return sortedArray;
    
    

}



function displayCard(arrayOfPngNumber, arrayOfMovingPngNumber){
    //この関数でカードを表示させてimgタグのclass属性に"move"を追加する。

    for(var i = 0; i < 5; i++){
        
        if(drawCount> 1){
            document.getElementById(i + "card").remove();
        }
        
        var nameOfPng = "./picture/" + arrayOfPngNumber[i] +".png";
        var element = document.createElement("img"); 
        element.id = i + "card";
        if(arrayOfPngNumber[i] === 53){
            var cardNumber = 14;
        }else{
            var cardNumber = (arrayOfPngNumber[i] -1 ) % 13 + 1;
        }
        

        for(var j = 0; j < arrayOfMovingPngNumber.length; j++){
            if(cardNumber === arrayOfMovingPngNumber[j] ){
                element.classList.add("move");
            }
        }  
        
        element.width = "150"
        document.getElementById("listOfCard").appendChild(element);
        document.getElementById(i + "card").src = nameOfPng;
    }
    
}



function createRandomNumber(){
    
    //返り値：1から53までの数字の配列です。数字の重複はありません。
    
   
    var arrayOfPngNumber = new Array(0);
    while(arrayOfPngNumber.length < 5){
        var pngNumber = Math.floor(Math.random() * 53) + 1;
        if (arrayOfPngNumber.indexOf(pngNumber) == -1){   //
            arrayOfPngNumber.push(pngNumber);      
        }  
    }
    
    return arrayOfPngNumber;
  
}


function sort(array){
    array.sort(
        function(a,b){
            if(a != 53){
                var a = (a-1) % 13 + 1;
            }
            if(b != 53){
                var b = (b-1) % 13 + 1;
            }
                
          return (a < b  ? -1 : 1);
        }
      );
   
    return array;
  
}



function judgeRoll(arrayOfPngNumber){
    var arrayOfCardNumber = new Array(0);
    
    for(var i = 0; i < 5; i++){
        if(arrayOfPngNumber[i] === 53){
            arrayOfCardNumber.push(14);
        }else{
            arrayOfCardNumber.push((arrayOfPngNumber[i] - 1) % 13 + 1);
        }
        
    }
    var counts = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];  //counts[0] は1が出た回数を表す。

    for(var i = 0; i < 5; i++){                  //counts[13]はジョーカーが出た回数を表す。
       
        counts[arrayOfCardNumber[i] - 1]++;
    }
  
    if(counts[13] === 1){              //ジョーカーが1回出た場合（ジョーカーは多くても1回しか出ない）
        
        
        if(counts.indexOf(4) >= 0){
            return "ファイブカード";            //場合1とする
            
        }else if(counts.indexOf(3) >= 0){
            return "フォーカード";              //場合2とする
        }else if(counts.indexOf(2) >= 0){
            counts.splice(counts.indexOf(2), 1);
            if(counts.indexOf(2) >= 0){
                return "フルハウス";           //場合3とする
            }else{
                return "スリーカード"          //場合4とする
            }                       
            
        }else{
            
                return "ワンペア";             //場合5とする
            
           
        }
    }else{
        if(counts.indexOf(4) >= 0){
            return "フォーカード";             //場合6とする
        }else if(counts.indexOf(3) >= 0){
            counts.splice(counts.indexOf(3), 1);
            if(counts.indexOf(2) >= 0){
                return "フルハウス";          //場合7とする
            }else{
                return "スリーカード"          //場合8とする
            }
            
        }else if(counts.indexOf(2) >= 0){
            counts.splice(counts.indexOf(2), 1);
            if(counts.indexOf(2) >= 0){
                return "ツーペア";           //場合9とする
            }else{
                return "ワンペア"             //場合10とする
            }
            
        }else{
            return "ノーペア";                //場合11とする
        }
    }
  
    

}

function decideMoveOrNot(arrayOfPngNumber){  //動く（強調）されるカードーの番号を決める。（pngの番号ではない）

    var movingCardNumber = new Array(0);

    if(arrayOfPngNumber[4] === 53){
        movingCardNumber.push(14);
        arrayOfPngNumber.splice(53, 1);
        var counts = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];  

        for(var i = 0; i < 4; i++){                  
            
            counts[(arrayOfPngNumber[i] -1 ) % 13 + 1]++;
        }
        if(counts.indexOf(2) < 0 && counts.indexOf(3) < 0 && counts.indexOf(4) < 0 ){
            movingCardNumber.push((arrayOfPngNumber[3] - 1) % 13 + 1 );
      
            
        }
        arrayOfPngNumber.push(54);
    }
   
    for(var i = 0; i < 5; i++){
        if(arrayOfPngNumber[i] % 13 + 1 === arrayOfPngNumber[i + 1] % 13 + 1){
            movingCardNumber.push((arrayOfPngNumber[i] -1 ) % 13 + 1 );
            
        }
               
    }
   
   return movingCardNumber;
}

function displayRoll(roll){
    //htmlのクラス属性に"shine"と"already"を追加
    //shine属性を追加し要素をaタグを強調させる
    var element5  = document.getElementById("ファイブカード");
    
    var element4  = document.getElementById("フォーカード");
    var element6  = document.getElementById("フルハウス");
    var element3  = document.getElementById("スリーカード");
    var element2  = document.getElementById("ツーペア");
    var element1  = document.getElementById("ワンペア");
    var element0  = document.getElementById("ノーペア");
    element6.classList.remove("shine");
    element5.classList.remove("shine");
    element4.classList.remove("shine");
    element3.classList.remove("shine");
    element2.classList.remove("shine");
    element1.classList.remove("shine");
    element0.classList.remove("shine");
    
    
    if(roll === "ファイブカード"){
       element5.classList.add("shine");
    
       if(already5card === 0){
        element5.classList.add("already"); 
       }
    }else if(roll === "フォーカード"){
        element4.classList.add("shine");
        if(already4card === 0){
            element4.classList.add("already"); 
        }
        
    }else if(roll === "フルハウス"){
        
        element6.classList.add("shine");
        if(alreadyfull === 0){
            element6.classList.add("already"); 
           }
        
    }else if(roll === "スリーカード"){
        
        element3.classList.add("shine");
        if(already3card === 0){
            element3.classList.add("already"); 
           }
        
    }else if(roll === "ツーペア"){
        
        element2.classList.add("shine");
        if(already2pare === 0){
            element2.classList.add("already"); 
           }
        
    }else if(roll === "ワンペア"){
        
        element1.classList.add("shine");
        if(already1pare === 0){
            element1.classList.add("already"); 
           }
        
    }else{
        
        element0.classList.add("shine");
        if(already0card === 0){
            element0.classList.add("already"); 
            already0card++;
           
        }
    }
}
