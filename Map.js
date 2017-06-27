function Map(rows, collumns) {
  this.SIZE = 32;
  this.enemies = [];
  this.cells = [];
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx) {
  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c]==1){
        ctx.fillStyle = "brown";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else if(this.cells[r][c] == 3){
        ctx.fillStyle = "red";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.strokeStyle = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
    }
  }
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].desenhar(ctx);
  }
};

Map.prototype.getCells = function () {
   for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
        return c;
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
          break;
        case 3:
          this.cells[i][j] = 3;
          break;
        case 4:
          this.cells[i][j] = 0;
          newEnemy = new Sprite();
          newEnemy.images = this.images;
          newEnemy.y = (i+0.5)*this.SIZE;
          newEnemy.x = (j+0.5)*this.SIZE;
          this.enemies.push(newEnemy);
          break;
        default:
          this.cells[i][j] = 0;
      }
    }
  }
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
