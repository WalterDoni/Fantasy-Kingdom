class CoinCounter extends DrawableObjects {

   

    constructor() {
        super();
     this.counter = 0;

    }

   /**
    * after a coin is collected, redraw the number on the canvas
    */
    renderCoinCounter(ctx) {
        ctx.font = "24px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.counter,150, 135);
    }

    renderXFromCounter(ctx) {
        ctx.font = "24px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("X",  180, 135);
    }


    updateCoinCounter() {
       this.counter += 1;
       
     
    }





}