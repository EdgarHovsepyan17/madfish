const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
const score=document.querySelector('.score')
const statement=document.querySelector('.statement')
let alive=true

const bgFirstLay=document.createElement('img')
bgFirstLay.src='images/background_back-sheet0.png'

const bgSecondLay=document.createElement('img')
bgSecondLay.src='images/background_front-sheet0.png';

const settingsBtn=document.querySelector('.settingsBtn')

const settings=document.querySelector('.settings')

settingsBtn.addEventListener('click',()=>{
  settings.classList.remove("hide")
})

const closeSettingsBtn=document.querySelector('.close-settings')
closeSettingsBtn.addEventListener('click',()=>{
  settings.classList.add("hide")
})

const backToStartBtn=document.querySelector(".backToStart");
backToStartBtn.addEventListener("click",()=>{
  backToStartMenu()
})

function backToStartMenu(){
  alive=true
  data.fish.length=0
  canvas.classList.add('hide');
  score.classList.add('hide');
  backToStartBtn.classList.add('hide');
  start.classList.remove('hide')
  clearInterval(a)
  clearInterval(b)
  hero._score=0;
}

let data={
  bubbles:[],
  fish:[]
}

const startBtn=document.querySelector('.startBtn')
const start=document.querySelector('.start')

let a,b,c

startBtn.addEventListener('click',()=>{
  if(hero){
    hero._x=900;
    hero._y=400;
  }
  start.classList.add('hide')
  canvas.classList.remove('hide')
  score.classList.remove('hide')
  backToStartBtn.classList.remove("hide")
  if(c===undefined){
    loop()
    c=true
  }
  a=setInterval(function(){
    createBubbles()
  },50)
  b=setInterval(()=>{
    createNewFish()
  },750)
  hero._score=0
})


class Hero {
    constructor(x, y, width, height) {
      this._x = x;
      this._y = y;
      this._width = 100;
      this._height = 100;
  
      this._speed = 10;
      this._xDelta = 0;
      this._yDelta = 0;
      
      this._img = document.createElement("img");
      this._img.src = "images/heroRight.png";

      this._score=0
    }
    
    update() {
      this._x += this._xDelta;
      this._y += this._yDelta;

      score.innerText=this._score

      if(this._x>=1920){
        this._x=0-this._width
      }else if(this._x+this._width<=0){
        this._x=1920
      }
      else if(this._y+this._height<=0){
        this._y=1080
      }
      else if(this._y>=1080){
        this._y=0-this._height
      }
    
      data.fish.forEach((anyFish)=>{
        if(intersect(hero.getBoundingBox(),anyFish.getBoundingBox())){
          if(hero._score>=anyFish._score){
            hero._score+=anyFish._givingScore;
            anyFish._deleteMe=true

            if(this._score>=1000){
              statement.innerText='YOU WON'
              statement.classList.remove('hide')
              setTimeout(()=>{
                backToStartMenu()
                statement.classList.add('hide')
              },1500)
            }
          }else{
            alive=false
            statement.innerText='YOU LOST'
            setTimeout(()=>{
              statement.classList.remove('hide')
            },500)            
            setTimeout(()=>{
              statement.classList.add('hide')
            },1500)            
            setTimeout(()=>{
              backToStartMenu() 
            },2000)
          }
        }
      })

      this.sizeUpdate()

    }
    render() {
        context.drawImage(this._img, this._x, this._y, this._width, this._height);     
    }
    goRight() {
      this._xDelta = this._speed;
      this._img.src='images/heroRight.png'
    }
    goLeft() {
      this._xDelta = this._speed * -1;
      this._img.src='images/heroLeft.png'
    }
    goUp() {
        this._yDelta = this._speed * -1;
    }
    goDown() {
        this._yDelta = this._speed;
    }
    stop() {
      this._xDelta =0;
      this._yDelta = 0;
    } 
    getBoundingBox() {
      return {
        x: this._x,
        y: this._y,
        width: this._width,
        height: this._height
      };
    }
    sizeUpdate(){
      if(hero._score>=0&&hero._score<5){
        hero._width=100;
        hero._height=100;
      }
      else if(hero._score>=5&&hero._score<10){
        hero._width=110;
        hero._height=110;
      }
      else if(hero._score>=10&&hero._score<25){
        hero._width=125;
        hero._height=125;
      }
      else if(hero._score>=25&&hero._score<35){
        hero._width=135;
        hero._height=135;
      }
      else if(hero._score>=35&&hero._score<50){
        hero._width=150;
        hero._height=150;
      }
      else if(hero._score>=50&&hero._score<75){
        hero._width=175;
        hero._height=175;
      }
      else if(hero._score>=75&&hero._score<115){
        hero._width=200;
        hero._height=200;
      }
      else if(hero._score>=115&&hero._score<150){
        hero._width=225;
        hero._height=225;
      }
      else if(hero._score>=150&&hero._score<200){
        hero._width=275;
        hero._height=275;
      }
      else if(hero._score>=200&&hero._score<250){
        hero._width=300;
        hero._height=300;
      }
      else if(hero._score>=250&&hero._score<450){
        hero._width=325;
        hero._height=325;
      }
      else if(hero._score>=450&&hero._score<525){
        hero._width=350;
        hero._height=350;
      }
      else if(hero._score>=525&&hero._score<600){
        hero._width=400;
        hero._height=400;
      }
      else if(hero._score>=600&&hero._score<800){
        hero._width=450;
        hero._height=450;
      }
      else if(hero._score>=800){
        hero._width=500;
        hero._height=500;
      }
    }
 }

 const hero=new Hero(900,400,300,300)

  class Bubble {
    constructor() {
  
      this._speed = 17;
      this._xDelta = 0;
      this._yDelta = 0;
      
      this._img = document.createElement("img");
      this._img.src='images/bubble-sheet0.png'

    }
    
    update() {
      this._x += this._xDelta;
      this._y += this._yDelta;

      if(this._y<0){
        this._deleteMe=true
      }

    }
    render() {
      context.drawImage(this._img,this._x,this._y,this._width,this._height);
    }
    goUp() {
        this._yDelta = this._speed * -1;
    }
    stop() {
      this._xDelta = 0;
      this._yDelta = 0;
    }
    createWidthHeight(){
      let size=random(10,50)
      this._width=size;
      this._height=size;
    }
    createCordinats(){
      this._x=Math.floor(random(0,1500))
      this._y=Math.floor(window.screen.height/10*9)
    }
  }

  function createBubbles(){
    const bubble=new Bubble
    bubble.createCordinats();
    bubble.createWidthHeight();
    bubble.goUp()
    data.bubbles.push(bubble)
  }

  class Fish{
    constructor(){
      this._img=document.createElement("img");

      this._xDelta = 0;
      this._yDelta = 0;
    }
    goRight() {
      this._xDelta = this._speed;
    }
    goLeft() {
      this._xDelta = this._speed * -1;
    }
    update() {
      if(this._x>1920||this.x+this._width<0)this._deleteMe=true
      this._x += this._xDelta;
      this._y += this._yDelta;
    }
    render() {
      context.drawImage(this._img, this._x, this._y, this._width, this._height);
    }
    createCordinats(){
      this._y=random(0,1080-this._height)
      let xSide=random(0,2);
      if(xSide===0){
        this._x=0-this._width;
        this.goRight()
      }else{
        this._x=1920
        this.goLeft()
      }
    }
    getBoundingBox() {
      return {
        x: this._x,
        y: this._y,
        width: this._width,
        height: this._height
      };
    }
  }
  class Fish1 extends Fish{
    constructor(){
      super();

      this._width = 75;
      this._height = 75;
  
      this._speed = 2;
      this._xDelta = 0;
      this._yDelta = 0;
      
      this._img = document.createElement("img");
      this._img.src = "images/fish1right.png";

      this._score=0
      this._givingScore=5
    }
    goRight() {
      super.goRight();
      this._img.src="images/fish1right.png"
    }
    goLeft() {
      super.goLeft();
      this._img.src="images/fish1left.png"
    }
  }

  class Fish2 extends Fish{
    constructor(){
      super();

      this._width = 125;
      this._height = 125;
  
      this._speed = 3;
      this._xDelta = 0;
      this._yDelta = 0;
      
      this._img = document.createElement("img");
      this._img.src = "images/fish2right.png";

      this._score=25
      this._givingScore=10
    }
    goRight() {
      super.goRight();
      this._img.src="images/fish2right.png"
    }
    goLeft() {
      super.goLeft();
      this._img.src="images/fish2left.png"
    }
  }

  class Fish3 extends Fish{
    constructor(){
      super();

      this._width = 175;
      this._height = 175;
  
      this._speed =6;
      this._xDelta = 0;
      this._yDelta = 0;
      
      this._img = document.createElement("img");
      this._img.src = "images/fish3right.png";

      this._score=75
      this._givingScore=15
    }
    goRight() {
      super.goRight();
      this._img.src="images/fish3right.png"
    }
    goLeft() {
      super.goLeft();
      this._img.src="images/fish3left.png"
    }
  }

  class Fish4 extends Fish{
    constructor(){
      super();

      this._width = 225;
      this._height = 225;
  
      this._speed = 4;
      this._xDelta = 0;
      this._yDelta = 0;
      
      this._img = document.createElement("img");
      this._img.src = "images/fish4right.png";

      this._score=150
      this._givingScore=25
    }
    goRight() {
      super.goRight();
      this._img.src="images/fish4right.png"
    }
    goLeft() {
      super.goLeft();
      this._img.src="images/fish4left.png"
    }
  }

  class Fish5 extends Fish{
    constructor(){
      super();

      this._width = 275;
      this._height = 275;
  
      this._speed =4;
      this._xDelta = 0;
      this._yDelta = 0;
      
      this._img = document.createElement("img");
      this._img.src = "images/fish5.png";

      this._score=250
      this._givingScore=40
    }
    goRight() {
      super.goRight();
      this._img.src="images/fish5.png"
    }
    goLeft() {
      super.goLeft();
      this._img.src="images/fish5.png"
    }
  }

  class Fish6 extends Fish{
    constructor(){
      super();

      this._width = 350;
      this._height = 350;
  
      this._speed = 5;
      this._xDelta = 0;
      this._yDelta = 0;
      
      this._img = document.createElement("img");
      this._img.src = "images/fish6right.png";

      this._score=600
      this._givingScore=50
    }
    goRight() {
      super.goRight();
      this._img.src="images/fish6right.png"
    }
    goLeft() {
      super.goLeft();
      this._img.src="images/fish6left.png"
    }
  }

  function createNewFish(){
    const fishNumber=random(1,7);
    let fish;
    if(fishNumber===1){
      fish=new Fish1
    }else if(fishNumber===2){
      fish=new Fish2
    }else if(fishNumber===3){
      fish=new Fish3
    }else if(fishNumber===4){
      fish=new Fish4
    }else if(fishNumber===5){
      fish=new Fish5
    }else if(fishNumber===6){
      fish=new Fish6
    }
    fish.createCordinats();
    data.fish.push(fish);
  }
  

  function update(){
    if(alive)hero.update()
    data.bubbles.forEach(obj=>obj.update())
    data.fish.forEach(obj=>obj.update())

    data.bubbles=data.bubbles.filter(obj=>obj._deleteMe!==true)
    data.fish=data.fish.filter(obj=>obj._deleteMe!==true)
  }

  function render(){     
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bgFirstLay,0, 0, canvas.width, canvas.height)
    data.bubbles.forEach(obj=>obj.render())
    context.drawImage(bgSecondLay,0, 0, canvas.width, canvas.height)
    data.fish.forEach(obj=>obj.render())   
    if(alive)hero.render()
  }

  

  function loop() {
    requestAnimationFrame(loop);
    update();
    render();
  }
  
  


  document.addEventListener("keydown", (evt) => {
    if (evt.code === "ArrowRight") {
      hero.goRight();
    } else if (evt.code === "ArrowLeft") {
      hero.goLeft();
    } else if (evt.code === "ArrowDown") {
        hero.goDown();
    } else if (evt.code === "ArrowUp") {
        hero.goUp();
    } 
  });
  
  document.addEventListener("keyup", (evt) => {
    hero.stop();
  });

  function random(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function intersect(rect1, rect2) {
  const x = Math.max(rect1.x, rect2.x),
    num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
    y = Math.max(rect1.y, rect2.y),
    num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
  return (num1 >= x && num2 >= y);
};











  