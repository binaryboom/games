// 96f3cf76d400

let gameRunning=false;
let userSeq=[];
let gameSeq=[];
let gameAudioSeq=[];
let level=0;

let btns = ["pink", "blue", "orange", "green"];


function levelUp(){
    stopAudio("bgAudio");
    userSeq=[];
    document.querySelector(".level").innerText=`Level : ${++level}`;
    if(level===1){
        playAudio("game-startAudio");
    }
    document.querySelector(".level").style.display="";
    let randIdx = Math.floor(Math.random() * 4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameAudioSeq.push(randColor);
    console.log(gameSeq);
    // botFlash(randBtn);
    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let randBtn = document.querySelector(`.${color}`);
            botFlash(randBtn);
            playAudio(`${color}Audio`);
        }, index * 1000); // Adjust timing as needed
    });
    
}

function botFlash(btn){
    btn.classList.add("bot-flash");
    setTimeout(() => {
        btn.classList.remove("bot-flash");
    }, 150);
}
function userFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(() => {
        btn.classList.remove("user-flash");
    }, 150);
}

function playAudio(audioId) {
    var audio = document.getElementById(audioId);
    if (audio) {
        audio.play();
    }
}
function stopAudio(audioId) {
    var audio = document.getElementById(audioId);
    if (audio) {
        audio.pause();
    }
}
function btnPress(){
    // console.log(this);
    userFlash(this);
    userSeq.push(this.id);
    if(this.id=="pink"){
        playAudio("pinkAudio");
    }
    if(this.id=="blue"){
        playAudio("blueAudio");
    }
    if(this.id=="orange"){
        playAudio("orangeAudio");
    }
    if(this.id=="green"){
        playAudio("greenAudio");
    }
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
    // playAudio("bgAudio");
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
        playAudio("levelCompleteAudio");
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
    playAudio("wrong-colorAudio");
    document.querySelector(".end-popup").style.display = "";
    document.querySelector(".start-popup").style.display = "none";
    document.querySelector(".level-clear").style.display = "none";
    document.querySelector(".level").style.display = "none";
    document.querySelector(".clicks").style.display = "none";
    document.querySelector(".score").style.display = "none";
    playAudio("gameOverAudio");
    setTimeout(()=>{
     playAudio("bgAudio");
    },2000);
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
        playAudio("game-startAudio");
        document.querySelector(".start-popup").style.display = "";
        document.querySelector(".start-btn").style.display = "none";
        gameRunning = true;
    }

    setTimeout(()=>{
        levelUp();
        btnListeners();
    },3100);
   
})

document.querySelector(".playBtn").addEventListener("click",function(){
    playAudio("bgAudio");
    this.style.display="none";
    document.querySelector("#game").style.display="";

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

