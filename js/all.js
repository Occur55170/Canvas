// canvas 響應式寬度判斷
if(window.innerWidth<600){
  let canvasW=window.innerWidth*0.75;
  let canvasH=canvasW;
  console.log(canvasW);
  $('.mobile-machine #moCanvas').attr('width',canvasW);
  $('.mobile-machine #moCanvas').attr('height',canvasH);
};

// 抓取canvas判斷
if(window.innerWidth>600){
  var canvas = document.getElementById('myCanvas');
}else{
  var canvas = document.getElementById('moCanvas');
};

var ctx = canvas.getContext('2d');
var ball1 = document.getElementById('ball1');
var ball2 = document.getElementById('ball2');
var ball3 = document.getElementById('ball3');
var ball4 = document.getElementById('ball4');
var ball5 = document.getElementById('ball5');
var ballList = [ball1,ball2, ball3, ball4, ball5];
const ballNum = 5;
var awardList = [];
var timer;
var ballStatus=[];

var xbottom=0;
var final=ballNum;

$('.switch').click(function(e){
  e.preventDefault();

  $(this).addClass('switchRotate');
  $('.bodAr').removeClass('bodAr');
  setTimeout(function(){
    $('.bod .ball').css('z-index','10');
    ballStatus=[];
    init();
    $('.switchRotate').removeClass('switchRotate');
  },800);
  
  if(window.innerWidth>600){
    let canvas = document.getElementById('myCanvas');
  }else{
    let canvas = document.getElementById('moCanvas');
    $('.head .tit').addClass('opa');
    $('#moCanvas').removeClass('opa');
  };
});

//初始化
function init() {
  for (let i = 0; i < ballNum; i++) {
    // let index = Math.floor(4 * Math.random());
    awardList[i] = new Ball(i, ballList[i]);
    ballStatus.push({name:`ball-${i}`,count:0});
  }
  window.clearInterval(timer);//清除計時器
  timer = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < awardList.length; i++) {
      awardList[i].run(i);
    }
  }, 10);
  console.log('start');
};

function Ball(index, img) {
  if(window.innerWidth>600){
    this.r = 30;
  }else{
    this.r = 10;
  };
  this.x=(canvas.width - this.r * 2)/2;
  this.y=canvas.height - this.r * 2;
  this.img = img;
  do{
    this.speedX = this.rand(20) - 10;
  } while (this.speedX < 5);
  do{
    this.speedY = this.rand(20) - 10;
  } while (this.speedY < 5);
};

//掉出結果球
function drop(){
  window.clearInterval(timer);
  ctx.clearRect(0, 0, canvas.width, canvas.height);//清空畫布

  let x=Math.floor(5 * Math.random());
  let ballDrop = window.setTimeout(( () => $('.bod .ball').css('z-index','11')), 1000);
  $('.finalA').removeClass('finalA');
  if(window.innerWidth>600){
    $('.ball a').eq(x).addClass('finalA');
    $('.ball a').eq(x).click(function(e){
      e.preventDefault()
      $('.wrap').append(`
        <div class="lightbg">
            <div class="lightbox"><p>本日好運指數${x*20}%喔</p></div>
        </div>`
      );
      closelightbox();
    })
  }else{
    $('.head .tit').removeClass('opa');
    $('#moCanvas').addClass('opa');
    $('.mobile-machine .ball a').eq(x).addClass('finalA');
    $('.mobile-machine .ball a').eq(x).click(function(e){
      e.preventDefault()
      $('.wrap').append(`
        <div class="lightbg">
            <div class="lightbox"><p>本日好運指數${x*20}%喔</p></div>
        </div>`
      );
      closelightbox();
    })
  };
};

Ball.prototype = {
  rand: function (num) {
    return Math.random() * num;
  },
  run: function (i) {
    if(ballStatus[i].count<5){
      xbottom=ballStatus[i].count;
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width - this.r * 2) {
        this.speedX = -this.speedX;
      }
      if (this.x < 0) {
        this.speedX = Math.abs(this.speedX);
      }
      if (this.y > canvas.height - this.r * 2) {
        this.speedY = -this.speedY;
        xbottom++;
      }
      if (this.y < 0) {
        this.speedY = Math.abs(this.speedY);
      }
      
      if(window.innerWidth>600){
        ctx.drawImage(this.img, this.x, this.y,110,110);
      }else{
        ctx.drawImage(this.img, this.x, this.y,40,40);
      };
      ballStatus[i].count=xbottom;
    };

    //判斷是否最後一顆
    for(let k=0;k<ballStatus.length;k++){
      if(ballStatus[k].count==5){
        final--;
      };
    };

    if((final==0)){
      drop();
    }else{
      final=ballNum;
    };
  }
}

function closelightbox(e){
  document.body.addEventListener('click',function(e){
    console.log()
    if(e.target.className == 'lightbg' || e.target.className == 'lightbox'){
      $('.lightbg').remove()
    }
  })
}