class Statusbar {

  IMAGES = [
    'img/8.UI/hp_full.png',
    'img/8.UI/hp_80.png',
    'img/8.UI/hp_60.png',
    'img/8.UI/hp_40.png',
    'img/8.UI/hp_20.png',
    'img/8.UI/statusbar_border.png',

  ]


  percentage = 100;

  constructor() {
    super(); // übernimmt somit übergeordnete Funktionen
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 50;
    this.width = 150;
    this.height = 20;
    this.setPercentage(40);

  }


  // setPercentage(%Angabe)
  setPercentage(percentage) {
    this.percentage = percentage; // 0 --> 5 Bilder anzeigen
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }




  resolveImageIndex() {

    if (this.percentage == 100) {
      return 0 ;
    } else if (this.percentage > 80) {
      return 1; 
    } else if (this.percentage > 60) {
      return 2;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 4;
    } else {
      return 5;
    }
  }
}
