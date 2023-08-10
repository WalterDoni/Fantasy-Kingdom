class CoinCounter extends DrawableObjects {

   

    constructor() {
        super();
     this.counter = 0;

    }


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