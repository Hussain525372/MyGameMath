class Form {
  constructor() {
      this.button = createButton('Click here to play');
      this.reset = createButton('Replay');
      this.l1 = createButton('LEVEL 1');
      this.l2 = createButton('LEVEL 2');
      this.l3 = createButton('LEVEL 3');
  }

  hide(){
   this.button.hide();
   this.l1.hide();
   this.l2.hide();
   this.l3.hide();
  }
  
  display(){
    
    this.button.position(displayWidth/2 - 150,displayHeight - 75);
      this.reset.position(displayWidth - 200,20);

      this.l1.position(displayWidth/2 - 250, displayHeight - 140);
      this.l2.position(displayWidth/2 - 50, displayHeight - 140);
      this.l3.position(displayWidth/2 + 150, displayHeight - 140);

      this.l1.mousePressed(()=>{
        r1 = 1;
        r2 = 15;
      });

      this.l2.mousePressed(()=>{
        r1 = 11;
        r2 = 30;
      });

      this.l3.mousePressed(()=>{
        r1 = 25;
        r2 = 75;
      });

      this.button.mousePressed(()=>{
        gameState = 1;
        this.button.hide();
        this.l1.hide();
        this.l2.hide();
        this.l3.hide();
      }); 

      this.reset.mousePressed(()=>{
        gameState = 0;
        gameflag = "s";

      });

    }

   
}
  