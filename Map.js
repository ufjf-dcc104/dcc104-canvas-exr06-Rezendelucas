function Map(rows, collumns) {
  this.SIZE = 32;
  this.vetMinas = [];
  this.vetTesouros = [];
  this.quantTesouros = 0;
  this.quantMinas = 0;
  this.totalDeTesouros = 0;
  this.tesourosColetados = 0;
  this.isVictory = false;
  this.isGameOver = false;
  this.images;
  this.cells = [];
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx, imagelib) {
  for (var i = 0; i < this.vetTesouros.length; i++) {
      this.vetTesouros[i].desenharObjeto(ctx);
    }
  for (var i = 0; i < this.vetMinas.length; i++) {
      this.vetMinas[i].desenharObjeto(ctx);
    }

  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c]==1){
        ctx.fillStyle = "brown";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else if(this.cells[r][c] == 3){
        ctx.fillStyle = "green";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.strokeStyle = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else if(this.cells[r][c] == 2){
        // caso o player esteja nesta cell ela nao será preenchida
        ctx.strokeStyle = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else if(this.cells[r][c] == 4){
        ctx.fillStyle = "green";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.strokeStyle = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
     }else if(this.cells[r][c] == 5){
        ctx.fillStyle = "green";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.strokeStyle = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else{};
    }
  // identificação dos ID de objetos em cena
  // 1 == Paredes ou Obstáculo intransponível
  // 2 == Player
  // 3 == Região Oculta
  // 4 == tesouro
  // 5 == bomb
  }
};

Map.prototype.showInformations = function(ctx){
  
  // -- Minas --
  ctx.font="20px Verdana";
  ctx.fillStyle = "red";
  ctx.fillText("Minas: " + this.quantMinas, 450, 80);
  
  // -- Tesouros --
  ctx.fillStyle = "green";
  ctx.fillText("Tesouros: " + this.quantTesouros, 450, 100);

  // -- Pontuação --
  ctx.fillStyle = "purple";
  ctx.fillText("Tesouros coletados: " + this.tesourosColetados, 450, 120);
  
}

Map.prototype.getCells = function () {
    for (var r = 0; r < this.cells.length; r++) {
      for (var c = 0; c < this.cells[0].length; c++) {
        console.log(r);
        console.log(c);
      }
    }
};

Map.prototype.setCells = function (newCells, pc) {
  for (var i = 0; i < newCells.length; i++) {
    for (var j = 0; j < newCells[i].length; j++) {
      switch (newCells[i][j]) {
        case 1:
          this.cells[i][j] = 1;
          break;
        case 2:
          this.cells[i][j] = 2;
          pc.x = (i+0.5)*this.SIZE;
          pc.y = (j+0.5)*this.SIZE;
          pc.imgKey = "pc";
          break;
        case 3:
          this.cells[i][j] = 3;
          break;
        case 4:
          this.cells[i][j] = 4;
          tesouros = new Sprite();
          tesouros.y = (i+0.5)*this.SIZE;
          tesouros.x = (j+0.5)*this.SIZE;
          tesouros.imgKey = "tesouro"
          tesouros.color = "Blue";
          this.vetTesouros.push(tesouros);
          this.totalDeTesouros++;
          break;
        case 5:
          this.cells[i][j] = 5;
          bombas = new Sprite();
          bombas.y = (i+0.5)*this.SIZE;
          bombas.x = (j+0.5)*this.SIZE;
          bombas.imgKey = "bomb";
          bombas.color = "red";
          this.vetMinas.push(bombas);
          break;
        default:
          this.cells[i][j] = 3;
      }
    }
  }
};

Map.prototype.isVitoria = function() {
  if(this.tesourosColetados == this.totalDeTesouros){
    this.isVictory = true;
  }
};

Map.prototype.GameOver = function() {

};

Map.prototype.mover = function (dt) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].mover(this,dt);
  }
};
Map.prototype.perseguir = function (alvo) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].perseguir(alvo);
  }
};
