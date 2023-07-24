class Manabar extends DrawableObjects {

    constructor(){
      super();
      this.x = 100;
      this.y = 150;
      this.width = 200;
      this.height = 25;
      this.maxHealth = 100;
      this.maxWidth = this.width;
      this.health =  this.maxHealth;
      
  
    }
  
    renderStatusbars(ctx){
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#333';
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.maxWidth, this.height);
  }
  
  }