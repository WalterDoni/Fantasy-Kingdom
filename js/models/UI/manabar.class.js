class Manabar extends DrawableObjects {

    constructor(){
      super();
      this.x = 130;
      this.y = 80;
      this.width = 200;
      this.height = 25;
      this.maxMana = 100;
      this.maxWidth = this.width;
      this.mana =  this.maxMana;
      this.manabarMax = 200;
      
  
    }
  
    renderStatusbars(ctx){
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#333';
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, this.manabarMax, this.height);
    ctx.strokeRect(this.x, this.y, this.maxWidth, this.height);
  }
  
  /**
  * Update when conditions are reached(use fireAttack)
  */
  updateManapointsMinus() {

    if (this.manabarMax >= 1) {
      this.mana -= 50;
      this.manabarMax = (this.mana / this.maxMana) * this.maxWidth;
    }
  }
  
  /**
  * Update when conditions are reached(collect Manapotion)
  */
  updateManapointsPlus(){

    if(this.manabarMax < 200){
      this.mana += 50;
      this.manabarMax = (this.mana / this.maxMana) * this.maxWidth;
    }
  }

  }