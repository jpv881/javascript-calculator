var buttons = document.getElementsByClassName("cal");
var up = document.getElementById("up");
var down = document.getElementById("down");
var ac = document.getElementById("ac");
var c = document.getElementById("c");
var equals = document.getElementById("equals");

//var chars = [];
var operators = [];

var all;

for(var i=0;i<buttons.length;i++){
    buttons[i].onclick = function(){
        clicked(this);
    };
    
    function clicked(val){
        var next = true;
        if(operators.length==0 && /\=|\+|\-|x|\/|\./.test(val.firstChild.innerHTML)) next = false;
        if(operators.length>0 && /\=|\+|\-|x|\//.test(val.firstChild.innerHTML) && /\+|\-|x|\//.test(operators[operators.length-1])) next = false;
        if(operators.length>0 && /\./.test(val.firstChild.innerHTML) && /\./.test(operators[operators.length-1])) next = false;
        if(/\./.test(operators[operators.length-1]) && val.firstChild.innerHTML===".") next =false;
        last = val.firstChild.innerHTML;
        
        if(next){
            writeDown(val.firstChild.innerHTML);
            up.innerHTML=operators[operators.length-1];
        }
        
    }
    
    c.onclick = function(){
        ce();
    };
    
    ac.onclick = function(){
        operators = [];
        up.innerHTML = 0;
        down.innerHTML = 0;
    };
    
    equals.onclick = function(){
        var next = true;
        if(operators.length < 3) next = false;
        if(/\+|\-|x|\//.test(operators[operators.length-1])) next = false;
        if(next){
            resolve();
        }
    }
    
    function writeDown(val){
        if(/\+|\-|x|\//.test(val)){
            operators.push(val);
        }else{
            if(operators.length==0){
                operators.push(val);
            }else{
                if(/\+|\-|x|\//.test(operators[operators.length-1])) operators.push(val);
                else operators[operators.length-1]=operators[operators.length-1]+val;
            }
        }
        
        all = operators.join("");
        down.innerHTML= all;
    }
    
    function ce(){

        if(operators.length>0) operators.pop();

        all = operators.join("");
        down.innerHTML= all;
        up.innerHTML = 0;
    }
    
    function resolve(){
        var pos;
        var result;
        var end = true;
        var dividedBy0 = false;
        
        if(operators.indexOf("x")!=-1){
            end = false;
            pos=operators.indexOf("x");
            result = Number(operators[pos-1]*Number(operators[pos+1]));
            operators[pos-1]=result;
            operators.splice(pos,2);  
        }else if(operators.indexOf("/")!=-1){
            end = false;
            pos=operators.indexOf("/");
            if(Number(operators[pos+1])==0){
                dividedBy0=true;
            }else{
               result = Number(operators[pos-1]/Number(operators[pos+1]));
                operators[pos-1]=result;
                operators.splice(pos,2); 
            }   
        }else if(operators.indexOf("+")!=-1){
            end = false;
            pos=operators.indexOf("+");
            result = (Number(operators[pos-1])+(Number(operators[pos+1])));
            operators[pos-1]=result;
            operators.splice(pos,2);
        }else if(operators.indexOf("-")!=-1){
            end = false;
            pos=operators.indexOf("-");
            result = Number(operators[pos-1]-Number(operators[pos+1]));
            operators[pos-1]=result;
            operators.splice(pos,2);
        }
        
        if(!dividedBy0){
            if(!end){
                resolve();
            }else{
                if(operators[0] % 1 !== 0) operators[0] = operators[0].toFixed(2);
                up.innerHTML=operators[0];
                all+="="+operators[0];
                down.innerHTML=all;
                operators = [];
            }
        }  
        
    }
    
}