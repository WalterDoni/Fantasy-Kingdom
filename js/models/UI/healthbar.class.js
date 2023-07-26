class Healthbar extends DrawableObjects {

  //----Lebensbalken---//
  healthbarMax = 200;
  maxHealth = 100;
  healthpoints = this.maxHealth;
  width = 200;
  height = 25;
  maxWidth = this.width;

  constructor() {
    super();
    this.x = 130;
    this.y = 40;


  }

  renderStatusbars(ctx) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#333';
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.healthbarMax, this.height);
    ctx.strokeRect(this.x, this.y, this.maxWidth, this.height);
  }


  updateHealthpoints() {

    if (this.healthbarMax >= 1) {
      this.healthpoints -= 10;
      this.healthbarMax = (this.healthpoints / this.maxHealth) * this.maxWidth;
    }
  }

}