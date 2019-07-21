// game adapter in Code Explained 

var canvas = document.getElementById("canvas");
var ctx    = canvas.getContext("2d");
var body   = document.getElementById("body");

// ler imagens
var bird = new Image();
var bg   = new Image();
var fg   = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

// variaveis
var gap = 85;
var constant;

bird.src = "images/bird.png";
bg.src   = "images/bg_1.png";
fg.src   = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


var bX = 10;
var bY = 150;
var gravity = 1.5; /** Gravidade */

var score = 0;
// carregar arquivos de aúdio
var fly = new Audio();
var scor = new Audio();
var eletro = new Audio();
eletro.src = "audio/eletro.mp3";

fly.src = "audio/fly.mp3";
scor.src = "audio/score.mp3";


// Evento a ser ececutado quando qualquer tecla for pressionada
document.addEventListener("keydown", moveUp);
function moveUp() {
    bY -= 25;
    fly.play();
}
// coordenadas
var pipe = []; // Cria obj vazio
pipe[0] = {
    x : canvas.width,
    y : 0
};

function gameOver(){
   window.confirm("Game over.\nDeseja continuar  jogando?");
}


// Desenhar imagens
function draw(){
    ctx.drawImage(bg,0,0);
   
    // eletro.play();
    for(var i = 0; i < pipe.length; i++)
    {
        constant = pipeNorth.height+gap; /** Recebe o valor como altura da variavel gap */
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
       
        
        pipe[i].x--;
        if( pipe[i].x == 125)
        {
           pipe.push({
              x : canvas.width,
              y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
           });
        }
        // detectar colisão
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width  && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  canvas.height - fg.height){
            gameOver();
            
            location.reload(); // reload the page

        }
        if(pipe[i].x == 5){
           score++;
           scor.play();
        }
    }
   
    ctx.drawImage(fg,0,canvas.height - fg.height);
    // ctx.drawImage(fg,0,canvas.height - fg.height);
    ctx.drawImage(bird,bX,bY);
    bY += gravity;
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,canvas.height-20);
    requestAnimationFrame(draw);
}

// chamada da função p/ desenhar elementos
draw();