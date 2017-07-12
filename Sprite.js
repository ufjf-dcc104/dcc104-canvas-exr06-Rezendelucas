function Sprite(){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.SIZE = 16;
  this.gx;
  this.gy;
  this.pose = 6;
  this.frame = 0;
  this.poses = [
    {row: 11, col:1, frames:8, v: 4}, // andando para  esquerda
    {row: 10, col:1, frames:8, v: 4}, // andando para cima
    {row: 9 , col:1, frames:8, v: 4}, // andando para direita
    {row: 8 , col:1, frames:8, v: 4}, // andando para baixo
    {row: 11, col:0, frames:1, v: 4}, // ???????
    {row: 1 , col:1, frames:1, v: 4}, // parado para esquerda
    {row: 3 , col:1, frames:1, v: 4}, // parado para direita
    {row: 10, col:1, frames:1, v: 4}, // parado para cima
    {row: 8 , col:1, frames:1, v: 4}, // parado para baixo
  ];
  this.images = null;
  this.imgKey;
  this.color;
}

Sprite.prototype.desenhar = function (ctx) {
  this.desenharQuadrado(ctx);
  this.desenharPose(ctx);
}

Sprite.prototype.desenharObjeto = function (ctx, img){
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.fillStyle = this.color;
  ctx.beginPath();
  //ctx.fillRect(-this.SIZE/2, -this.SIZE/2, this.SIZE, this.SIZE);
  ctx.arc(0, 0, this.SIZE/2, 0, 2*Math.PI);
  ctx.fill();
  ctx.closePath;
  ctx.restore();
  /*
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle*2*Math.PI/360);
  ctx.rotate(Math.PI/2);
  ctx.fillStyle = this.color;
  ctx.drawImage(img, -this.width/2, -this.height/2, this.width, this.height);
  if(this.debug){
    ctx.strokeStyle = "grey";
    ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  }
  ctx.restore();
  */
};

Sprite.prototype.desenharQuadrado = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  //ctx.fillRect(-this.SIZE/2, -this.SIZE/2, this.SIZE, this.SIZE);
  ctx.arc(0, 0, this.SIZE/2, 0, 2*Math.PI);
  ctx.fill();
  ctx.closePath;
  ctx.restore();
};

Sprite.prototype.desenharPose = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  this.images.drawFrame(ctx,
    this.imgKey,
    this.poses[this.pose].row,
    Math.floor(this.frame),
    -32,-56, 64
  );
  ctx.restore();
};

Sprite.prototype.localizacao = function(map){
  this.gx = Math.floor(this.x/map.SIZE);
  this.gy = Math.floor(this.y/map.SIZE);
}


Sprite.prototype.sensor = function(ctx, map){

  this.localizacao(map);
  // -- Minas --

  if(map.cells[this.gy-1][this.gx] == 5){
    map.quantMinas++;
  }
  if(map.cells[this.gy+1][this.gx] == 5){
    map.quantMinas++;    
  }  
  if(map.cells[this.gy][this.gx+1] == 5){
    map.quantMinas++;  
  }
  if(map.cells[this.gy][this.gx-1] == 5){
    map.quantMinas++;  
  }
  if(map.cells[this.gy-1][this.gx+1] == 5){
    map.quantMinas++;  
  }
  if(map.cells[this.gy+1][this.gx+1] == 5){
    map.quantMinas++;  
  }
  if(map.cells[this.gy-1][this.gx-1] == 5){
    map.quantMinas++;  
  }
  if(map.cells[this.gy+1][this.gx-1] == 5){
    map.quantMinas++;  
  } 

  // --Tesouros --

  if(map.cells[this.gy-1][this.gx] == 4){
    map.quantTesouros++;
  }
  if(map.cells[this.gy+1][this.gx] == 4){
    map.quantTesouros++;
  }  
  if(map.cells[this.gy][this.gx+1] == 4){
    map.quantTesouros++;  
  }
  if(map.cells[this.gy][this.gx-1] == 4){
    map.quantTesouros++;  
  }
  if(map.cells[this.gy-1][this.gx+1] == 4){
    map.quantTesouros++;  
  }
  if(map.cells[this.gy+1][this.gx+1] == 4){
    map.quantTesouros++;  
  }
  if(map.cells[this.gy-1][this.gx-1] == 4){
    map.quantTesouros++;  
  }
  if(map.cells[this.gy+1][this.gx-1] == 4){
    map.quantTesouros++;
  }
}


Sprite.prototype.mover = function (map, dt) {

  this.localizacao(map);
  //this.vy += 80*dt;

  //movimentação no eixo X
  if(this.vx>0 && map.cells[this.gy][this.gx+1] == 1){
      this.x += Math.min((this.gx+1)*map.SIZE - (this.x+this.SIZE/2),this.vx*dt);
  } else if(this.vx <0 && map.cells[this.gy][this.gx-1] == 1){
      this.x += Math.max((this.gx)*map.SIZE - (this.x-this.SIZE/2),this.vx*dt);
  }else {
      this.x = this.x + this.vx * dt;
  }

  //movimentação no eixo Y
  if(this.vy >0 && map.cells[this.gy+1][this.gx]==1){
    this.y += Math.min((this.gy+1)*map.SIZE - (this.y+this.SIZE/2),this.vy*dt);
  } else if( this.vy<0 && map.cells[this.gy-1][this.gx]==1){
      this.y += Math.max((this.gy)*map.SIZE - (this.y-this.SIZE/2),this.vy*dt);
  }else {
    this.y = this.y + this.vy*dt;
  }

  //atualiza a cell ocupada
  if(map.cells[this.gy][this.gx] != 2){
    map.cells[this.gy][this.gx] = 2;
  }

  //reseta o sensor para a nova cell
  map.quantMinas = 0;
  map.quantTesouros = 0;

  // acondiciona a passagem dos frames referentes as animações dos personagens
  this.frame += this.poses[this.pose].v*dt;
  if(this.frame>this.poses[this.pose].frames-1){
    this.frame = 0;
  }
  // identificação dos ID de objetos em cena
  // 1 == Paredes ou Obstáculo intransponível
  // 2 == Player
  // 3 == Região Oculta
};

Sprite.prototype.colisaoObjeto = function (ctx, map){
  
  this.localizacao(map);

  if(map.cells[this.gy][this.gx] == 4){
    map.tesourosColetados++;
  }
  if(map.cells[this.gy][this.gx] == 5){
    map.isGameOver = true;
  }

};

Sprite.prototype.perseguir = function (alvo) {
    var dx = alvo.x - this.x;
    var dy = alvo.y - this.y;
    var h = Math.sqrt(dx*dx+dy*dy);
    this.vx = 50*dx/h;
    this.vy = 50*dy/h;
    if(this.vy<0) this.pose = 3;
    if(this.vy>0) this.pose = 4;
    if(this.vx>0) this.pose = 0;
    if(this.vx<0) this.pose = 2;
};

Sprite.prototype.moverD = function (map, dt) {
  this.gx = Math.floor(this.x/map.SIZE);
  this.gy = Math.floor(this.y/map.SIZE);

  //movimentação no eixo X
  if(map.cells[this.gy][this.gx+1] == 1){
      this.x += Math.min((this.gx+1)*map.SIZE - (this.x+this.SIZE/2),this.vx*dt);
  } 

  if(map.cells[this.gy][this.gx+1] == 3){
      this.x += Math.min(map.cells[this.gy][this.gx + 1] + this.SIZE , map.cells[this.gy][this.gx + 1] + map.SIZE );
  }else {
      this.x = this.x + this.vx * dt;
  }
  animation(dt) 
  // identificação dos ID de objetos em cena
  // 1 == Paredes ou Obstáculo intransponível
  // 2 == Player
  // 3 == Região Oculta

};

