var PLAY = 1;
var END = 0;
var gameState = PLAY;

var birdFlying;
var bgImg;
var player1 , player2;
var player1Img , player2Img;
var wood , stone , woodG , woodImg , stoneG , stoneImg;
var flag , flagImg;
var life = 500;
var score = 0;

function preload() {
    //birdFlying = loadAnimation( "./assets/bird3.png" ,
               // "./assets/bird4.png" , "./assets/bird5.png" , "./assets/bird6.png");
    bgImg = loadImage("./assets/bg2.jpg");
    player1Img = loadImage("./assets/cycle1.png");
    player2Img = loadImage("./assets/cycle2.png");
    woodImg = loadImage("./assets/wood.png");
    stoneImg = loadImage("./assets/stone.png");
    flagImg = loadImage("./assets/finish.png");
}

function setup() {
    createCanvas(1200 , 600);

    player1 = createSprite(500 , 400 ,100 , 100);
    player1.addImage(player1Img);
    player1.setCollider("rectangle",0,0,1200,player1.height);
    player1.debug = true;
    
    player2 = createSprite(400 , 400 ,100 , 100);
    player2.addImage(player2Img);

    //invisibleGround = createSprite(600,410,900,20);
    //invisibleGround.visible = false;


    woodG = new Group();
   stoneG = new Group();

}

function draw() {
    background(bgImg);
    
    fill("black");
    text("Score: " +score , 895 , 70);
    score = score + Math.round(getFrameRate()/120);
    text("Life: " +life , 895 , 90);

    
    if (gameState === PLAY) 
    {
      createWood();
      createStone();
      createFinishline();

      if (keyDown("space")) {
        player1.velocityY = player1.velocityY - 0.8;
      }

      if (player1.isTouching(woodG) || player1.isTouching(stoneG))
      {
        gameState = END;
      }
    }
    
    if (gameState === END) {
      woodG.destroyEach();
      stoneG.destroyEach();

      gameOver();
    }

    drawSprites();
}

function createWood() {
    if (frameCount % 120 === 0) {
      wood = createSprite(1220 , Math.round(random(500 , 518)));
      wood.addImage(woodImg);
      wood.scale = 0.3;
      wood.velocityX = -5;
      //wood.lifetime = 500;
  
      woodG.add(wood);
    }
  }

  function createStone() {
    if (frameCount % 270 === 0) {
      stone = createSprite(1220 , Math.round(random(500 , 518)));
      stone.addImage(stoneImg);
      stone.scale = 0.3;
      stone.velocityX = -5;
     // stone.lifetime = 500;
  
      stoneG.add(stone);
    }
  }

  function createFinishline() {
    if (frameCount === 1000 ) {
      flag = createSprite(1220 , 509);
      flag.addImage(flagImg);
      flag.scale = 0.5;
      flag.velocityX = -5;
    }
  }

  function gameOver() 
 {
    swal(
   {
      title: `Game Over`,
      text: "Sorry, you lost the race ",
      imageUrl:
              "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

  function gameOver1() 
 {
    swal(
   {
      title: `Game Over`,
      text: "Hurrah! You won the race ",
      imageUrl:
              "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
