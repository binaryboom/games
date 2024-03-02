// 96f3cf76d400

let gameRunning=false;
let userSeq=[];
let gameSeq=[];
let level=0;

let btns = ["pink", "blue", "orange", "green"];

function levelUp(){
    userSeq=[];
    document.querySelector(".level").innerText=`Level : ${++level}`;
    document.querySelector(".level").style.display="";
    let randIdx = Math.floor(Math.random() * 4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    botFlash(randBtn);
}

function botFlash(btn){
    btn.classList.add("bot-flash");
    setTimeout(() => {
        btn.classList.remove("bot-flash");
    }, 500);
}
function userFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(() => {
        btn.classList.remove("user-flash");
    }, 500);
}

function btnPress(){
    // console.log(this);
    userFlash(this);
    userSeq.push(this.id);
    console.log(userSeq);
    validateColor(userSeq.length-1);
}

function btnListeners(){
    let allBtns=document.querySelectorAll(".btn");
    for(buttons of allBtns){
        buttons.addEventListener("click", btnPress);
    }
}

function retry(){
    gameRunning=false;
    userSeq=[];
    gameSeq=[];
    level=0;
    document.querySelector(".end-popup").style.display = "none";
    document.querySelector(".retry-btn").style.display = "none";
    document.querySelector(".start-popup").style.display = "";
    document.querySelector(".level-clear").style.display = "none";
    // document.querySelector(".level").style.display = "";
    document.querySelector(".gameSetup").style.display = "";
    setTimeout(()=>{
        // document.querySelector(".level-clear").style.display = "none";
        document.querySelector(".level").style.display = "";
        levelUp();
    },3100);
}

function validateColor(idx){
// let idx= level-1;
if(userSeq[idx]===gameSeq[idx]){
    // console.log(`same color`);
    if(userSeq.length==gameSeq.length){
        let score=document.querySelector(".score");
        score.innerText=`${level*10} Points`
        score.style.display="";
        let levelClear =document.querySelector(".level-clear");
        levelClear.innerText=`Level ${level} Cleared !!`;
        levelClear.style.display="";
        setTimeout(() => {
            levelClear.style.display="none";
        }, 2000);
        setTimeout(levelUp,2000);
    }
}
else{
    // game over
    document.querySelector(".end-popup").style.display = "";
    document.querySelector(".start-popup").style.display = "none";
    document.querySelector(".level-clear").style.display = "none";
    document.querySelector(".level").style.display = "none";
    document.querySelector(".clicks").style.display = "none";
    document.querySelector(".score").style.display = "none";
    if(level===1){
        document.querySelector(".end-popup").innerText = `Game Over !! \nYour Score is 0 🤡`;
    }
    else{
        if(level===0){
            document.querySelector(".end-popup").innerText = `Game Over !! \nYour Score is 0 🤡`;
        }
        else{
            document.querySelector(".end-popup").innerText = `Game Over !! \nYour Score is ${(level-1)*10} Points 🔥`;
        }
    }
    document.querySelector(".gameSetup").style.display = "none";
    let retryBtn =document.querySelector(".retry-btn");
    retryBtn.style.display="";
    retryBtn.addEventListener("click",retry);
}
}

startBtn=document.querySelector(".start-btn");
startBtn.addEventListener("click",function(){
    if(gameRunning==false){
        document.querySelector(".start-popup").style.display = "";
        document.querySelector(".start-btn").style.display = "none";
        gameRunning = true;
    }
    
    setTimeout(()=>{
        levelUp();
        btnListeners();
    },3100);
   
})
// document.addEventListener("keypress",function(){
//     if(gameRunning==false){
//         document.querySelector(".start-popup").style.display = "";
//         document.querySelector(".start-btn").style.display = "none";
//         gameRunning = true;
//     }
    
//     setTimeout(()=>{
//         levelUp();
//         btnListeners();
//     },3100);
   
// })
