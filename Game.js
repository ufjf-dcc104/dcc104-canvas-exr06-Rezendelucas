var canvas;
var ctx;
var map;
var pc;
var dt;
var images;
var anterior = 0;
var frame = 0;

function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 700;
  canvas.height = 480;

  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images.load("pc","pc.png");
  images.load("bomb","bomb.png");
  images.load("tesouro","tesouro.png");


  pc = new Sprite();
  pc.images = images;
  //cria o level
  map = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map.images = images;
  map.setCells([
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,5,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,4,3,3,3,3,4,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,4,3,3,5,3,3,3,1],
    [1,3,4,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,5,3,3,3,3,3,5,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],pc);
  initControls();
  requestAnimationFrame(passo);
}


function passo(t){
  dt = (t-anterior)/1000;
  requestAnimationFrame(passo);
  ctx.clearRect(0,0, canvas.width, canvas.height);


  if(!map.isGameOver){
      if(!map.isVictory){

        //Testes
        pc.colisaoObjeto(ctx, map);
        
        //Verificacao
        //map.tempoAcabou();
        map.isVitoria();

        //Movimentacao e Verificacao
        pc.mover(map, dt);
        pc.sensor(ctx, map);

        //Render
        map.showInformations(ctx);
        map.desenhar(ctx,images);
        pc.desenhar(ctx);


      }else{

        //Render
        map.showInformations(ctx);
        map.desenhar(ctx);//, images);
        pc.desenhar(ctx);

        // -- Vitória -- 
        ctx.fillStyle = "blue";
        ctx.fillText("Vitória", 500, 225);
      }
  }else{
    
    //Render
    map.showInformations(ctx);
    map.desenhar(ctx);
    pc.desenhar(ctx);

    // -- Fim de Jogo --
    ctx.fillStyle = "blue";
    ctx.fillText("Game Over", 500, 225);
  }

  anterior = t;
  frame = (frame<9)?frame:1;
  frame+=2*dt;
}


function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
      case 37:   //esquerda
        pc.vx = -100;
        pc.vy = 0;
        pc.pose = 2;
        e.preventDefault();
        break;
      case 38:   //para baixo
        pc.vy = -100;
        pc.vx = 0;
        pc.pose = 3;
        e.preventDefault();
        break;
      case 39:    //direita
        pc.vx = 100;
        pc.vy = 0;
        pc.pose = 0;
        break;
      case 40:    // para cima
        pc.vy = 100;
        pc.vx = 0;
        pc.pose = 1;
        e.preventDefault();
        break;
      default:

    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 37: //esquerda
        pc.vx = 0;
        pc.pose = 5;
        break;
      case 39:  //direita
        pc.vx = 0;
        pc.pose = 6;
        break;
      case 38: // para baixo
        pc.vy = 0;
        pc.pose = 8;
        break;
      case 40:  // para cima
        pc.vy = 0;
        pc.pose = 7;
        break;
      default:

    }
  });
}
